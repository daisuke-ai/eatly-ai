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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Script from 'next/script';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [menuItems, setMenuItems] = useState("");
  const [website, setWebsite] = useState("");
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
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              See how Eatly.ai handles calls—like a real team member
            </p>
            {/* Cloudinary Video Embed */}
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=di7dvcnax&public_id=web_asset_1_y4foi5&profile=cld-default"
                  width="640"
                  height="360"
                  style={{ height: 'auto', width: '100%', aspectRatio: '640 / 360', border: 0 }}
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                  title="Eatly.ai Demo Video"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Chat with Customers Section */}
        <section className="w-full py-16 lg:py-24 bg-transparent">
          <div className="container mx-auto px-4">
            <h2
              className="font-extrabold tracking-tight text-gray-900 dark:text-gray-100 text-center mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-7xl"
            >
              Chat with Customers—Even When You&apos;re Off the Clock
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-8 md:mt-12 max-w-4xl mx-auto px-0">
              {/* Left Column: Green Container with Image (first on desktop) */}
              <div className="flex-1 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-[#98E891] rounded-xl flex items-center justify-center overflow-hidden aspect-[3/5] min-h-[320px] md:min-h-[400px] lg:min-h-[500px] mx-auto">
                <Image src="/eatly-img/Web assets (8) 1.png" alt="Chat Illustration" width={502} height={918} style={{ objectFit: 'contain', width: '100%', height: 'auto' }} />
              </div>
              {/* Right Column: Text Content */}
              <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left w-full max-w-xl md:max-w-md mb-8 md:mb-0">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  Experience Eatly with Your Own Restaurant
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-6">
                  Want to see how it works? Upload your menu and watch how Eatly.ai chats with customers, captures their info, and turns conversations into real leads—automatically.
                </p>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white w-full sm:w-auto" onClick={() => setOpenDemoModal(true)}>
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
                  <div className="flex items-center mt-4 text-orange-600 dark:text-orange-400 font-semibold cursor-pointer" onClick={() => setOpenDemoModal(true)}>
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
                   <div className="flex items-center mt-4 text-orange-600 dark:text-orange-400 font-semibold cursor-pointer" onClick={() => setOpenDemoModal(true)}>
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
                  <div className="flex items-center mt-4 text-orange-600 dark:text-orange-400 font-semibold cursor-pointer" onClick={() => setOpenDemoModal(true)}>
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
            <h2 className="text-[32px] sm:text-[48px] md:text-[56px] lg:text-[72px] font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-100">
              Convert Slow Days into Sold-Out Nights with Smart SMS & Email
            </h2>
            <p className="text-lg sm:text-2xl md:text-[32px] text-muted-foreground mb-8 sm:mb-12">
              Send smart, targeted messages that drive traffic<br className="hidden sm:block"/>during your quietest hours.
            </p>

            {/* Desktop: original absolute layout */}
            <div className="w-full bg-[#FEF3F1] rounded-xl relative overflow-hidden hidden lg:block" style={{ height: '851px' }}>
              <div className="container mx-auto h-full">
                {/* Personalized offers text - positioned top left */}
                <div className="absolute top-8 left-4 md:left-8 text-left max-w-md z-10">
                  <div className="mt-24"></div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100" style={{ letterSpacing: '-1.8px', lineHeight: '72px', fontSize: '40px' }}>
                    Personalized offers,
                    <br/>auto-sent <span className="inline-block align-middle"><Image src="/eatly-img/4470631 1.png" alt="Email Icon" width={40} height={40} /></span>
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
            {/* Mobile/Tablet: stacked layout, only one image */}
            <div className="w-full bg-[#FEF3F1] rounded-xl flex flex-col items-center gap-6 p-4 sm:p-8 relative overflow-hidden block lg:hidden">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 text-left w-full" style={{ letterSpacing: '-1.2px' }}>
                Personalized offers,<br/>auto-sent <span className="inline-block align-middle"><Image src="/eatly-img/4470631 1.png" alt="Email Icon" width={32} height={32} /></span>
              </h2>
              <div className="flex flex-col items-center gap-4 w-full">
                <Image src="/eatly-img/Web assets (9) 1.png" alt="Phone Illustration" width={300} height={400} style={{ objectFit: 'contain', width: '100%', height: 'auto' }} />
              </div>
            </div>

          </div>
        </section>


        {/* Turn One-Time Guests into Loyal Regulars Section */}
        <section className="w-full py-16 lg:py-24 bg-white dark:bg-black">
          <div className="container mx-auto px-4 text-left">
            <h2 className="text-3xl sm:text-5xl md:text-[56px] lg:text-[72px] font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
              Turn One-Time Guests into Loyal Regulars—Automatically
            </h2>
            <p className="text-lg sm:text-2xl md:text-[34px] text-muted-foreground mb-8 sm:mb-12">
              Send smart, targeted messages that drive traffic<br className="hidden sm:block"/>during your quietest hours.
            </p>
            {/* Loyalty Program Illustration in colored div */}
            <div className="w-full bg-[#FFF5E0] rounded-xl flex justify-center items-center py-4 sm:py-8">
              <Image src="/eatly-img/Web assets (16) 1.png" alt="Loyalty Program Dashboard" width={1043} height={671} className="w-full max-w-md sm:max-w-2xl h-auto" />
            </div>
          </div>
        </section>

        {/* Forbes Quote Section */}
        <section className="w-full flex justify-center items-center py-10 sm:py-20">
          <div className="relative flex flex-col items-center w-full max-w-xl sm:max-w-3xl mx-auto" style={{ minHeight: '300px' }}>
            {/* Quote Card */}
            <div className="bg-[#F5FAFF] rounded-lg shadow-lg px-4 sm:px-12 md:px-24 py-8 sm:py-16 md:py-20 flex flex-col items-center relative z-0" style={{ transform: 'rotate(-4deg)' }}>
              <p className="text-2xl sm:text-4xl md:text-[64px] font-extrabold italic text-gray-900 text-center mb-2 sm:mb-4">&quot;Your restaurants best employee&quot;</p>
              <p className="text-xl sm:text-3xl md:text-[64px] font-medium text-gray-900 text-center">Forbes</p>
            </div>
            {/* Pushpin Image */}
            <div className="absolute -top-16 sm:-top-24 left-1/2 transform -translate-x-1/2 z-10">
              <Image src="/eatly-img/badge.png" alt="Pushpin" width={64} height={64} className="w-16 h-16 sm:w-24 sm:h-24" />
            </div>
          </div>
        </section>

        {/* Get More Reviews Section */}
        <section className="w-full flex justify-center items-center py-10 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start gap-8 sm:gap-16 flex-wrap w-full max-w-5xl">
            {/* Left Side: Heading, Paragraph, and Image */}
            <div className="flex-1 min-w-0 w-full">
              <h2 className="text-3xl sm:text-5xl md:text-[56px] lg:text-[72px] font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
                Get More Reviews, With Zero Manual Follow-Up
              </h2>
              <p className="text-lg sm:text-2xl md:text-[34px] text-muted-foreground mb-8 sm:mb-12">
                Eatly.ai automatically follows up with happy customers at the right time—so you get more Google reviews, more visibility, and more trust from new customers.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 flex-wrap w-full">
                <div className="bg-[#FD7854] rounded-xl flex justify-center items-center p-4 sm:p-8 w-full sm:w-fit max-w-full mb-4 sm:mb-0 mx-auto">
                  <Image src="/eatly-img/Web assets (11) 1.png" alt="Review Request Illustration" width={400} height={480} className="w-40 sm:w-60 md:w-80 h-auto mx-auto" />
                </div>
                {/* Right Side: 3 Cards */}
                <div className="flex flex-col gap-4 sm:gap-8 w-full max-w-md min-w-[180px]">
                  <div className="bg-[#F6F5F4] rounded-xl p-4 sm:p-8 flex flex-row items-center gap-4 w-full">
                    <Image src="/eatly-img/Web assets (12) 1.png" alt="Automated Follow-Ups" width={32} height={32} className="w-8 h-8 sm:w-16 sm:h-auto" />
                    <span className="text-base sm:text-xl font-semibold text-[#737373]">Automated Follow-Ups</span>
                  </div>
                  <div className="bg-[#F6F5F4] rounded-xl p-4 sm:p-8 flex flex-row items-center gap-4 w-full">
                    <Image src="/eatly-img/Web assets (13) 1.png" alt="Boost Local Rankings" width={32} height={32} className="w-8 h-8 sm:w-32 sm:h-auto" />
                    <span className="text-base sm:text-xl font-semibold text-[#737373]">Boost Local Rankings</span>
                  </div>
                  <div className="bg-[#F6F5F4] rounded-xl p-4 sm:p-8 flex flex-row items-center gap-4 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[#737373] w-8 h-8 sm:w-12 sm:h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 0110 18v-4.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                    <span className="text-base sm:text-xl font-semibold text-[#737373]">Filter Unhappy Guests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Your Restaurant's Marketing, Organized Section */}
        <section className="w-full py-10 sm:py-16 lg:py-24 flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl md:text-[56px] lg:text-[72px] font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100 text-center">
            Your Restaurant&apos;s Marketing, Organized
          </h2>
          <p className="text-lg sm:text-2xl md:text-[34px] text-muted-foreground mb-8 sm:mb-12 text-center mx-auto" style={{ width: '994px', height: '88px', maxWidth: '100%' }}>
            All your customer data, conversations, campaigns, and loyalty activity in one place. Eatly gives you the tools to understand your guests—and grow faster, smarter.
          </p>
          <div className="bg-[#FFF5E0] rounded-xl flex justify-center items-center mx-auto w-full max-w-[1200px] px-2 sm:px-8 py-6 sm:py-10 my-8" style={{ maxWidth: '1200px' }}>
            <Image src="/eatly-img/dashboard.png" alt="Marketing Dashboard" width={1043} height={671} className="w-full max-w-[1000px] max-h-[700px] h-auto object-contain mx-auto" />
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
              <div>
                <label className="block mb-1 font-medium text-gray-700">Restaurant Name</label>
                <Input placeholder="e.g. Demo Restaurant" value={restaurantName} onChange={e => setRestaurantName(e.target.value)} required className="placeholder-gray-400" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Cuisine Type <span className="text-gray-400">(optional)</span></label>
                <Input placeholder="e.g. Pizza, Italian" value={cuisineType} onChange={e => setCuisineType(e.target.value)} className="placeholder-gray-400" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Menu Items</label>
                <Input placeholder="e.g. Pizza Margherita, Pasta Carbonara" value={menuItems} onChange={e => setMenuItems(e.target.value)} className="placeholder-gray-400" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Website <span className="text-gray-400">(optional)</span></label>
                <Input placeholder="e.g. https://demo-restaurant.com" value={website} onChange={e => setWebsite(e.target.value)} className="placeholder-gray-400" />
              </div>
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