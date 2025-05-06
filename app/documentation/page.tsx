"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("getting-started")

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Welcome to JobConnect</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            JobConnect is a comprehensive platform designed to connect job seekers with the right employers and help recruiters find the best candidates. This documentation will guide you through using our platform effectively.
          </p>
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Creating an Account</h4>
          <ol className="list-decimal pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Visit the JobConnect homepage and click on "Sign Up" in the top right corner.</li>
            <li>Enter your email address and create a secure password.</li>
            <li>Choose your account type: Job Seeker or Recruiter.</li>
            <li>Complete your profile with relevant information.</li>
            <li>Verify your email address by clicking the link sent to your inbox.</li>
          </ol>
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Navigating the Dashboard</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            After logging in, you'll be directed to your personalized dashboard. The dashboard provides a quick overview of your account activity and key metrics.
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li><strong>Job Seekers:</strong> View job recommendations, application status, and resume analytics.</li>
            <li><strong>Recruiters:</strong> See applicant statistics, active job postings, and candidate matches.</li>
          </ul>
        </div>
      )
    },
    {
      id: "job-seekers",
      title: "For Job Seekers",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Job Seeker Guide</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            As a job seeker, JobConnect offers powerful tools to help you find and apply for your dream job. Here's how to make the most of our platform.
          </p>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Creating Your Profile</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            A complete profile increases your chances of being noticed by employers. Make sure to include:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Professional photo</li>
            <li>Concise bio highlighting your career goals</li>
            <li>Education history</li>
            <li>Work experience with detailed descriptions</li>
            <li>Skills and proficiency levels</li>
            <li>Portfolio links (if applicable)</li>
          </ul>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Building Your Resume</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our resume builder helps you create a professional resume that stands out to employers. You can:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Choose from multiple templates</li>
            <li>Customize sections to highlight your strengths</li>
            <li>Get real-time feedback on improvement areas</li>
            <li>Export your resume in multiple formats</li>
            <li>Create multiple versions for different job types</li>
          </ul>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Searching for Jobs</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our advanced search features help you find the perfect job match:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Filter by location, industry, job type, and salary range</li>
            <li>Save your search criteria for future use</li>
            <li>Set up job alerts to be notified of new postings</li>
            <li>View company profiles and reviews</li>
            <li>See how well your skills match job requirements</li>
          </ul>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Applying for Jobs</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When you find a job you're interested in:
          </p>
          <ol className="list-decimal pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Click the "Apply" button on the job listing</li>
            <li>Select which resume version to submit</li>
            <li>Complete any additional application questions</li>
            <li>Add a custom cover letter if desired</li>
            <li>Review your application before submitting</li>
            <li>Track your application status in your dashboard</li>
          </ol>
        </div>
      )
    },
    {
      id: "recruiters",
      title: "For Recruiters",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recruiter Guide</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            JobConnect provides recruiters with powerful tools to find and connect with the best candidates. Here's how to maximize your recruiting efforts.
          </p>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Setting Up Your Company Profile</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Creating a compelling company profile helps attract quality candidates:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Upload your company logo and cover image</li>
            <li>Write an engaging company description</li>
            <li>Highlight company culture and benefits</li>
            <li>Showcase office photos and team events</li>
            <li>List company achievements and awards</li>
            <li>Add social media links and website</li>
          </ul>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Posting a Job</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            To create effective job listings:
          </p>
          <ol className="list-decimal pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li>From your dashboard, select "Post a New Job"</li>
            <li>Create a clear, descriptive job title</li>
            <li>Specify location, employment type, and salary range</li>
            <li>Write a detailed job description with responsibilities and requirements</li>
            <li>List required skills and qualifications</li>
            <li>Add screening questions if desired</li>
            <li>Set application deadline and visibility options</li>
            <li>Preview and publish your listing</li>
          </ol>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Searching for Candidates</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our talent search tools help you find qualified candidates:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Search by skills, experience, education, and location</li>
            <li>Filter by availability and job preferences</li>
            <li>View detailed candidate profiles and resumes</li>
            <li>Save candidate searches for future reference</li>
            <li>Create talent pools for different positions</li>
          </ul>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Managing Applications</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Efficiently manage your candidate pipeline:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li>View all applications in your dashboard</li>
            <li>Sort and filter applications by various criteria</li>
            <li>Rate candidates and add internal notes</li>
            <li>Move candidates through custom hiring stages</li>
            <li>Schedule interviews directly through the platform</li>
            <li>Send personalized messages to candidates</li>
            <li>Track communication history with each applicant</li>
          </ul>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Subscription Plans</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We offer three subscription tiers for recruiters:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li><strong>Basic ($20/month):</strong> Post up to 5 jobs, basic candidate search, standard support</li>
            <li><strong>Intermediate ($40/month):</strong> Post up to 15 jobs, advanced candidate search, priority support, applicant tracking</li>
            <li><strong>Premium ($50/month):</strong> Unlimited job postings, advanced analytics, priority support, AI candidate matching, custom branding</li>
          </ul>
        </div>
      )
    },
    {
      id: "api",
      title: "API Documentation",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">API Access (Subscribers Only)</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            JobConnect offers API access to subscribers on our premium plans. Our API allows you to integrate JobConnect functionality directly into your existing HR systems and workflows.
          </p>
          
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded-md mb-6">
            <h4 className="font-semibold mb-2">Subscription Required</h4>
            <p>API access is only available to users with an active subscription plan. Please upgrade to access these features.</p>
          </div>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Authentication</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            All API requests require authentication using an API key. To obtain your API key:
          </p>
          <ol className="list-decimal pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Log in to your JobConnect account</li>
            <li>Navigate to Settings &gt; API Access</li>
            <li>Generate a new API key</li>
            <li>Include this key in all API requests as a header: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">X-API-Key: your_api_key</code></li>
          </ol>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Available Endpoints</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our API provides access to the following resources:
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3">Endpoint</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3"><code>/api/v1/jobs</code></td>
                  <td className="px-4 py-3">GET</td>
                  <td className="px-4 py-3">List all job postings</td>
                </tr>
                <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="px-4 py-3"><code>/api/v1/jobs</code></td>
                  <td className="px-4 py-3">POST</td>
                  <td className="px-4 py-3">Create a new job posting</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3"><code>/api/v1/jobs/:id</code></td>
                  <td className="px-4 py-3">GET</td>
                  <td className="px-4 py-3">Get details of a specific job</td>
                </tr>
                <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="px-4 py-3"><code>/api/v1/applications</code></td>
                  <td className="px-4 py-3">GET</td>
                  <td className="px-4 py-3">List all applications</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3"><code>/api/v1/candidates/search</code></td>
                  <td className="px-4 py-3">GET</td>
                  <td className="px-4 py-3">Search for candidates</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Rate Limits</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            API usage is subject to rate limits depending on your subscription tier:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300 space-y-2">
            <li><strong>Basic:</strong> 100 requests per day</li>
            <li><strong>Intermediate:</strong> 1,000 requests per day</li>
            <li><strong>Premium:</strong> 10,000 requests per day</li>
          </ul>
          
          <p className="text-gray-600 dark:text-gray-300 mt-6">
            For complete API documentation including request/response formats and examples, please visit our <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">API Reference</a> page.
          </p>
        </div>
      )
    },
    {
      id: "faq",
      title: "FAQ",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Find answers to common questions about using JobConnect. If you don't see your question here, please contact our support team.
          </p>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Is JobConnect free to use?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                JobConnect is free for job seekers. Recruiters and companies have free basic features with premium features available through our subscription plans starting at $20/month.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">How do I reset my password?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Click on "Sign In", then select "Forgot Password". Enter your email address and follow the instructions sent to your inbox to reset your password.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Can I have both a job seeker and recruiter account?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, but you'll need to register separate accounts with different email addresses for each role.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">How do I delete my account?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Go to Settings &gt; Account Management &gt; Delete Account. Follow the confirmation steps to permanently delete your account. Note that this action cannot be undone.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Can I download my data?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can export your profile data, job applications, and other account information from Settings &gt; Privacy &gt; Download My Data.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">How do recruiters get charged?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Recruiters are billed monthly or annually based on their chosen subscription plan. Payment is processed securely via credit card or PayPal.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Are there mobile apps available?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, JobConnect has mobile apps available for both iOS and Android devices. You can download them from the App Store or Google Play Store.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">How does the job matching algorithm work?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI-powered matching algorithm analyzes your skills, experience, education, and preferences to match you with relevant job opportunities. The more complete your profile, the better the matches will be.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Can I apply for multiple jobs at once?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                No, each job application requires individual attention to ensure you're submitting the most relevant information for each position.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">What happens to my data when I apply for a job?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                When you apply for a job, your profile information and resume are shared with the employer who posted the job. They can only see the information you've made visible in your application.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-sky-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-sky-100">
            Learn how to use JobConnect effectively
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar navigation */}
          <motion.div 
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="sticky top-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contents</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        activeSection === section.id
                          ? "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Need more help?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  If you can't find what you're looking for, our support team is here to help.
                </p>
                <a
                  href="/help-center"
                  className="block w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white text-center rounded-md transition-colors text-sm"
                >
                  Contact Support
                </a>
              </div>
            </nav>
          </motion.div>

          {/* Main content */}
          <motion.div 
            className="lg:w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={activeSection}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {sections.find(section => section.id === activeSection)?.content}
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => {
                  const currentIndex = sections.findIndex(section => section.id === activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].id);
                  }
                }}
                className={`px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  sections.findIndex(section => section.id === activeSection) === 0 ? "invisible" : ""
                }`}
              >
                ← Previous: {sections[Math.max(0, sections.findIndex(section => section.id === activeSection) - 1)].title}
              </button>
              
              <button
                onClick={() => {
                  const currentIndex = sections.findIndex(section => section.id === activeSection);
                  if (currentIndex < sections.length - 1) {
                    setActiveSection(sections[currentIndex + 1].id);
                  }
                }}
                className={`px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  sections.findIndex(section => section.id === activeSection) === sections.length - 1 ? "invisible" : ""
                }`}
              >
                Next: {sections[Math.min(sections.length - 1, sections.findIndex(section => section.id === activeSection) + 1)].title} →
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 