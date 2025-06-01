'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm, ValidationError } from '@formspree/react';

export default function GetStarted() {
  const [state, handleSubmit] = useForm("mqaqodan");

  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-[#FFF6E5]">
      {/* Header */}
      <header className="w-full" style={{ background: '#FFF6E5', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
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
      {/* Main Content */}
      <section className="flex flex-col items-center justify-center w-full flex-1 py-24">
        <h1 className="text-center text-gray-900 mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold"
          style={{ fontFamily: 'Segoe UI, sans-serif' /* fontSize removed for responsive classes */ }}>
          We&apos;ll Install Eatly for You—Up and Running in 48 Hours
        </h1>
        <p style={{ fontSize: 34, fontWeight: 400, fontFamily: 'Segoe UI, sans-serif' }} className="text-center text-gray-500 mb-12 max-w-2xl">
          From onboarding to activation, we&apos;ll set everything up—fast, simple, and done for you.
        </p>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-6 text-center">Book Your Free Demo</h2>
          {state.succeeded ? (
            <p className="text-green-600 text-center text-lg">Thanks for joining! We&apos;ll be in touch soon.</p>
          ) : (
            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} action="https://formspree.io/f/mqaqodan" method="POST">
              <div>
                <label htmlFor="fullName" className="block mb-1 font-medium text-gray-700">Full Name</label>
                <input id="fullName" name="fullName" type="text" required placeholder="e.g. Jane Doe" className="w-full px-4 py-3 rounded-md bg-[#F6F6F6] border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200" />
                <ValidationError prefix="Full Name" field="fullName" errors={state.errors} />
              </div>
              <div>
                <label htmlFor="restaurantName" className="block mb-1 font-medium text-gray-700">Restaurant Name</label>
                <input id="restaurantName" name="restaurantName" type="text" required placeholder="e.g. Demo Restaurant" className="w-full px-4 py-3 rounded-md bg-[#F6F6F6] border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200" />
                <ValidationError prefix="Restaurant Name" field="restaurantName" errors={state.errors} />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email Address</label>
                <input id="email" name="email" type="email" required placeholder="e.g. jane@email.com" className="w-full px-4 py-3 rounded-md bg-[#F6F6F6] border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200" />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">Phone Number</label>
                <input id="phone" name="phone" type="tel" required placeholder="e.g. +1 555 123 4567" className="w-full px-4 py-3 rounded-md bg-[#F6F6F6] border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200" />
                <ValidationError prefix="Phone" field="phone" errors={state.errors} />
              </div>
              <div>
                <label htmlFor="country" className="block mb-1 font-medium text-gray-700">Country</label>
                <input id="country" name="country" type="text" required placeholder="e.g. United States" className="w-full px-4 py-3 rounded-md bg-[#F6F6F6] border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200" />
                <ValidationError prefix="Country" field="country" errors={state.errors} />
              </div>
              <Button type="submit" className="bg-[#FD4D2D] hover:bg-orange-700 text-white w-full mt-2" disabled={state.submitting}>
                {state.submitting ? 'Submitting...' : 'Get Started'}
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
} 