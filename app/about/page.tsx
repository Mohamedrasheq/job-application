"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission")

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="relative bg-indigo-600 dark:bg-indigo-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover mix-blend-multiply filter brightness-50"
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="People working in an office"
          />
        </div>
        <div className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About JobConnect
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto text-indigo-100">
              We're on a mission to transform the way companies hire and people find jobs through
              innovative technology and exceptional experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Content tabs */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("mission")}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === "mission"
                      ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }
                `}
              >
                Our Mission
              </button>
              <button
                onClick={() => setActiveTab("team")}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === "team"
                      ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }
                `}
              >
                Our Team
              </button>
              <button
                onClick={() => setActiveTab("story")}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === "story"
                      ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }
                `}
              >
                Our Story
              </button>
              <button
                onClick={() => setActiveTab("values")}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === "values"
                      ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }
                `}
              >
                Our Values
              </button>
            </nav>
          </div>

          <div className="mt-12">
            {/* Mission Tab */}
            {activeTab === "mission" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    JobConnect exists to bridge the gap between talent and opportunity. Our mission is to create a more efficient,
                    transparent, and equitable job market where the right people find the right roles.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    We believe that the traditional hiring process is broken—it's slow, inefficient, and often unfair.
                    By leveraging technology and human expertise, we're building a platform that transforms how companies
                    hire and how candidates find their dream jobs.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Our goal is to reduce the time-to-hire by 50%, increase placement success rates by 40%, and create
                    a more diverse and inclusive workforce across all industries we serve.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                    alt="Team collaborating" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}

            {/* Team Tab */}
            {activeTab === "team" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Meet Our Leadership</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Team Member 1 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <img
                      className="w-full h-64 object-cover object-center"
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt="CEO portrait"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Michael Thompson</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 mb-4">CEO & Co-Founder</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Previously led talent acquisition at Fortune 500 companies. Passionate about using technology
                        to solve the hiring challenges he experienced firsthand.
                      </p>
                    </div>
                  </div>

                  {/* Team Member 2 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <img
                      className="w-full h-64 object-cover object-center"
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                      alt="CTO portrait"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sarah Chen</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 mb-4">CTO & Co-Founder</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Former AI research scientist with expertise in matching algorithms. Leads our engineering team
                        in building our intelligent job-matching technology.
                      </p>
                    </div>
                  </div>

                  {/* Team Member 3 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <img
                      className="w-full h-64 object-cover object-center"
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt="COO portrait"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">David Rodriguez</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 mb-4">COO</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Joined from a leading HR tech company where he built and scaled operations globally.
                        Oversees our business operations and growth strategy.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Story Tab */}
            {activeTab === "story" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Journey</h2>
                
                <div className="space-y-12">
                  {/* Timeline Item 1 */}
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                      <div className="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-4 text-center">
                        <span className="text-indigo-600 dark:text-indigo-300 font-bold text-xl">2020</span>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Founding</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        JobConnect was founded by Michael Thompson and Sarah Chen after they experienced the frustrations
                        of traditional hiring processes. They set out to build a platform that would use data and human
                        insights to match the right talent with the right opportunities.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 2 */}
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                      <div className="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-4 text-center">
                        <span className="text-indigo-600 dark:text-indigo-300 font-bold text-xl">2021</span>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">First Funding & Growth</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        We secured our first round of funding and expanded our team to 25 employees. By the end of the year,
                        we had partnered with over 100 companies and helped thousands of job seekers find meaningful employment.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 3 */}
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                      <div className="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-4 text-center">
                        <span className="text-indigo-600 dark:text-indigo-300 font-bold text-xl">2022</span>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Platform Expansion</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        We launched our AI-powered matching algorithm, dramatically improving the quality of job matches.
                        We also expanded our services to include career coaching and skills assessment tools.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 4 */}
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                      <div className="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-4 text-center">
                        <span className="text-indigo-600 dark:text-indigo-300 font-bold text-xl">2023</span>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Today & Beyond</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Today, we're a team of 100+ passionate individuals serving thousands of companies and job seekers
                        worldwide. We're continuing to innovate and expand our platform to make hiring more efficient, 
                        transparent, and fair for everyone involved.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Values Tab */}
            {activeTab === "values" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Our Core Values</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Value 1 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-indigo-500">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Innovation</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We're constantly pushing the boundaries of what's possible in recruitment technology, always looking
                      for better ways to connect talent with opportunity.
                    </p>
                  </div>

                  {/* Value 2 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-blue-500">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Inclusivity</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We believe in creating equal opportunities for all. Our platform is designed to reduce bias
                      and promote diversity in the hiring process.
                    </p>
                  </div>

                  {/* Value 3 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-green-500">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Trust</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We build trust through transparency, reliability, and consistently delivering on our promises
                      to both job seekers and employers.
                    </p>
                  </div>

                  {/* Value 4 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-purple-500">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Adaptability</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      The employment landscape is constantly evolving, and so are we. We embrace change
                      and continuously adapt our platform to meet the needs of the modern workforce.
                    </p>
                  </div>

                  {/* Value 5 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-red-500">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Empathy</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We understand the challenges of job seeking and hiring. Our approach is built on empathy
                      for both sides of the process, creating solutions that address real human needs.
                    </p>
                  </div>

                  {/* Value 6 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-yellow-500">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Impact</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We measure our success by the positive impact we have on people's careers and businesses.
                      Every connection we make has the potential to change lives and drive economic growth.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="bg-indigo-800 dark:bg-indigo-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by companies and candidates worldwide
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
            <div className="text-center">
              <p className="text-5xl font-extrabold text-white">500+</p>
              <p className="mt-2 text-lg text-indigo-100">Companies</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-extrabold text-white">10k+</p>
              <p className="mt-2 text-lg text-indigo-100">Job Seekers</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-extrabold text-white">5k+</p>
              <p className="mt-2 text-lg text-indigo-100">Placements</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-extrabold text-white">98%</p>
              <p className="mt-2 text-lg text-indigo-100">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600 dark:text-indigo-400">Join our platform today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/sign-in-sign-up"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get started
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}