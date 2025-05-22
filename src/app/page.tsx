'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
import Image from 'next/image';

const automations = [
  {
    title: "Marketing CRM",
    description: "Manage customer relationships and marketing campaigns efficiently.",
    icon: "/eatly-img/crm.png"
  },
  {
    title: "Database Building",
    description: "Automated tools to build and maintain your customer database.",
    icon: "/eatly-img/Loyalty Program Dashboard Illustration Placeholder.png"
  },
  {
    title: "AI Social Media Agents",
    description: "Engage customers on Facebook, Instagram, and WhatsApp.",
    icon: "/eatly-img/Phone Illustration Placeholder.png"
  },
  {
    title: "SMS Automation",
    description: "Send automated SMS messages for promotions and reminders.",
    icon: "/eatly-img/Phone SMS Illustration Placeholder.png"
  },
  {
    title: "Email Automations",
    description: "Automate email marketing campaigns and notifications.",
    icon: "/eatly-img/Browser Email Illustration Placeholder.png"
  },
  {
    title: "Regulars Management",
    description: "Identify and reward your loyal customers automatically.",
    icon: "/eatly-img/badge.png"
  },
  {
    title: "Google Reviews Management",
    description: "Monitor and respond to Google reviews seamlessly.",
    icon: "/eatly-img/Phone Review Illustration Placeholder.png"
  },
  {
    title: "Online Order Booking",
    description: "Streamline the online ordering process for your customers.",
    icon: "/eatly-img/Marketing Dashboard Illustration Placeholder.png"
  },
  {
    title: "Voice Agents for Calls",
    description: "Handle incoming calls with intelligent AI voice agents.",
    icon: "/eatly-img/chef-illustration.png"
  },
  {
    title: "Loyalty Program",
    description: "Implement and manage a custom loyalty program.",
    icon: "/eatly-img/badge.png"
  },
];

