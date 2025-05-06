"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "10 Tips for Creating an Eye-Catching Resume",
      excerpt: "Learn how to make your resume stand out in a competitive job market with these expert tips.",
      date: "May 15, 2023",
      author: "Sarah Johnson",
      category: "Career Advice",
      image: "/images/placeholder-1.jpg",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Future of Remote Work: Trends and Predictions",
      excerpt: "Remote work is here to stay. Discover the emerging trends and what to expect in the coming years.",
      date: "April 28, 2023",
      author: "Michael Chen",
      category: "Industry Insights",
      image: "/images/placeholder-2.jpg",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "How AI is Transforming the Recruitment Process",
      excerpt: "Artificial intelligence is revolutionizing how companies find and hire talent. Here's what you need to know.",
      date: "April 15, 2023",
      author: "Jessica Williams",
      category: "Technology",
      image: "/images/placeholder-3.jpg",
      readTime: "7 min read"
    },
    {
      id: 4,
      title: "Mastering the Virtual Interview: Expert Strategies",
      excerpt: "Virtual interviews require different preparation. Learn how to make a great impression through the screen.",
      date: "April 3, 2023",
      author: "David Rodriguez",
      category: "Interview Tips",
      image: "/images/placeholder-4.jpg",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Building a Company Culture That Attracts Top Talent",
      excerpt: "Your company culture can be your best recruitment tool. Learn how to create an environment where people want to work.",
      date: "March 22, 2023",
      author: "Emily Park",
      category: "Leadership",
      image: "/images/placeholder-5.jpg",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "How to Navigate Career Changes in an Evolving Job Market",
      excerpt: "Thinking about a career pivot? This guide will help you transition successfully in today's dynamic job landscape.",
      date: "March 10, 2023",
      author: "Robert Thompson",
      category: "Career Development",
      image: "/images/placeholder-6.jpg",
      readTime: "7 min read"
    }
  ]
  
  const categories = ["All", "Career Advice", "Industry Insights", "Technology", "Interview Tips", "Leadership", "Career Development"]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">JobConnect Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Insights, tips and trends to help you navigate your career journey and recruiting challenges
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700">
                  {/* This would be an image in a real application */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    [Featured Post Image]
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center text-sm text-cyan-600 dark:text-cyan-400 mb-2">
                  <span className="font-semibold mr-2">FEATURED</span>
                  <span className="mx-2">•</span>
                  <span>June 1, 2023</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Top Skills Employers Are Looking for in 2023
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  The job market is constantly evolving. This comprehensive guide breaks down the most in-demand skills that employers are seeking this year, from technical abilities to crucial soft skills that can set you apart from other candidates.
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-4"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Emma Wilson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Career Development Expert • 12 min read</p>
                  </div>
                </div>
                <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  Read Full Article
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                index === 0 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  [Blog Image]
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span className="text-blue-600 dark:text-blue-400">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center mt-4">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                    <p className="text-gray-500 dark:text-gray-400">{post.readTime}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm">
            <a href="#" className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
              Previous
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-blue-500 text-sm font-medium text-white">
              1
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
              2
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
              3
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
              Next
            </a>
          </nav>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg shadow-lg p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-blue-100 mb-8">
              Get the latest industry insights, career advice, and JobConnect updates delivered to your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 md:w-64 lg:w-80 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300" 
              />
              <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 