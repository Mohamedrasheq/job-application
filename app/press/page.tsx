"use client"

import { motion } from "framer-motion"

export default function PressPage() {
  const pressReleases = [
    {
      id: 1,
      title: "JobConnect Secures $15M in Series A Funding to Expand AI Recruitment Platform",
      date: "May 15, 2023",
      excerpt: "Funding will accelerate product development and market expansion to help more companies find the right talent.",
      link: "#"
    },
    {
      id: 2,
      title: "JobConnect Launches New AI-Powered Candidate Matching System",
      date: "March 22, 2023",
      excerpt: "Revolutionary technology uses machine learning to better connect job seekers with their ideal positions.",
      link: "#"
    },
    {
      id: 3,
      title: "JobConnect Reaches Milestone of 1 Million Registered Users",
      date: "February 8, 2023",
      excerpt: "Platform celebrates rapid growth as it continues to transform the recruitment landscape.",
      link: "#"
    },
    {
      id: 4,
      title: "JobConnect Announces Strategic Partnership with Fortune 500 Companies",
      date: "January 17, 2023",
      excerpt: "Collaboration aims to streamline hiring processes and improve candidate experiences.",
      link: "#"
    },
  ]

  const mediaFeatures = [
    {
      id: 1,
      title: "How JobConnect is Revolutionizing the Recruitment Industry",
      publication: "Tech Innovators",
      date: "April 10, 2023",
      link: "#"
    },
    {
      id: 2,
      title: "The AI-First Approach to Modern Hiring: A Look at JobConnect",
      publication: "Business Weekly",
      date: "March 15, 2023",
      link: "#"
    },
    {
      id: 3,
      title: "JobConnect Named Among Top 10 HR Tech Startups to Watch",
      publication: "Startup Observer",
      date: "February 22, 2023",
      link: "#"
    },
    {
      id: 4,
      title: "Interview: JobConnect CEO on the Future of Work and Recruitment",
      publication: "Digital Trends",
      date: "January 30, 2023",
      link: "#"
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Press & Media</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Latest news, press releases, and media resources about JobConnect
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main content - Press releases */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Press Releases</h2>
            
            <div className="space-y-8">
              {pressReleases.map((release, index) => (
                <motion.div 
                  key={release.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{release.date}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{release.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{release.excerpt}</p>
                  <a 
                    href={release.link} 
                    className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                  >
                    Read full release
                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </div>
            
            {/* Media Features */}
            <h2 className="text-3xl font-bold mt-16 mb-8 text-gray-900 dark:text-white">Media Coverage</h2>
            
            <div className="space-y-4">
              {mediaFeatures.map((feature, index) => (
                <motion.div 
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span className="font-medium text-purple-600 dark:text-purple-400">{feature.publication}</span>
                      <span className="mx-2">•</span>
                      <span>{feature.date}</span>
                    </div>
                  </div>
                  <a 
                    href={feature.link} 
                    className="flex-shrink-0 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Sidebar - Resources */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Press Contact */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Press Contact</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For media inquiries, please contact our press team.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">press@jobconnect.com</span>
                </div>
              </div>
            </div>
            
            {/* Company Facts */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Company Facts</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Founded in 2020 by tech and HR industry veterans</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Headquartered in San Francisco with offices in New York, London, and Singapore</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Over 500,000 companies and 10+ million job seekers on the platform</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>$25M in total funding from top-tier investors</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Team of 150+ employees globally</span>
                </li>
              </ul>
            </div>
            
            {/* Media Resources */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Media Resources</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Download official logos, product screenshots, and executive headshots for media use.
              </p>
              <div className="space-y-4">
                <a 
                  href="#" 
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm12 12V4H6v12h10z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Brand Assets</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Logos, brand guidelines</div>
                  </div>
                </a>
                <a 
                  href="#" 
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Product Images</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Screenshots, mockups</div>
                  </div>
                </a>
                <a 
                  href="#" 
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Leadership Photos</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Executive headshots</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 