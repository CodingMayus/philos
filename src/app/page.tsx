"use client";

import Link from "next/link";
import Image from "next/image";
import logo from '../logo.jpg';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-purple-100 via-violet-200 to-indigo-100 text-gray-800 font-[family-name:var(--font-geist-sans)] p-8 sm:p-20">
      <main className="flex flex-col items-center text-center sm:text-left gap-12 max-w-3xl mx-auto mt-20">
        
        {/* Logo above the title */}
        <Image src={logo} alt="Philo Logo" width={120} height={120} className="mx-auto sm:mx-0 rounded-full shadow-lg" />

        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-indigo-700 leading-tight">
            You Were Never Meant to Walk Alone
          </h1>
          <p className="text-lg text-gray-600 max-w-prose">
            Welcome to <span className="font-semibold text-indigo-600">Philo</span> — your digital companion in a noisy world. Whether you're feeling isolated or just need someone who listens, Philo is here. No judgment. Just presence. Just friendship.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Link
            href="/login"
            className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-semibold text-sm shadow-lg transition duration-300"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-indigo-300 hover:bg-indigo-100 text-indigo-600 px-6 py-3 font-medium text-sm transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </main>

      <footer className="mt-32 mb-4 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
        <p className="text-center w-full">© {new Date().getFullYear()} Philo. All rights reserved.</p>
      </footer>
    </div>
  );
}
