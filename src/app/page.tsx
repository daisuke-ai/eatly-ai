'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Script from 'next/script';

const automations = [
  {
    title: "Marketing CRM",
    description: "Manage customer relationships and marketing campaigns efficiently.",
    detailedDescription: "Our AI-powered CRM helps you track customer interactions, segment your audience, and automate personalized marketing messages across various channels, boosting engagement and loyalty."
  },
  {
    title: "Database Building",
    description: "Automated tools to build and maintain your customer database.",
    detailedDescription: "Effortlessly collect customer data from various touchpoints (online orders, reservations, Wi-Fi logins) and build a clean, organized, and actionable database for targeted marketing."
  },
  {
    title: "AI Social Media Agents",
    description: "Engage customers on Facebook, Instagram, and WhatsApp.",
    detailedDescription: "Deploy AI agents to handle common inquiries, take orders, and run promotions directly within Facebook Messenger, Instagram DMs, and WhatsApp chats, 24/7."
  },
  {
    title: "SMS Automation",
    description: "Send automated SMS messages for promotions and reminders.",
    detailedDescription: "Schedule and send targeted SMS campaigns for special offers, event reminders, order updates, and review requests, achieving high open rates and immediate customer attention."
  },
  {
    title: "Email Automations",
    description: "Automate email marketing campaigns and notifications.",
    detailedDescription: "Create sophisticated email workflows for welcome series, newsletters, abandoned cart recovery, and personalized promotions based on customer behavior and preferences."
  },
  {
    title: "Regulars Management",
    description: "Identify and reward your loyal customers automatically.",
    detailedDescription: "Automatically track visit frequency and spending habits to identify your most valuable customers. Set up automated rewards and personalized offers to encourage repeat business."
  },
  {
    title: "Google Reviews Management",
    description: "Monitor and respond to Google reviews seamlessly.",
    detailedDescription: "Get notified of new Google reviews instantly. Use AI assistance to draft personalized responses, manage your online reputation, and gather valuable feedback."
  },
  {
    title: "Online Order Booking",
    description: "Streamline the online ordering process for your customers.",
    detailedDescription: "Offer a smooth and user-friendly online ordering experience directly through your website or social media, integrated with your POS system for efficient order management."
  },
  {
    title: "Voice Agents for Calls",
    description: "Handle incoming calls with intelligent AI voice agents.",
    detailedDescription: "Let AI voice agents answer frequently asked questions, take reservations or simple orders over the phone, reducing staff workload and ensuring no call goes unanswered."
  },
  {
    title: "Loyalty Program",
    description: "Implement and manage a custom loyalty program.",
    detailedDescription: "Design and launch a digital loyalty program tailored to your brand. Track points, manage rewards, and engage customers with exclusive perks to foster long-term loyalty."
  },
];

