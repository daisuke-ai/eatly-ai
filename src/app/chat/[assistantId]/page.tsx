'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation'; // Hook to get route params
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"; // For scrollable chat messages
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // For errors
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Import Avatar
import { Loader2 } from 'lucide-react'; // Import Loader icon
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const params = useParams();
  const assistantId = params.assistantId as string; // Get assistantId from URL

  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
       // Simple scroll to bottom. Might need adjustment based on ScrollArea implementation details
       const scrollViewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
       if (scrollViewport) {
         scrollViewport.scrollTop = scrollViewport.scrollHeight;
       }
    }
  }, [messages]);

  // Function to handle sending messages
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Prevent form submission if called from form
    if (!userInput.trim() || isLoading || !assistantId) return;

    const newUserMessage: Message = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistantId,
          threadId,
          userMessage: userInput,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to get response from assistant');
      }

      // Update threadId if it was newly created
      if (result.threadId && !threadId) {
        setThreadId(result.threadId);
      }

      // Add assistant response
      const assistantResponse: Message = { role: 'assistant', content: result.response };
      setMessages(prev => [...prev, assistantResponse]);

    } catch (err) {
      // Type check the error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while sending the message.');
      }
      // Optional: Remove the user's message if the API call failed
      // setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Outer container for padding and centering
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-black">
      {/* Header (copied from homepage) */}
      <header className="w-full bg-white border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-semibold text-orange-600">eatly.ai</Link>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/pricing" className="text-base text-gray-700 hover:text-orange-600 transition-colors">Pricing</Link>
            <Link href="/get-started">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold">Get started</Button>
            </Link>
          </div>
        </div>
      </header>
      {/* Demo Title */}
      <div className="w-full bg-white dark:bg-black py-10 border-b border-border/40">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-center text-gray-900 dark:text-gray-100 max-w-4xl mx-auto px-4">
          Free 15-Minute Demo to Discover How Eatly Automates Your Restaurant Marketing
        </h1>
      </div>
      {/* Chat Container */}
      <div className="flex-1 flex items-center justify-center py-8 px-4 md:px-8">
        {/* Inner chat container with max-w and centering */}
        <div className="flex flex-col h-[800px] max-w-3xl w-full bg-card border rounded-lg shadow-lg overflow-hidden">

      {/* Header (Optional: could make sticky) */}
      <header className="border-b p-3 bg-card flex-shrink-0">
          <h1 className="text-lg font-semibold text-center text-primary">
            Eatly.ai Assistant
          </h1>
          <p className="text-xs text-muted-foreground text-center">ID: {assistantId}</p>
      </header>

      {/* Message display area takes remaining space */}
      <ScrollArea ref={scrollAreaRef} className="flex-grow">
          {/* Add padding inside the scroll area viewport */}
          <div className="p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {/* Optional: Add Avatar for Assistant */}
                  {msg.role === 'assistant' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
                      {/* <AvatarImage src="/path/to/ai-avatar.png" /> */}
                    </Avatar>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`p-3 rounded-xl max-w-[75%] shadow-sm ${msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                      }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>

                  {/* Optional: Add Avatar for User (can be simplified) */}
                  {msg.role === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">U</AvatarFallback>
                      {/* <AvatarImage src="/path/to/user-avatar.png" /> */}
                    </Avatar>
                  )}
              </div>
            ))}
            {isLoading && (
                <div className="flex justify-start items-end gap-2"> {/* Align with assistant messages, items-end for avatar alignment */}
                    <Avatar className="h-8 w-8 self-end"> {/* self-end to align with bottom of bubble */}
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
                    </Avatar>
                    {/* Typing indicator styled as an assistant bubble */}
                    <div className="p-3 rounded-xl bg-muted text-muted-foreground shadow-sm flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm italic">Typing...</span>
                    </div>
                </div>
            )}
            {error && (
                <Alert variant="destructive" className="mt-4 max-w-md mx-auto">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
          </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-card flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask the assistant something..."
          disabled={isLoading}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading || !userInput.trim()} className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600">
          Send
        </Button>
      </form>
      </div> { /* End Input Area */}
    </div> { /* End inner chat container */}
      </div> {/* End chat container wrapper */}
    </div> /* End outer container */
  )
} 