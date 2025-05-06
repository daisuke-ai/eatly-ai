import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// --- 🚨 SECURITY WARNING 🚨 ---
// Hardcoding API keys is extremely insecure!
// Replace this with process.env.OPENAI_API_KEY fetched from a .env.local file
// For demonstration purposes ONLY, using the key provided by the user.
// Remember to revoke this key and use environment variables.
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("FATAL: OpenAI API key not found. Please set OPENAI_API_KEY environment variable.");
  // Optionally throw an error or handle appropriately in a real app
}

const openai = new OpenAI({
  apiKey: apiKey,
});

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not configured.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { restaurantName, cuisineType, menuItems, website } = body;

    if (!restaurantName || !cuisineType) {
      return NextResponse.json({ error: 'Restaurant Name and Cuisine Type are required' }, { status: 400 });
    }

    // Construct the assistant's instructions
    const instructions = `**Role:** You are the official AI Chat Assistant for ${restaurantName}, a restaurant known for its ${cuisineType}. Your persona should be [e.g., warm, friendly, and efficient].

**Core Responsibilities:**
1.  **Answer Questions:** Provide accurate information about the restaurant based ONLY on the details provided below. Common topics include: opening hours, location/address, menu items, specials, parking, and general ambiance.
2.  **Menu Guidance:** Describe menu items mentioned in the 'Menu Highlights'. Do not guess ingredients or preparation methods not listed.
3.  **Booking/Ordering (if applicable):** [If applicable, add instructions like: "If a user expresses interest in booking, direct them to [Booking Link/Phone Number]. Do not attempt to take booking details directly."]
4.  **Customer Engagement:** Be polite, engaging, and helpful in all interactions. Use the restaurant's name occasionally.

**Restaurant Details Provided:**
- Name: ${restaurantName}
- Cuisine Type: ${cuisineType}
- Menu Highlights/Specialties: ${menuItems ? menuItems : ''}
- Website: ${website}
- [Add other details here if collected, e.g., Hours: [Hours], Address: [Address]]

**Important Guidelines & Boundaries:**
- **Accuracy:** ONLY use the information provided above. If you don't know the answer to a specific question (e.g., detailed ingredients, current wait times, specific table availability), POLITELY state that you don't have that specific detail and recommend contacting the restaurant directly via phone [Phone Number Placeholder] or checking the website. **Never make up information.**
- **Scope:** Do not handle payments, complex complaints, or job applications. Direct users to the appropriate channels for these.
- **Tone:** Maintain a [persona adjective, e.g., positive and helpful] tone throughout the conversation.`;

    console.log(`Creating assistant for: ${restaurantName}`);

    // Create the OpenAI Assistant
    const assistant = await openai.beta.assistants.create({
      name: `${restaurantName} Chat Assistant`,
      instructions: instructions,
      model: "gpt-4o", // Or "gpt-3.5-turbo" or other suitable model
      // tools: [] // Add tools later if needed (e.g., for booking function calls)
    });

    console.log(`Assistant created with ID: ${assistant.id}`);

    // Return the assistant ID (or other relevant info)
    return NextResponse.json({ assistantId: assistant.id, message: 'Assistant created successfully' });

  } catch (error) {
    console.error("Error creating OpenAI assistant:", error);
    // Check if it's an OpenAI specific error for more details
    let errorMessage = 'Failed to create assistant';
    if (error instanceof OpenAI.APIError) {
        errorMessage = `OpenAI API Error: ${error.status} ${error.name} ${error.message}`;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 
/* fixing all the chat issues */