export default function Home() {
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [menuItems, setMenuItems] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setFormMessage(null);
    setIsSuccess(null);

    try {
      const response = await fetch('/api/generate-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantName,
          cuisineType,
          menuItems,
          website,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create assistant');
      }

      setFormMessage(`Success! Assistant created with ID: ${result.assistantId}. Redirecting...`);
      setIsSuccess(true);
      console.log("Assistant Creation Response:", result);

      // Redirect to the chat page with the new assistant ID
      router.push(`/chat/${result.assistantId}`);

    } catch (error) {
      console.error("Form submission error:", error);
      // Type check the error
      if (error instanceof Error) {
        setFormMessage(error.message);
      } else {
        setFormMessage('An unknown error occurred during assistant creation.');
      }
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center text-foreground bg-white dark:bg-black bg-[radial-gradient(#0000001a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] bg-[size:16px_16px]">

        <nav className="w-full border-b border-border/40">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
              eatly.ai
            </p>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-950">
                Contact Us (Scroll Down)
              </Button>
            </div>
          </div>
        </nav>

        <section className="w-full py-20 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-gray-900 dark:text-gray-100">
              Supercharge Your Restaurant with AI
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl lg:text-2xl mb-8">
              Discover how eatly.ai automations streamline operations, boost marketing,
              and enhance customer engagement for restaurants like yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white">
                    Generate Chat Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-orange-700 dark:text-orange-500">Create Your Demo Assistant</DialogTitle>
                    <DialogDescription>
                      Tell us a bit about your restaurant, and we&apos;ll generate a personalized chat demo.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="restaurantName">
                        Restaurant Name
                      </Label>
                      <Input
                        className="mt-1"
                        id="restaurantName"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        placeholder="e.g., The Pizza Place"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cuisineType">
                        Cuisine Type
                      </Label>
                      <Input
                        className="mt-1"
                        id="cuisineType"
                        value={cuisineType}
                        onChange={(e) => setCuisineType(e.target.value)}
                        placeholder="e.g., Italian, Mexican, Cafe"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="menuItems">
                        Menu Highlights
                      </Label>
                      <Textarea
                        className="mt-1"
                        id="menuItems"
                        value={menuItems}
                        onChange={(e) => setMenuItems(e.target.value)}
                        placeholder="e.g., Margherita Pizza, Tacos al Pastor, Speciality Coffee..."
                        rows={3}
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">
                        Website (Optional)
                      </Label>
                      <Input
                        className="mt-1"
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="e.g., https://yourrestaurant.com"
                        type="url"
                        disabled={isLoading}
                      />
                    </div>
                    {formMessage && (
                      <p className={`text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                        {formMessage}
                      </p>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Generating...' : 'Generate Demo Assistant'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-orange-600 border-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-950"
              >
                <a href="#voice-demo">See Voice Demo (Coming Soon)</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 text-gray-900 dark:text-gray-100">
                Our AI-Powered Automations
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                Explore the tools designed to save you time, increase revenue, and delight your customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {automations.map((automation, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="group relative shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-border hover:border-primary dark:border-border/50 dark:hover:border-primary bg-card hover:scale-[1.03] overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-orange-700 dark:text-orange-500">{automation.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-10 relative">
                        <CardDescription className="text-muted-foreground">{automation.description}</CardDescription>
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs text-primary font-semibold flex items-center">
                            View More <span className="ml-1 text-lg">→</span>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-orange-700 dark:text-orange-500">{automation.title}</DialogTitle>
                      <DialogDescription>
                        {automation.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">
                        {automation.detailedDescription}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 lg:py-24 bg-gray-900 dark:bg-black text-gray-100 dark:text-gray-200">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12 lg:mb-16">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
                    Why Choose Eatly.ai?
                  </h2>
                  <p className="max-w-2xl mx-auto text-lg text-gray-300 dark:text-gray-400 md:text-xl">
                    We focus specifically on the restaurant industry, providing tailored AI solutions.
                  </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="flex flex-col items-center">
                      <div className="mb-4 p-3 rounded-full bg-orange-600/20 dark:bg-orange-400/20 text-orange-400 dark:text-orange-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Restaurant Focused</h3>
                      <p className="text-gray-300 dark:text-gray-400">Solutions built by people who understand the unique challenges of the food service industry.</p>
                  </div>
                  <div className="flex flex-col items-center">
                       <div className="mb-4 p-3 rounded-full bg-orange-600/20 dark:bg-orange-400/20 text-orange-400 dark:text-orange-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
                      <p className="text-gray-300 dark:text-gray-400">Our tools are designed to work with your existing systems, minimizing disruption.</p>
                  </div>
                   <div className="flex flex-col items-center">
                       <div className="mb-4 p-3 rounded-full bg-orange-600/20 dark:bg-orange-400/20 text-orange-400 dark:text-orange-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Results Driven</h3>
                      <p className="text-gray-300 dark:text-gray-400">We focus on automations that deliver tangible results like increased bookings and better customer retention.</p>
                  </div>
              </div>
          </div>
        </section>

        <section id="voice-demo" className="w-full py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-gray-900 dark:text-gray-100">
                Experience Our AI Voice Agent
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl mb-8">
                Hear how natural and effective our voice agents can be in handling calls.
              </p>
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white">
                  Listen to our voice demo (Coming Soon)
              </Button>
          </div>
        </section>

        <section id="contact" className="w-full py-16 lg:py-24">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12 lg:mb-16">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 text-gray-900 dark:text-gray-100">
                  Ready to Boost Your Restaurant?
                  </h2>
                  <p className="max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                  Book a free discovery call to discuss how Eatly.ai can be tailored to your specific needs.
                  </p>
              </div>
              <div className="max-w-4xl mx-auto">
                  <div className="calendly-inline-widget" data-url="https://calendly.com/ammarv67/30min?primary_color=ff8c00" style={{ minWidth: '320px', height: '700px' }}></div>
              </div>
          </div>
        </section>

        <footer className="w-full border-t border-border/40 py-8 mt-16 lg:mt-24">
          <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
              © {new Date().getFullYear()} eatly.ai - Powering Restaurant Growth
          </div>
        </footer>

        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </main>
    </>
  );
}
