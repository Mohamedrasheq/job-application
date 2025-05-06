"use client"

import { motion } from "framer-motion"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Choose the perfect plan for your recruiting needs. Flexible options for businesses of all sizes.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Pricing toggle */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Transparent, Simple Pricing
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              All plans include access to our core platform features. Choose the plan that best suits your hiring volume and recruitment needs.
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">$20</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Perfect for small businesses starting their recruitment journey
                </p>

                <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Up to 5 active job postings
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Basic candidate search
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Email support
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Company profile
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                    </svg>
                    Advanced recruiting tools
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700">
                <button className="w-full py-3 px-4 rounded-md font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-400 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors">
                  Get Started
                </button>
              </div>
            </motion.div>

            {/* Intermediate Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border-2 border-indigo-500 transform md:scale-105 z-10"
            >
              <div className="p-1 bg-indigo-500 text-white text-center">
                <span className="text-sm font-medium">MOST POPULAR</span>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Intermediate</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">$40</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Ideal for growing companies with moderate hiring needs
                </p>

                <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Up to 15 active job postings
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Advanced candidate search
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Applicant tracking system
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Basic analytics
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700">
                <button className="w-full py-3 px-4 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                  Get Started
                </button>
              </div>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Premium</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">$50</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Full-featured solution for businesses with high-volume recruiting
                </p>

                <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Unlimited job postings
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    AI candidate matching
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Dedicated account manager
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    API access
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700">
                <button className="w-full py-3 px-4 rounded-md font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-400 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors">
                  Get Started
                </button>
              </div>
            </motion.div>
          </div>

          {/* CTA section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to transform your recruitment process?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of companies that are finding and hiring the best talent with JobConnect's powerful recruiting platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/sign-in-sign-up" className="py-3 px-6 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                Get Started
              </a>
              <a href="/documentation" className="py-3 px-6 rounded-md font-medium text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:bg-transparent dark:border-indigo-400 dark:hover:bg-gray-800 transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 