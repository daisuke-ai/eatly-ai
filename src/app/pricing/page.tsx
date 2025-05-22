'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MdCallEnd, MdChatBubbleOutline, MdBolt } from 'react-icons/md';
import Link from 'next/link';

const plans = [
  {
    icon: '/eatly-img/18.png',
    title: 'Starter',
    price: '$99',
    period: '/per month',
    description: 'For solo restaurants getting started with automation.',
    features: [
      'AI call assistant (1 line)',
      'Instagram & Facebook chat automation',
      'Google review follow-ups',
      'Basic CRM (contacts + notes)',
      '1 SMS & 1 email campaign/month',
      'Email support',
    ],
    popular: false,
    iconWidth: 37,
    iconHeight: 43,
  },
  {
    icon: '/eatly-img/17.png',
    title: 'Growth',
    price: '$200',
    period: '/per month',
    description: 'For growing restaurants ready to scale marketing and retention.',
    features: [
      'Everything in Starter +',
      'Unlimited SMS & email campaigns',
      'WhatsApp AI chat integration',
      'Loyalty program + visit tracking',
      'Smart customer segmentation',
      'Auto-rewards engine',
      'Dashboard analytics',
      'Priority support',
    ],
    popular: true,
    iconWidth: 49,
    iconHeight: 48,
  },
  {
    icon: '/eatly-img/16.png',
    title: 'Pro',
    price: '$300',
    period: '/per month',
    description: 'For growing businesses to streamline teamwork',
    features: [
      'Everything in Growth +',
      'Multi-location support',
      'Advanced CRM (filters, tags, preferences)',
      'AI-suggested campaign timing (slow day detection)',
      'Dedicated success manager',
    ],
    popular: false,
    iconWidth: 50,
    iconHeight: 40,
  },
];

export default function PricingPage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-white dark:bg-black">
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
      {/* Pricing Section with dotted bg */}
      <section className="w-full flex flex-col items-center py-24 bg-white dark:bg-black bg-[radial-gradient(#0000001a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] bg-[size:16px_16px]">
        <div className="container mx-auto px-4 text-center">
          <h1
            className="font-extrabold mb-4 text-gray-900 dark:text-gray-100 mx-auto"
            style={{ fontSize: '72px'}}
          >
            One AI for your entire restaurant marketing
          </h1>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full max-w-5xl mx-auto relative">
            <span className="absolute -top-8 left-0 text-gray-500 text-base text-left">Price in USD</span>
            {plans.map((plan) => (
              <div
                key={plan.title}
                className={`flex flex-col items-center bg-[#F6F5F4] rounded-xl shadow-md px-8 py-10 w-full md:w-96 relative ${plan.popular ? 'border-4 border-green-400' : ''}`}
              >
                <div className="mb-4">
                  <Image src={plan.icon} alt={plan.title + ' icon'} width={plan.iconWidth} height={plan.iconHeight} unoptimized />
                </div>
                <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
                {plan.popular && (
                  <span className="absolute top-6 right-6 bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Popular</span>
                )}
                <div className="text-3xl font-extrabold mb-1">{plan.price}<span className="text-lg font-medium">{plan.period}</span></div>
                <div className="text-gray-700 text-sm mb-6">{plan.description}</div>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full mb-6">
                  <Link href="/get-started">Get started</Link>
                </Button>
                <ul className="text-left text-gray-800 text-base space-y-2 w-full">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1">•</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* New Section: Everything your staff hates doing */}
      <section className="w-full py-24 flex flex-col items-center justify-center" style={{ background: '#F2F9FF' }}>
        <h2
          className="text-gray-900 text-center mb-16 font-extrabold"
          style={{ fontSize: '72px', lineHeight: '1.1', fontFamily: 'inherit' }}
        >
          Everything your staff hates doing<br />
          <span className="inline-block">—now handled by Eatly.</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-16 w-full max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center max-w-xs mx-auto">
            <MdCallEnd size={64} className="text-[#FD7854] mb-2" />
            <span className="font-bold text-lg mb-2">Taking orders</span>
            <span className="text-gray-700">Customers call during rush hour, no one answers, and they move on.</span>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center text-center max-w-xs mx-auto">
            <MdChatBubbleOutline size={64} className="text-[#222] mb-2" />
            <span className="font-bold text-lg mb-2">Replying to DMs</span>
            <span className="text-gray-700">They&apos;re flipping burgers and flipping tabs. Not replying to &quot;Do you have parking?&quot;</span>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center text-center max-w-xs mx-auto">
            <MdBolt size={64} className="text-[#FD7854] mb-2 rotate-12" />
            <span className="font-bold text-lg mb-2">Remembering regulars orders</span>
            <span className="text-gray-700">You have regulars. But they&apos;re not being tracked, thanked, or incentivized.</span>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="w-full flex flex-col items-center py-24 bg-white">
        <div className="max-w-2xl w-full mx-auto">
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 26, fontWeight: 700 }} className="text-center mb-8">Questions & answers</h3>
          <FAQAccordion />
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="w-full flex flex-col items-center justify-center py-24" style={{ background: '#FFF6E5' }}>
        <h2
          style={{ fontFamily: 'Segoe UI, sans-serif', fontSize: 64, fontWeight: 700 }}
          className="text-center mb-4 text-gray-900"
        >
          Ready to See How Eatly Can Work for You?
        </h2>
        <p
          style={{ fontFamily: 'Segoe UI, sans-serif', fontSize: 34, fontWeight: 400 }}
          className="text-center mb-10 text-gray-500"
        >
          Book a 15-minute demo call
        </p>
        <div className="flex flex-row gap-6 justify-center">
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-md text-base font-semibold"
            style={{ fontFamily: 'Segoe UI, sans-serif' }}
          >
            Book a Demo
          </Button>
          <Button
            variant="outline"
            className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-md text-base font-semibold"
            style={{ fontFamily: 'Segoe UI, sans-serif', borderWidth: 1 }}
          >
            Generate a chat
          </Button>
        </div>
      </section>
    </main>
  );
}

