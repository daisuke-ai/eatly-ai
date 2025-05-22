'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GetStarted() {
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
        <h1 style={{ fontSize: 64, fontWeight: 700, fontFamily: 'Segoe UI, sans-serif' }} className="text-center text-gray-900 mb-4">
          We&apos;ll Install Eatly for You—Up and Running in 48 Hours
        </h1>
        <p style={{ fontSize: 34, fontWeight: 400, fontFamily: 'Segoe UI, sans-serif' }} className="text-center text-gray-500 mb-12 max-w-2xl">
          From onboarding to activation, we&apos;ll set everything up—fast, simple, and done for you.
        </p>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-6 text-center">Book Your Free Demo</h2>
          <form className="w-full flex flex-col gap-4">
            <input type="text" placeholder="Full name" className="w-full px-4 py-3 rounded-md bg-[#F6F6F6] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200" />
            <input type="text" placeholder="Restaurant Name" className="w-full px-4 py-3 rounded-md bg-[#F6F6F6] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200" />
            <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-md bg-[#F6F6F6] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200" />
            <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-md bg-[#F6F6F6] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200" />
            <input type="text" placeholder="Country" className="w-full px-4 py-3 rounded-md bg-[#F6F6F6] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200" />
            <Button type="submit" className="bg-[#FD4D2D] hover:bg-orange-700 text-white w-full mt-2">Get Started</Button>
          </form>
        </div>
      </section>
    </main>
  );
} 