export default function Home() {
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState("Demo Restaurant");
  const [cuisineType, setCuisineType] = useState("Pizza, Italian");
  const [menuItems, setMenuItems] = useState("Pizza Margherita, Pasta Carbonara");
  const [website, setWebsite] = useState("https://demo-restaurant.com");
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [openDemoModal, setOpenDemoModal] = useState(false);

  const handleDemoFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setFormMessage(null);
    setIsSuccess(null);
    try {
      const response = await fetch('/api/generate-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantName, cuisineType, menuItems, website }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to create assistant');
      setFormMessage('Redirecting to your chat app...');
      setIsSuccess(true);
      setTimeout(() => {
        setOpenDemoModal(false);
        router.push(`/chat/${result.assistantId}`);
      }, 1200);
    } catch (error) {
      setIsSuccess(false);
      setIsLoading(false);
      setFormMessage(error instanceof Error ? error.message : 'An unknown error occurred during assistant creation.');
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center text-foreground bg-white dark:bg-black bg-[radial-gradient(#0000001a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] bg-[size:16px_16px]">

        <header className="w-full bg-white border-b border-border/40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-orange-600">eatly.ai</span>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/pricing" className="text-base text-gray-700 hover:text-orange-600 transition-colors">Pricing</Link>
              <Link href="/get-started">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold">Get started</Button>
              </Link>
            </div>
          </div>
        </header>

        <section className="w-full py-20 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-gray-900 dark:text-gray-100">
              More Orders. Happier Customers.
              Less Work.
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl lg:text-2xl mb-8">
              Eatly.ai handles your calls, messages, marketing, and
              loyalty—so you can focus on running your restaurant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white" onClick={() => setOpenDemoModal(true)}>
                Try Eatly.ai
              </Button>
            </div>
            <div className="mt-12 flex justify-center">
              <Image src="/eatly-img/Web assets (18) 1.png" alt="Chef Illustration" width={572} height={598} />
            </div>
          </div>
        </section>

        {/* Quote and Video Section */}
        <section className="w-full pb-16 lg:pb-24">
          <div className="container mx-auto px-4 text-center">
            <p className="text-6xl font-semibold italic mb-8 text-gray-900 dark:text-gray-100">
              "It&apos;s like having your front desk available 24/7—<br/>without hiring anyone."
            </p>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              See how Eatly.ai handles calls—like a real team member
            </p>
            {/* Video Player/Play Button */}
            <div className="mt-8 flex justify-center">
              {/* Placeholder for Video Preview Image */}
              <div className="relative w-full max-w-4xl aspect-video bg-gray-300 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                {/* You can replace this div with a next/image component for a video thumbnail */}
                <div className="text-gray-600 dark:text-gray-300 text-lg">Video Preview Placeholder</div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chat with Customers Section */}
        <section className="w-full py-16 lg:py-24 bg-transparent">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-12 text-gray-900 dark:text-gray-100 mx-auto text-center" style={{ width: '1256px', height: '136px' }}>
              Chat with Customers—Even When You&apos;re Off the Clock
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-12">
              {/* Left Column: Green Container with Image */}
              <div className="w-[619px] h-[974px] bg-[#98E891] rounded-xl flex items-center justify-center overflow-hidden">
                <Image src="/eatly-img/Web assets (8) 1.png" alt="Chat Illustration" width={502} height={918} style={{ objectFit: 'contain' }} />
              </div>
              {/* Right Column: Text Content */}
              <div className="flex flex-col items-start text-left max-w-md">
                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Experience Eatly with Your Own Restaurant
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Want to see how it works? Upload your menu and watch how Eatly.ai chats with customers, captures their info, and turns conversations into real leads—automatically.
                </p>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white" onClick={() => setOpenDemoModal(true)}>
                  Generate chat demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Your All-in-One Messaging Assistant Section */}
        <section className="w-full py-16 lg:py-24 bg-transparent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-12 text-gray-900 dark:text-gray-100">
              Your All-in-One Messaging Assistant—On Every Platform
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              {/* Instagram Card */}
              <Card className="w-full md:w-80 bg-[#EDF2ED] dark:bg-[#EDF2ED] text-left">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Image src="/eatly-img/6.png" alt="Instagram Icon" width={48} height={48} />
                  </div>
                  <CardTitle className="text-xl font-bold">Instagram DMs</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-grow">
                  <CardDescription>
                    Reply to DMs instantly, take orders, and turn story replies into conversations that convert—automatically.
                  </CardDescription>
                  <div className="flex items-center mt-4 text-orange-600 dark:text-orange-400 font-semibold">
                    Try now <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                  </div>
                </CardContent>
              </Card>

              {/* Facebook Messenger Card */}
              <Card className="w-full md:w-80 bg-[#EDF2ED] dark:bg-[#EDF2ED] text-left">
                <CardHeader>
                  <div className="flex items-center mb-4">
                     <Image src="/eatly-img/7.png" alt="Facebook Icon" width={48} height={48} />
                  </div>
                  <CardTitle className="text-xl font-bold">Facebook messenger</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-grow">
                  <CardDescription>
                    Handle Messenger inquiries 24/7 with AI that responds, books, and collects customer info while you focus on your kitchen.
                  </CardDescription>
                   <div className="flex items-center mt-4 text-orange-600 dark:text-orange-400 font-semibold">
                    Try now <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                  </div>
                </CardContent>
              </Card>

              {/* Whatsapp Card */}
              <Card className="w-full md:w-80 bg-[#EDF2ED] dark:bg-[#EDF2ED] text-left">
                <CardHeader>
                   <div className="flex items-center mb-4">
                     <Image src="/eatly-img/8.png" alt="Whatsapp Icon" width={48} height={48} />
                  </div>
                  <CardTitle className="text-xl font-bold">Whatsapp</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-grow">
                  <CardDescription>
                    Engage with customers on the world&apos;s most-used messaging app. Confirm reservations, answer questions, and build loyalty—on autopilot.
                  </CardDescription>
                  <div className="flex items-center mt-4 text-orange-600 dark:text-orange-400 font-semibold">
                    Try now <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SMS & Email Automation Section */}
        <section className="w-full py-16 lg:py-24 bg-white dark:bg-black">
          <div className="container mx-auto px-4 text-left">
            <h2 className="text-[72px] font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-100">
              Convert Slow Days into Sold-Out Nights with Smart SMS & Email
            </h2>
            <p className="text-[32px] text-muted-foreground mb-12">
              Send smart, targeted messages that drive traffic<br/>during your quietest hours.
            </p>

            {/* Layout for Personalized offers text and Images - Wrapped in pink background */}
            <div className="w-full bg-[#FEF3F1] py-12 px-4 rounded-xl relative overflow-hidden" style={{ height: '851px' }}>
              <div className="container mx-auto h-full">

                {/* Personalized offers text - positioned top left */}
                <div className="absolute top-8 left-4 md:left-8 text-left max-w-md z-10">
                  <div className="mt-24"></div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100" style={{ letterSpacing: '-1.8px', lineHeight: '72px', fontSize: '40px' }}>
                    Personalized offers,
                    <br/>auto-sent <span className="inline-block align-middle"><Image src="/eatly-img/4470631 1.png" alt="Email Icon" width={40} height={40} /></span> {/* Placeholder for email icon */}
                  </h2>
                </div>

                {/* Phone Image - positioned bottom middle */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
                   <Image src="/eatly-img/Web assets (9) 1.png" alt="Phone Illustration" width={488} height={661} />
                </div>

                {/* Browser Email Image - positioned top right of phone */}
                 <div className="absolute z-0" style={{ bottom: '200px', left: 'calc(50% + 230px)' }}>
                   <Image src="/eatly-img/Browser Email Illustration Placeholder.png" alt="Illustration" width={488} height={488} />
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* Turn One-Time Guests into Loyal Regulars Section */}
        <section className="w-full py-16 lg:py-24 bg-white dark:bg-black">
          <div className="container mx-auto px-4 text-left">
            <h2 className="text-[72px] font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
              Turn One-Time Guests into Loyal Regulars—Automatically
            </h2>
            <p className="text-[34px] text-muted-foreground mb-12">
              Send smart, targeted messages that drive traffic<br/>during your quietest hours.
            </p>
            {/* Loyalty Program Illustration in colored div */}
            <div className="w-full bg-[#FFF5E0] rounded-xl flex justify-center items-center py-8">
              <Image src="/eatly-img/Web assets (16) 1.png" alt="Loyalty Program Dashboard" width={1043} height={671} />
            </div>
          </div>
        </section>

          {/* Forbes Quote Section */}
          <section className="w-full flex justify-center items-center py-20">
          <div className="relative flex flex-col items-center" style={{ minHeight: '500px' }}>
            {/* Quote Card */}
            <div className="bg-[#F5FAFF] rounded-lg shadow-lg px-24 py-20 flex flex-col items-center relative z-0" style={{ transform: 'rotate(-4deg)' }}>
              <p className="text-[64px] font-extrabold italic text-gray-900 text-center mb-4">“Your restaurants best employee”</p>
              <p className="text-[64px] font-medium text-gray-900 text-center">Forbes</p>
            </div>
            {/* Pushpin Image */}
            <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 z-10">
              <Image src="/eatly-img/badge.png" alt="Pushpin" width={256} height={256} />
            </div>
          </div>
        </section>

        {/* Get More Reviews Section */}
        <section className="w-full flex justify-center items-center py-16 lg:py-24" style={{ minHeight: '1186px', height: '1186px' }}>
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start gap-16 flex-wrap" style={{ width: '1256px', maxWidth: '100%' }}>
            {/* Left Side: Heading, Paragraph, and Image */}
            <div className="flex-1 min-w-0">
              <h2 className="text-[72px] font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100 max-w-[1256px]">
                Get More Reviews, With Zero Manual Follow-Up
              </h2>
              <p className="text-[34px] text-muted-foreground mb-12 max-w-[854px]">
                Eatly.ai automatically follows up with happy customers at the right time—so you get more Google reviews, more visibility, and more trust from new customers.
              </p>
              <div className="flex flex-row items-start gap-12 flex-wrap">
                <div className="bg-[#FD7854] rounded-xl flex justify-center items-center p-8 w-fit max-w-full">
                  <Image src="/eatly-img/Web assets (11) 1.png" alt="Review Request Illustration" width={400} height={480} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                {/* Right Side: 3 Cards */}
                <div className="flex flex-col gap-8 max-w-md min-w-[260px]">
                  <div className="bg-[#F6F5F4] rounded-xl p-8 flex flex-col items-start gap-4">
                    <Image src="/eatly-img/Web assets (12) 1.png" alt="Automated Follow-Ups" width={76} height={54} />
                    <span className="text-xl font-semibold text-[#737373] mt-2">Automated Follow-Ups</span>
                  </div>
                  <div className="bg-[#F6F5F4] rounded-xl p-8 flex flex-col items-start gap-4">
                    <Image src="/eatly-img/Web assets (13) 1.png" alt="Boost Local Rankings" width={206} height={56} />
                    <span className="text-xl font-semibold text-[#737373] mt-2">Boost Local Rankings</span>
                  </div>
                  <div className="bg-[#F6F5F4] rounded-xl p-8 flex flex-col items-start gap-4">
                    <div className="bg-[#F6F5F4] rounded-xl p-8 flex flex-col items-start gap-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[#737373]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 0110 18v-4.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
                      </svg>
                      <span className="text-xl font-semibold text-[#737373] mt-2">Filter Unhappy Guests</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Your Restaurant's Marketing, Organized Section */}
        <section className="w-full py-16 lg:py-24 flex justify-center items-center">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-[72px] font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100 text-center">
              Your Restaurant&apos;s Marketing, Organized
            </h2>
            <p className="text-[34px] text-muted-foreground mb-12 text-center" style={{ width: '994px', height: '88px' }}>
              All your customer data, conversations, campaigns, and loyalty activity in one place. Eatly gives you the tools to understand your guests—and grow faster, smarter.
            </p>
            <div className="w-full bg-[#FFF5E0] rounded-xl flex justify-center items-center py-8 mt-16" style={{ width: '1446px', height: '851px' }}>
              <Image src="/eatly-img/dashboard.png" alt="Marketing Dashboard" width={1043} height={671} />
            </div>
          </div>
        </section>

      

        {/* Ready to See Section */}
        <section className="w-full py-16 lg:py-24 bg-transparent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-gray-900 dark:text-gray-100">
              Ready to See How Eatly Can Work for You?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl mb-8">
              Book a 15-minute demo call
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white">
                <Link href="/get-started">Book a Demo Call</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-950">
                <Link href="/pricing">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="w-full border-t border-border/40 py-8 mt-16 lg:mt-24">
          <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
              © {new Date().getFullYear()} eatly.ai - Powering Restaurant Growth
          </div>
        </footer>

        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

        {/* Modal for Try Now/Generate Chat Demo */}
        <Dialog open={openDemoModal} onOpenChange={setOpenDemoModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Chat Demo</DialogTitle>
              <DialogDescription>Fill in your restaurant details to try Eatly.ai chat assistant.</DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-4" onSubmit={handleDemoFormSubmit}>
              <Input placeholder="Restaurant Name" value={restaurantName} onChange={e => setRestaurantName(e.target.value)} required />
              <Input placeholder="Cuisine Type" value={cuisineType} onChange={e => setCuisineType(e.target.value)} required />
              <Input placeholder="Menu Items (optional)" value={menuItems} onChange={e => setMenuItems(e.target.value)} />
              <Input placeholder="Website (optional)" value={website} onChange={e => setWebsite(e.target.value)} />
              <Button type="submit" className="bg-orange-600 text-white" disabled={isLoading}>{isLoading ? 'Generating...' : 'Generate Chat'}</Button>
              {formMessage && (
                <div className={`text-sm mt-2 flex items-center gap-2 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                  {isSuccess && isLoading ? <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-green-600 rounded-full"></span> : null}
                  {formMessage}
                </div>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
