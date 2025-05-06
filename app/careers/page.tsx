"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  
  const departments = ["All", "Engineering", "Product", "Design", "Marketing", "Sales", "Customer Success", "Operations", "HR"]
  
  const jobListings = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "San Francisco, CA (Remote Option)",
      type: "Full-time",
      description: "We're looking for an experienced Full Stack Developer to join our Engineering team to help build and scale our core platform. The ideal candidate has experience with React, Node.js, and cloud infrastructure.",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      description: "Join our Product team to help shape the future of our recruitment platform. You'll work closely with engineering, design, and business stakeholders to define product strategy and roadmap.",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "We're seeking a talented UX/UI Designer who can create intuitive and beautiful experiences for our users. You'll work on everything from user research to high-fidelity designs and collaborate with product and engineering teams.",
    },
    {
      id: 4,
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "London, UK",
      type: "Full-time",
      description: "Drive user acquisition and retention through data-driven marketing campaigns. You'll be responsible for optimizing our marketing funnel and working across channels to hit growth targets.",
    },
    {
      id: 5,
      title: "Sales Development Representative",
      department: "Sales",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Join our high-performing sales team to help connect companies with our recruitment solutions. You'll be responsible for prospecting, qualifying leads, and setting up meetings for our account executives.",
    },
    {
      id: 6,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Singapore",
      type: "Full-time",
      description: "Help our customers get the most value from our platform. You'll be the main point of contact for a portfolio of customers, responsible for onboarding, training, and ensuring customer satisfaction and retention.",
    },
    {
      id: 7,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Join our infrastructure team to help build and maintain our cloud infrastructure. Experience with AWS, Kubernetes, and CI/CD pipelines is required.",
    },
    {
      id: 8,
      title: "Data Analyst",
      department: "Operations",
      location: "New York, NY",
      type: "Full-time",
      description: "Turn data into insights that drive business decisions. You'll work with multiple teams to analyze user behavior, create dashboards, and help us become more data-driven.",
    },
    {
      id: 9,
      title: "Talent Acquisition Specialist",
      department: "HR",
      location: "Remote",
      type: "Full-time",
      description: "Help us build the best team in the industry! You'll be responsible for sourcing, screening, and recruiting top talent across multiple departments.",
    },
  ]
  
  const filteredJobs = jobListings.filter(job => {
    return (
      (selectedDepartment === "All" || job.department === selectedDepartment) &&
      (job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       job.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Build the future of recruitment with us. Discover exciting opportunities at JobConnect.
          </p>
        </div>
      </header>

      {/* Why Join Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Why Join JobConnect?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Impactful Work</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Help millions of people find their dream jobs and companies build amazing teams. Your work directly impacts the global workforce.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 000 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Innovative Technology</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Work with cutting-edge technologies, AI, and machine learning to solve complex problems in recruitment and career development.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Diverse Culture</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join a global team with diverse backgrounds, perspectives, and experiences united by a mission to transform how people find jobs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Benefits & Perks</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="mb-4 text-green-600 dark:text-green-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Flexible Work</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Work remotely or from our offices with flexible hours that support your productivity and work-life balance.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="mb-4 text-green-600 dark:text-green-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Competitive Compensation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive salary packages, equity options, and performance bonuses to reward your contributions.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="mb-4 text-green-600 dark:text-green-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Health & Wellness</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive health insurance, mental health support, wellness programs, and gym memberships.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="mb-4 text-green-600 dark:text-green-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Learning & Development</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Generous professional development budget, learning resources, and career growth opportunities.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="mb-4 text-green-600 dark:text-green-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Generous Time Off</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Unlimited PTO, paid holidays, parental leave, and sabbaticals to rest, recharge, and pursue personal interests.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="mb-4 text-green-600 dark:text-green-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Team Events</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Regular team-building activities, off-sites, company retreats, and social events to foster connection.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="mb-4 text-green-600 dark:text-green-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Modern Tools</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The latest hardware and software to help you do your best work, whether at home or in the office.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="mb-4 text-green-600 dark:text-green-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Social Impact</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Paid volunteer time off, donation matching, and opportunities to give back to the communities we serve.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Open Positions</h2>
            
            <div className="max-w-4xl mx-auto mb-10">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search positions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Job Listings */}
              <div className="space-y-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                        <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900 dark:text-green-200">
                            {job.department}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-200">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{job.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {job.location}
                        </span>
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-300">No positions found matching your criteria.</p>
                    <button 
                      onClick={() => {
                        setSelectedDepartment("All");
                        setSearchQuery("");
                      }} 
                      className="mt-4 px-4 py-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Don't see a fit? */}
            <div className="max-w-3xl mx-auto text-center mt-16">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Don't See a Position That Fits?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute!
              </p>
              <a href="mailto:careers@jobconnect.com" className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors">
                Send Us Your Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 