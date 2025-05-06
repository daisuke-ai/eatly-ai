import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// --- 🚨 SECURITY WARNING 🚨 ---
// Using the same hardcoded key as generate-assistant.ts
// Replace this with process.env.OPENAI_API_KEY from .env.local
const apiKey = process.env.OPENAI_API_KEY
if (!apiKey) {
  console.error("FATAL: OpenAI API key not found.");
}

const openai = new OpenAI({
  apiKey: apiKey,
});

// Helper function to poll for run completion
async function waitForRunCompletion(threadId: string, runId: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
  let runStatus;
  do {
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms between polls
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);
    runStatus = run.status;
    console.log(`Run ${runId} status: ${runStatus}`);
    if (['completed', 'failed', 'cancelled', 'expired'].includes(runStatus)) {
      return run;
    }
  } while (['queued', 'in_progress', 'cancelling'].includes(runStatus));
  // Should not reach here under normal circumstances unless a new status is introduced
  throw new Error(`Run ${runId} finished with unexpected status: ${runStatus}`);
}

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not configured.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { assistantId, threadId: existingThreadId, userMessage } = body;

    if (!assistantId || !userMessage) {
      return NextResponse.json({ error: 'Assistant ID and user message are required' }, { status: 400 });
    }

    let threadId = existingThreadId;

    // 1. Create a new thread if one doesn't exist
    if (!threadId) {
      const thread = await openai.beta.threads.create();
      threadId = thread.id;
      console.log(`Created new thread with ID: ${threadId}`);
    }

    // 2. Add the user's message to the thread
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: userMessage,
    });
    console.log(`Added user message to thread ${threadId}`);

    // 3. Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      // Optional: Add instructions specific to this run
      // instructions: "Please address the user as Jane Doe."
    });
    console.log(`Created run ${run.id} for thread ${threadId}`);

    // 4. Wait for the run to complete
    const completedRun = await waitForRunCompletion(threadId, run.id);

    if (completedRun.status !== 'completed') {
        throw new Error(`Run failed with status: ${completedRun.status}`);
    }

    // 5. Retrieve the messages added by the assistant
    const messagesPage = await openai.beta.threads.messages.list(threadId, {
        run_id: run.id,
        order: 'asc' // Get messages in chronological order
    });

    // Filter only the assistant's messages from the latest run
    const assistantMessages = messagesPage.data
        .filter(msg => msg.run_id === run.id && msg.role === 'assistant')
        .flatMap(msg => msg.content.filter(content => content.type === 'text').map(textContent => (
            textContent.type === 'text' ? textContent.text.value : '' // Extract text content
        )))
        .join('\n'); // Join multiple message parts if any

     console.log(`Assistant response(s): ${assistantMessages}`);

    // 6. Return the assistant's response and the thread ID
    return NextResponse.json({ response: assistantMessages, threadId: threadId });

  } catch (error) {
    console.error("Error in chat API:", error);
     let errorMessage = 'Failed to process chat message';
     if (error instanceof OpenAI.APIError) {
         errorMessage = `OpenAI API Error: ${error.status} ${error.name} ${error.message}`;
     } else if (error instanceof Error) {
         errorMessage = error.message;
     }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 