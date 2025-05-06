"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function HelpCenterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields")
      return
    }
    
    setIsSubmitting(true)
    setError("")
    
    try {
      // In a real application, you would submit the form data to your backend
      // For this example, we'll simulate a successful submission after a short delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Reset form and show success message
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general",
      })
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 5000) // Reset success message after 5 seconds
    } catch (err) {
      setError("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqItems = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of our homepage. You'll need to provide your email address and create a password. You can then choose whether you're a job seeker or a recruiter to complete your profile setup."
    },
    {
      question: "How can I reset my password?",
      answer: "If you've forgotten your password, click on the 'Sign In' button, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you instructions to reset your password."
    },
    {
      question: "How do I apply for a job?",
      answer: "To apply for a job, first make sure you're signed in to your job seeker account. Browse or search for jobs, and when you find one you're interested in, click the 'Apply' button on the job listing. You'll be guided through the application process, which may include submitting your resume and answering any specific questions the employer has required."
    },
    {
      question: "How do I post a job as a recruiter?",
      answer: "Log in to your recruiter account and navigate to your dashboard. Click on the 'Post a New Job' button and fill out the job details form. Once completed, click 'Submit' to publish your job listing."
    },
    {
      question: "What are the subscription options for recruiters?",
      answer: "We offer three subscription tiers for recruiters: Basic ($20/month) which includes standard features, Intermediate ($40/month) with additional tools and priority support, and Premium ($50/month) which includes all features, priority support, and advanced analytics."
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-teal-100">
            Get answers to your questions and connect with our support team
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - FAQ */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.question}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Help topics */}
            <motion.div 
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                {
                  title: "Account Management",
                  description: "Learn how to manage your profile, security settings, and notifications.",
                  icon: "👤"
                },
                {
                  title: "Job Applications",
                  description: "Everything you need to know about applying for jobs and tracking applications.",
                  icon: "📝"
                },
                {
                  title: "Resume Building",
                  description: "Tips and guides on creating an effective resume and showcasing your skills.",
                  icon: "📄"
                },
                {
                  title: "Recruiter Tools",
                  description: "Information about posting jobs, reviewing applications, and connecting with candidates.",
                  icon: "🔍"
                }
              ].map((topic, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-3">{topic.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{topic.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{topic.description}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Contact form */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Support</h2>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-md mb-4"
                >
                  Thank you for your message! Our support team will get back to you soon.
                </motion.div>
              ) : null}
              
              {error && (
                <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="account">Account Issues</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Questions</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-md font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 