// FAQ Accordion Component
const faqData = [
  {
    q: "What exactly does Eatly.ai do?",
    a: "Eatly.ai helps restaurants automate customer communication across calls, DMs, emails, and SMS. We respond to inquiries, take orders or reservations, collect reviews, and bring back regulars—all using AI."
  },
  {
    q: "Can Eatly really answer phone calls?",
    a: "Yes! Our AI voice assistant can pick up calls 24/7, answer common questions, take reservations or orders, and even route urgent calls to your team."
  },
  {
    q: "Will customers know they&apos;re talking to AI?",
    a: "Not unless you want them to. Our AI is trained to sound human, friendly, and helpful. Most customers assume it&apos;s just a helpful team member."
  },
  {
    q: "What platforms does Eatly integrate with?",
    a: "Eatly currently integrates with Instagram, Facebook Messenger, WhatsApp, SMS, and Gmail. More platforms (like Google Messages and website chat) are coming soon."
  },
  {
    q: "Do I need to train the AI myself?",
    a: "Nope. Just upload your menu and a few business details. We do the setup for you and continue improving the AI based on how customers interact."
  },
  {
    q: "How long does setup take?",
    a: "Typically under 48 hours. For Pro users, we offer white-glove onboarding where we set up everything for you."
  },
  {
    q: "Can Eatly help during slow days?",
    a: "Yes! Eatly tracks your customer flow and sends targeted offers to bring customers in when things are quiet. No manual effort needed."
  },
  {
    q: "Will Eatly help me get more Google reviews?",
    a: "Absolutely. Eatly automatically follows up with happy customers and encourages them to leave a 5-star review—without bothering your staff."
  },
  {
    q: "How much does it cost?",
    a: "We offer three simple plans starting at $99/month. You can upgrade anytime as your restaurant grows. [See Pricing →]"
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="divide-y divide-gray-200 border rounded-lg">
      {faqData.map((item, idx) => (
        <div key={idx}>
          <button
            className="w-full text-left px-6 py-5 focus:outline-none flex justify-between items-center"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 500 }}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <span>{item.q}</span>
            <span className="ml-4 text-2xl">{openIndex === idx ? '−' : '+'}</span>
          </button>
          {openIndex === idx && (
            <div className="px-6 pb-5 text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 400 }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 