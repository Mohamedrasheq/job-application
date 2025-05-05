"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function RecruiterPage() {
  const router = useRouter()
  const [recruiterEmail, setRecruiterEmail] = useState<string | null>(null)
  const [recruiterName, setRecruiterName] = useState<string | null>(null)
  const [jobs, setJobs] = useState<any[]>([])
  const [selectedJob, setSelectedJob] = useState<any | null>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [showJobForm, setShowJobForm] = useState(false)
  const [showAllTools, setShowAllTools] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    requiredSkills: "",
  })
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const checkSession = () => {
      const user = localStorage.getItem("user")
      const userType = localStorage.getItem("userType")

      if (!user || userType !== "recruiter") {
        router.push("/sign-in-sign-up")
        return
      }

      try {
        const userData = JSON.parse(user)
        setRecruiterEmail(userData.email)
        setRecruiterName(userData.name)
        loadJobs(userData.email)
      } catch (error) {
        console.error("Error parsing user data", error)
        router.push("/sign-in-sign-up")
      }
    }

    checkSession()
  }, [router])

  const loadJobs = async (email: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/recruiter?action=getJobs&email=${email}`)
      const data = await response.json()

      if (response.ok) {
        setJobs(data.jobs || [])
      } else {
        setError(data.message || "Failed to load jobs")
      }
    } catch (error) {
      setError("Error loading jobs. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const loadApplications = async (jobId: number) => {
    if (!recruiterEmail) return

    try {
      setLoading(true)
      const response = await fetch(`/api/recruiter?action=getJobApplications&email=${recruiterEmail}&jobId=${jobId}`)
      const data = await response.json()

      if (response.ok) {
        setApplications(data.applications || [])
      } else {
        setError(data.message || "Failed to load applications")
      }
    } catch (error) {
      setError("Error loading applications. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleJobSelect = (job: any) => {
    setSelectedJob(job)
    loadApplications(job.id)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recruiterEmail) return

    try {
      setLoading(true)
      setError("")
      setSuccessMessage("")

      const response = await fetch("/api/recruiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "createJob",
          recruiterEmail,
          ...formData,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage("Job posted successfully!")
        // Reset form and refresh jobs
        setFormData({
          title: "",
          description: "",
          company: "",
          location: "",
          salary: "",
          requiredSkills: "",
        })
        setShowJobForm(false)
        loadJobs(recruiterEmail)
      } else {
        setError(data.message || "Failed to create job")
      }
    } catch (error) {
      setError("Error creating job. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateApplicationStatus = async (applicationId: number, status: string) => {
    if (!recruiterEmail) return

    try {
      setLoading(true)

      const response = await fetch("/api/recruiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "updateApplicationStatus",
          recruiterEmail,
          applicationId,
          status,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh applications list
        if (selectedJob) {
          loadApplications(selectedJob.id)
        }
        setSuccessMessage("Application status updated!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        setError(data.message || "Failed to update application status")
      }
    } catch (error) {
      setError("Error updating application status. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteJob = async (jobId: number) => {
    if (!recruiterEmail || !confirm("Are you sure you want to delete this job posting?")) return

    try {
      setLoading(true)

      const response = await fetch("/api/recruiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "deleteJob",
          recruiterEmail,
          jobId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage("Job deleted successfully!")
        // Refresh jobs list and reset selected job
        loadJobs(recruiterEmail)
        setSelectedJob(null)
        setApplications([])
      } else {
        setError(data.message || "Failed to delete job")
      }
    } catch (error) {
      setError("Error deleting job. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userType")
    router.push("/sign-in-sign-up")
  }

  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  // Floating animation for background elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  }

  // Pulse animation for empty state
  const pulseAnimation = {
    scale: [1, 1.02, 1],
    opacity: [0.7, 0.9, 0.7],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-[800px] h-[800px] border-8 border-blue-600 rounded-full"
          />
        </div>
        <div className="grid grid-cols-5 gap-16 absolute inset-0 p-8">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              animate={floatingAnimation}
              className="text-blue-600 text-opacity-20 text-6xl font-bold"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {i % 2 === 0 ? "JOBS" : "HIRE"}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated particles */}
      {typeof window !== 'undefined' && Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-blue-500 bg-opacity-20"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -500 - 100],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
          }}
        />
      ))}

      <header className="bg-white shadow-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Recruiter Dashboard
          </motion.h1>
          <div className="flex items-center space-x-4">
            {recruiterName && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold"
                >
                  {recruiterName.charAt(0)}
                </motion.div>
                <p className="text-gray-600">Welcome, {recruiterName}</p>
              </motion.div>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Sign Out
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-100 text-red-700 rounded-md"
          >
            {error}
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-green-100 text-green-700 rounded-md"
          >
            {successMessage}
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8"
        >
          <div className="w-full md:w-1/3">
            <div className="flex justify-between items-center mb-6">
              <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-gray-800">
                Your Job Postings
              </motion.h2>
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowJobForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition shadow-md"
              >
                Post New Job
              </motion.button>
            </div>

            {loading && !jobs.length ? (
              <motion.div variants={itemVariants} className="text-center p-8 bg-white rounded-lg shadow">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your jobs...</p>
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-lg shadow overflow-hidden border border-gray-100"
              >
                {jobs.length === 0 ? (
                  <motion.div variants={itemVariants} className="text-center p-8 space-y-4" animate={pulseAnimation}>
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500">You haven't posted any jobs yet.</p>
                    <button
                      onClick={() => setShowJobForm(true)}
                      className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Create your first job posting!
                    </button>

                    {/* Empty state content */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Quick Tips</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <motion.li whileHover={{ x: 3 }} className="flex items-center space-x-2">
                          <span className="text-blue-500">•</span>
                          <span>Write clear job descriptions to attract qualified candidates</span>
                        </motion.li>
                        <motion.li whileHover={{ x: 3 }} className="flex items-center space-x-2">
                          <span className="text-blue-500">•</span>
                          <span>List specific required skills to improve matching</span>
                        </motion.li>
                        <motion.li whileHover={{ x: 3 }} className="flex items-center space-x-2">
                          <span className="text-blue-500">•</span>
                          <span>Include salary information for better candidate engagement</span>
                        </motion.li>
                      </ul>
                    </div>
                  </motion.div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    <AnimatePresence>
                      {jobs.map((job) => (
                        <motion.li
                          key={job.id}
                          variants={itemVariants}
                          layout
                          onClick={() => handleJobSelect(job)}
                          whileHover={{ backgroundColor: "rgba(239, 246, 255, 0.6)" }}
                          className={`p-4 cursor-pointer hover:bg-blue-50 transition ${
                            selectedJob?.id === job.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                          }`}
                        >
                          <h3 className="font-medium text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-500">
                            {job.company} • {job.location}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Posted: {new Date(job.posted_at).toLocaleDateString()}
                          </p>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            className="h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 mt-2 opacity-30"
                          />
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </motion.div>
            )}

            {/* Stats section for empty space */}
            {jobs.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="mt-8 bg-white rounded-lg shadow p-6 border border-gray-100"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ y: -3 }} className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Active Jobs</p>
                    <p className="text-2xl font-bold text-blue-600">{jobs.length}</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }} className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Applications</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {applications.length > 0 ? applications.length : "—"}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="w-full md:w-2/3">
            {selectedJob ? (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                    <p className="text-gray-600">
                      {selectedJob.company} • {selectedJob.location}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteJob(selectedJob.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition"
                  >
                    Delete Job
                  </motion.button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedJob.description}</p>
                </div>

                {selectedJob.salary && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Salary</h3>
                    <p className="text-gray-700">{selectedJob.salary}</p>
                  </div>
                )}

                {selectedJob.required_skills && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.required_skills.split(",").map((skill: string, index: number) => (
                        <motion.span
                          key={index}
                          whileHover={{ y: -2 }}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill.trim()}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-semibold mb-4">Applications ({applications.length})</h3>

                  {loading && !applications.length ? (
                    <div className="text-center p-8">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Loading applications...</p>
                    </div>
                  ) : applications.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center p-8 bg-gray-50 rounded-lg"
                    >
                      <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-500 mt-4">No applications yet for this job.</p>

                      {/* Empty applications content */}
                      <div className="mt-6 text-left">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Tips to attract more applicants:</h4>
                        <ul className="text-sm text-gray-500 space-y-2">
                          <motion.li whileHover={{ x: 3 }} className="flex items-start space-x-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Make sure your job title is clear and searchable</span>
                          </motion.li>
                          <motion.li whileHover={{ x: 3 }} className="flex items-start space-x-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Include salary information to increase application rates</span>
                          </motion.li>
                          <motion.li whileHover={{ x: 3 }} className="flex items-start space-x-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Add more details about company culture and benefits</span>
                          </motion.li>
                        </ul>
                      </div>
                    </motion.div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      <AnimatePresence>
                        {applications.map((app) => (
                          <motion.li
                            key={app.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-4"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">{app.name}</h4>
                                <p className="text-sm text-gray-500">{app.email}</p>
                                <p className="text-sm mt-1">
                                  <span className="font-medium">Skills: </span>
                                  {app.candidate_skills}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Applied: {new Date(app.applied_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex flex-col items-end">
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className={`text-sm mb-2 px-2 py-1 rounded-full ${
                                    app.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : app.status === "interviewing"
                                        ? "bg-blue-100 text-blue-800"
                                        : app.status === "accepted"
                                          ? "bg-green-100 text-green-800"
                                          : app.status === "rejected"
                                            ? "bg-red-100 text-red-800"
                                            : ""
                                  }`}
                                >
                                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                </motion.div>
                                <div className="flex space-x-2">
                                  <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => handleUpdateApplicationStatus(app.id, "pending")}
                                    className={`text-xs px-2 py-1 rounded ${
                                      app.status === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-gray-100"
                                    }`}
                                  >
                                    Pending
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => handleUpdateApplicationStatus(app.id, "interviewing")}
                                    className={`text-xs px-2 py-1 rounded ${
                                      app.status === "interviewing" ? "bg-blue-200 text-blue-800" : "bg-gray-100"
                                    }`}
                                  >
                                    Interview
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => handleUpdateApplicationStatus(app.id, "accepted")}
                                    className={`text-xs px-2 py-1 rounded ${
                                      app.status === "accepted" ? "bg-green-200 text-green-800" : "bg-gray-100"
                                    }`}
                                  >
                                    Accept
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => handleUpdateApplicationStatus(app.id, "rejected")}
                                    className={`text-xs px-2 py-1 rounded ${
                                      app.status === "rejected" ? "bg-red-200 text-red-800" : "bg-gray-100"
                                    }`}
                                  >
                                    Reject
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow p-8 text-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="mx-auto">
                  <svg
                    className="mx-auto h-16 w-16 text-blue-400"
                    fill="none"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </motion.div>
                <motion.h3 className="mt-4 text-lg font-medium text-gray-900" whileHover={{ color: "#4F46E5" }}>
                  Select a job to view details
                </motion.h3>
                <motion.p
                  className="mt-2 text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
                >
                  Click on one of your job postings to view details and applications
                </motion.p>

                {/* Empty state content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-6 border-t border-gray-200"
                >
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                    Recruiter Dashboard Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div whileHover={{ y: -5 }} className="bg-blue-50 p-4 rounded-lg text-left">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Post Jobs</h4>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        Create job listings with detailed descriptions and requirements
                      </p>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="bg-purple-50 p-4 rounded-lg text-left">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-purple-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Review Applications</h4>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Manage candidate applications and track their status</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -5 }} className="bg-green-50 p-4 rounded-lg text-left">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h4 className="font-medium text-gray-900">Schedule Interviews</h4>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        Update application status and manage the hiring process
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Stats Overview Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Recruitment Overview</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track your recruitment metrics and improve your hiring process with data-driven insights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Active Jobs</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{jobs.length}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Currently active job postings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600 dark:text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Total Applicants</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{applications.length}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Candidates who applied to your jobs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Interviews</h3>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {applications.filter((app) => app.status === "interviewing").length}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Candidates in interview stage</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Hired</h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {applications.filter((app) => app.status === "accepted").length}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Candidates who received offers</p>
          </motion.div>
        </div>
      </section>

      {/* Recruitment Tips Section */}
      <section className="py-20 bg-blue-50 dark:bg-gray-800 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Recruitment Best Practices
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Optimize your hiring process with these proven strategies to attract and retain top talent.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Craft Compelling Job Descriptions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Write clear, detailed job descriptions that highlight both responsibilities and benefits. Include
                specific requirements and company culture to attract the right candidates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Streamline Your Interview Process
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create a structured interview process with clear stages. Respond quickly to applicants and provide
                timely feedback to maintain candidate engagement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
            >
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Assess Cultural Fit</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Evaluate candidates not just on skills but also on how well they align with your company values and
                culture. This leads to better retention and team cohesion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recruitment Insights Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle at center, rgba(79, 70, 229, 0.2) 0%, transparent 50%)",
              backgroundSize: "100% 100%",
            }}
          />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Recruitment Insights</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Leverage data-driven insights to optimize your hiring process and make better decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 border border-blue-100"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Hiring Funnel Analysis</h3>
              <div className="space-y-4">
                {[
                  { stage: "Applications", value: 100, color: "bg-blue-500" },
                  { stage: "Screening", value: 65, color: "bg-blue-600" },
                  { stage: "Interviews", value: 40, color: "bg-purple-500" },
                  { stage: "Offers", value: 20, color: "bg-purple-600" },
                  { stage: "Hires", value: 12, color: "bg-green-500" },
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.stage}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <motion.div
                      className="h-2 rounded-full bg-gray-200"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <motion.div
                        className={`h-full rounded-full ${item.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 border border-blue-100"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Time-to-Hire Metrics</h3>
              <div className="space-y-6">
                <div className="relative pt-8">
                  <div className="absolute top-0 left-0 w-full flex justify-between">
                    <span className="text-xs text-gray-500">0 days</span>
                    <span className="text-xs text-gray-500">30 days</span>
                    <span className="text-xs text-gray-500">60 days</span>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full">
                    <motion.div
                      className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                    />
                  </div>
                  <motion.div
                    className="absolute top-0 left-0 w-4 h-4 bg-purple-500 rounded-full -mt-1.5 border-2 border-white shadow-md"
                    initial={{ left: 0 }}
                    whileInView={{ left: "75%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ y: -5 }} className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Industry Average</p>
                    <p className="text-2xl font-bold text-blue-600">45 days</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Your Average</p>
                    <p className="text-2xl font-bold text-purple-600">32 days</p>
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Breakdown by Role Type</h4>
                  <div className="space-y-3">
                    {[
                      { role: "Engineering", days: 38, color: "bg-blue-500" },
                      { role: "Design", days: 25, color: "bg-purple-500" },
                      { role: "Marketing", days: 22, color: "bg-green-500" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.role}</span>
                          <span>{item.days} days</span>
                        </div>
                        <motion.div
                          className="h-2 rounded-full bg-gray-200"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                          <motion.div
                            className={`h-full rounded-full ${item.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(item.days / 60) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                          />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white relative z-10 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute rounded-full bg-white"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                x: [null, `${Math.random() * 100}%`],
                y: [null, `${Math.random() * 100}%`],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Recruitment Tools</h2>
            <p className="text-lg text-blue-100">
              Powerful tools to streamline your recruitment process and find the perfect candidates faster.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Candidate Matching</h3>
              <p className="text-blue-100 mb-4">
                Our AI algorithm matches job requirements with candidate profiles to find the perfect fit for your open
                positions.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-md text-blue-100 border border-blue-400/30 transition"
              >
                Try Matching
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-purple-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Interview Scheduler</h3>
              <p className="text-blue-100 mb-4">
                Automate the scheduling process with our integrated calendar tool. Send invites and manage interview
                slots effortlessly.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-md text-purple-100 border border-purple-400/30 transition"
              >
                Schedule Now
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-green-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Performance Analytics</h3>
              <p className="text-blue-100 mb-4">
                Track key recruitment metrics and get actionable insights to optimize your hiring process and reduce
                time-to-hire.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-md text-green-100 border border-green-400/30 transition"
              >
                View Analytics
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(79, 70, 229, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAllTools(!showAllTools)}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium shadow-lg"
            >
              {showAllTools ? "Hide Tools" : "Explore All Tools"}
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {showAllTools && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 overflow-hidden"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Bulk Job Posting</h3>
                    <p className="text-blue-100 mb-3 text-sm">Create multiple job listings at once by importing from spreadsheets or templates.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-md text-indigo-100 border border-indigo-400/30 transition"
                    >
                      Create Bulk Posts
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Email Campaigns</h3>
                    <p className="text-blue-100 mb-3 text-sm">Send personalized emails to candidates and automate follow-up communication.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-100 border border-orange-400/30 transition"
                    >
                      Create Campaign
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Video Interviews</h3>
                    <p className="text-blue-100 mb-3 text-sm">Schedule and conduct video interviews with candidates directly from the platform.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm px-3 py-1.5 bg-pink-500/20 hover:bg-pink-500/30 rounded-md text-pink-100 border border-pink-400/30 transition"
                    >
                      Schedule Interview
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Assessment Tests</h3>
                    <p className="text-blue-100 mb-3 text-sm">Create custom skills assessments and personality tests for candidates.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-md text-cyan-100 border border-cyan-400/30 transition"
                    >
                      Create Tests
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Resume Parser</h3>
                    <p className="text-blue-100 mb-3 text-sm">Extract key information from resumes to quickly identify qualified candidates.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 rounded-md text-amber-100 border border-amber-400/30 transition"
                    >
                      Parse Resumes
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-lime-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lime-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Workflow Builder</h3>
                    <p className="text-blue-100 mb-3 text-sm">Create custom hiring workflows with automated steps and approval processes.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm px-3 py-1.5 bg-lime-500/20 hover:bg-lime-500/30 rounded-md text-lime-100 border border-lime-400/30 transition"
                    >
                      Build Workflow
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-rose-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Recruitment Reports</h3>
                    <p className="text-blue-100 mb-3 text-sm">Generate detailed reports on recruitment metrics and talent acquisition performance.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 rounded-md text-rose-100 border border-rose-400/30 transition"
                    >
                      View Reports
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Candidate Portal</h3>
                    <p className="text-blue-100 mb-3 text-sm">Give candidates access to a personalized portal to track their application status.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm px-3 py-1.5 bg-violet-500/20 hover:bg-violet-500/30 rounded-md text-violet-100 border border-violet-400/30 transition"
                    >
                      View Portal
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-800 text-white py-6 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6 mb-4"
          >
            <motion.a whileHover={{ y: -3 }} href="#" className="text-gray-400 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </motion.a>
            <motion.a whileHover={{ y: -3 }} href="#" className="text-gray-400 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>
            <motion.a whileHover={{ y: -3 }} href="#" className="text-gray-400 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          </motion.div>
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} JobConnect. All rights reserved.</p>
        </div>
      </footer>

      {/* Job Form Modal */}
      <AnimatePresence>
        {showJobForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
            >
              <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>

              <form onSubmit={handleCreateJob}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Job Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company*
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                      Salary
                    </label>
                    <input
                      type="text"
                      id="salary"
                      name="salary"
                      placeholder="e.g. $50,000 - $70,000"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700">
                      Required Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      id="requiredSkills"
                      name="requiredSkills"
                      placeholder="e.g. JavaScript, React, Node.js"
                      value={formData.requiredSkills}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Job Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      required
                      value={formData.description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <motion.button
                    type="button"
                    onClick={() => setShowJobForm(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.05 } : undefined}
                    whileTap={!loading ? { scale: 0.95 } : undefined}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {loading ? "Posting..." : "Post Job"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
