"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function CandidatesPage() {
  const router = useRouter()
  const [candidateEmail, setCandidateEmail] = useState<string | null>(null)
  const [candidateName, setCandidateName] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"resume" | "allJobs" | "matchingJobs" | "applications" | "templates">("resume")
  const [resume, setResume] = useState<any | null>(null)
  const [jobs, setJobs] = useState<any[]>([])
  const [filteredJobs, setFilteredJobs] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [selectedJob, setSelectedJob] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [resumeForm, setResumeForm] = useState({
    education: "",
    experience: "",
    skills: "",
    summary: "",
  })
  const [openResourceModal, setOpenResourceModal] = useState<"resume" | "interview" | "career" | null>(null)

  // Resume template data
  const templateData = {
    professional: {
      name: "Professional Template",
      style: "professional",
      sections: [
        { type: "header", title: "Professional Resume" },
        { type: "contact", fields: ["name", "email", "phone", "location"] },
        { type: "summary", title: "Professional Summary" },
        { type: "experience", title: "Work Experience" },
        { type: "education", title: "Education" },
        { type: "skills", title: "Skills", format: "list" }
      ]
    },
    creative: {
      name: "Creative Template",
      style: "creative",
      sections: [
        { type: "header", title: "Creative Portfolio" },
        { type: "profile", includes: ["photo", "name", "title", "bio"] },
        { type: "experience", title: "Creative Experience" },
        { type: "projects", title: "Portfolio Projects" },
        { type: "skills", title: "Creative Skills", format: "tags" },
        { type: "education", title: "Education" }
      ]
    },
    technical: {
      name: "Technical Template",
      style: "technical",
      sections: [
        { type: "header", title: "Technical Resume" },
        { type: "contact", fields: ["name", "email", "phone", "github", "linkedin"] },
        { type: "skills", title: "Technical Skills", format: "categories" },
        { type: "experience", title: "Professional Experience" },
        { type: "projects", title: "Technical Projects" },
        { type: "education", title: "Education & Certifications" }
      ]
    },
    executive: {
      name: "Executive Template",
      style: "executive",
      sections: [
        { type: "header", title: "Executive Resume" },
        { type: "contact", fields: ["name", "title", "email", "phone", "linkedin"] },
        { type: "summary", title: "Executive Summary" },
        { type: "highlights", title: "Career Highlights" },
        { type: "experience", title: "Leadership Experience" },
        { type: "education", title: "Education" },
        { type: "skills", title: "Core Competencies", format: "columns" }
      ]
    },
    graduate: {
      name: "Graduate Template",
      style: "graduate",
      sections: [
        { type: "header", title: "Graduate Resume" },
        { type: "contact", fields: ["name", "email", "phone", "location"] },
        { type: "education", title: "Education" },
        { type: "coursework", title: "Relevant Coursework" },
        { type: "experience", title: "Experience" },
        { type: "skills", title: "Skills", format: "list" },
        { type: "activities", title: "Activities & Honors" }
      ]
    }
  };

  // Resource content data
  const resourceContent = {
    resume: {
      title: "Resume Building Tips",
      content: [
        {
          subtitle: "Highlight Your Achievements",
          text: "Focus on accomplishments rather than just listing responsibilities. Use specific metrics and results where possible to demonstrate your impact."
        },
        {
          subtitle: "Tailor Your Resume",
          text: "Customize your resume for each job application. Highlight relevant skills and experience that match the job description."
        },
        {
          subtitle: "Keep It Concise",
          text: "Most recruiters spend only 6-7 seconds scanning a resume. Keep your resume to 1-2 pages maximum and use bullet points for better readability."
        },
        {
          subtitle: "Use Keywords",
          text: "Many companies use Applicant Tracking Systems (ATS) to filter resumes. Include relevant keywords from the job description to ensure your resume passes through."
        },
        {
          subtitle: "Professional Format",
          text: "Use a clean, professional design with consistent formatting. Avoid fancy fonts or excessive graphics that might not render properly in ATS systems."
        }
      ],
      resources: [
        { name: "Resume Templates", link: "#templates" },
        { name: "Action Verbs for Resumes", link: "#" },
        { name: "Industry-Specific Resume Examples", link: "#" }
      ]
    },
    interview: {
      title: "Interview Preparation Guide",
      content: [
        {
          subtitle: "Research the Company",
          text: "Learn about the company's mission, values, products, and recent news. Understanding the company helps you tailor your answers and ask informed questions."
        },
        {
          subtitle: "Practice Common Questions",
          text: "Prepare answers for frequently asked questions like 'Tell me about yourself', 'Why do you want this job?', and 'What are your strengths and weaknesses?'"
        },
        {
          subtitle: "Prepare STAR Stories",
          text: "Use the STAR method (Situation, Task, Action, Result) to structure examples from your experience that demonstrate your skills."
        },
        {
          subtitle: "Prepare Questions",
          text: "Have thoughtful questions ready to ask the interviewer about the role, team, and company. This shows your interest and engagement."
        },
        {
          subtitle: "Virtual Interview Tips",
          text: "If interviewing remotely, test your technology, ensure good lighting, find a quiet space, and dress professionally from head to toe."
        }
      ],
      resources: [
        { name: "100 Common Interview Questions", link: "#" },
        { name: "Behavioral Interview Techniques", link: "#" },
        { name: "Virtual Interview Best Practices", link: "#" }
      ]
    },
    career: {
      title: "Career Growth Strategies",
      content: [
        {
          subtitle: "Set Clear Goals",
          text: "Define short-term and long-term career goals. Be specific about what you want to achieve and by when."
        },
        {
          subtitle: "Develop New Skills",
          text: "Continuously learn and upgrade your skills through courses, certifications, workshops, and on-the-job training."
        },
        {
          subtitle: "Build Your Network",
          text: "Connect with professionals in your field through industry events, LinkedIn, and professional associations."
        },
        {
          subtitle: "Seek Feedback",
          text: "Regularly ask for constructive feedback from managers, mentors, and peers to identify areas for improvement."
        },
        {
          subtitle: "Track Your Achievements",
          text: "Document your accomplishments, projects completed, and positive feedback to use when applying for promotions or new roles."
        }
      ],
      resources: [
        { name: "Career Planning Worksheets", link: "#" },
        { name: "Online Learning Platforms", link: "#" },
        { name: "Professional Networking Tips", link: "#" }
      ]
    }
  };

  // Function to handle PDF download
  const handlePdfDownload = (templateType: string) => {
    // Create a template data object with user data if available
    const userData = {
      name: candidateName || "Your Name",
      email: candidateEmail || "your.email@example.com",
      phone: "123-456-7890",
      location: "City, State",
      github: "github.com/username",
      linkedin: "linkedin.com/in/username",
      summary: resumeForm.summary || "Professional summary goes here",
      education: resumeForm.education || "Education details go here",
      experience: resumeForm.experience || "Experience details go here",
      skills: resumeForm.skills || "Skills list goes here",
    };

    // Combine template structure with user data
    const template = templateData[templateType as keyof typeof templateData];
    const combinedData = { ...template, userData };
    
    // Create filename
    const filename = `${template.name.replace(/\s+/g, '-').toLowerCase()}-resume.pdf`;
    
    // In a real app, we would generate a PDF here
    // For this demo, we'll create a text representation and convert it to a Blob
    const pdfContent = `
      ${template.name}
      --------------------
      
      Name: ${userData.name}
      Contact: ${userData.email} | ${userData.phone}
      
      SUMMARY
      -------
      ${userData.summary}
      
      EXPERIENCE
      ----------
      ${userData.experience}
      
      EDUCATION
      ---------
      ${userData.education}
      
      SKILLS
      ------
      ${userData.skills}
    `;
    
    // Create a Blob from the text content
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success message
    setSuccessMessage(`${template.name} downloaded as PDF`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };
  
  // Function to handle JSON download
  const handleJsonDownload = (templateType: string) => {
    // Create a template data object with user data if available
    const userData = {
      name: candidateName || "Your Name",
      email: candidateEmail || "your.email@example.com",
      phone: "123-456-7890",
      location: "City, State",
      github: "github.com/username",
      linkedin: "linkedin.com/in/username",
      summary: resumeForm.summary || "Professional summary goes here",
      education: resumeForm.education || "Education details go here",
      experience: resumeForm.experience || "Experience details go here",
      skills: resumeForm.skills || "Skills list goes here",
    };

    // Combine template structure with user data
    const template = templateData[templateType as keyof typeof templateData];
    const combinedData = { ...template, userData };
    
    // Create filename
    const filename = `${template.name.replace(/\s+/g, '-').toLowerCase()}-resume.json`;
    
    // Convert data to JSON string
    const jsonContent = JSON.stringify(combinedData, null, 2);
    
    // Create a Blob from the JSON string
    const blob = new Blob([jsonContent], { type: 'application/json' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success message
    setSuccessMessage(`${template.name} downloaded as JSON`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Function to handle profile export as JSON
  const handleExportProfileJson = () => {
    if (!candidateEmail) {
      setError("Please sign in to export your profile");
      return;
    }
    
    const profileData = {
      name: candidateName,
      email: candidateEmail,
      summary: resumeForm.summary,
      education: resumeForm.education,
      experience: resumeForm.experience,
      skills: resumeForm.skills,
      applications: applications.length,
    };
    
    // Create filename
    const filename = `${candidateName?.replace(/\s+/g, '-').toLowerCase() || 'profile'}-data.json`;
    
    // Convert data to JSON string
    const jsonContent = JSON.stringify(profileData, null, 2);
    
    // Create a Blob from the JSON string
    const blob = new Blob([jsonContent], { type: 'application/json' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success message
    setSuccessMessage("Profile data exported as JSON");
    setTimeout(() => setSuccessMessage(""), 3000);
  };
  
  // Function to generate PDF from profile
  const handleGenerateProfilePdf = () => {
    if (!candidateEmail) {
      setError("Please sign in to generate a PDF");
      return;
    }
    
    // In a real app, we would generate a PDF here
    // For this demo, we'll create a text representation and convert it to a Blob
    const pdfContent = `
      ${candidateName}'s Resume
      --------------------
      
      Name: ${candidateName}
      Contact: ${candidateEmail}
      
      SUMMARY
      -------
      ${resumeForm.summary}
      
      EXPERIENCE
      ----------
      ${resumeForm.experience}
      
      EDUCATION
      ---------
      ${resumeForm.education}
      
      SKILLS
      ------
      ${resumeForm.skills}
    `;
    
    // Create a Blob from the text content
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    
    // Create filename
    const filename = `${candidateName?.replace(/\s+/g, '-').toLowerCase() || 'profile'}-resume.pdf`;
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success message
    setSuccessMessage("Resume generated as PDF");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Add a function to handle auto-expanding text areas
  const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  // Combine input change and auto-resize in one handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setResumeForm((prev) => ({ ...prev, [name]: value }))
    
    // Auto-resize if it's a textarea
    if (e.target.tagName.toLowerCase() === 'textarea') {
      autoResizeTextarea(e as React.ChangeEvent<HTMLTextAreaElement>);
    }
  }

  useEffect(() => {
    // Check if user is logged in
    const checkSession = () => {
      const user = localStorage.getItem("user")
      const userType = localStorage.getItem("userType")

      if (!user || userType !== "candidate") {
        router.push("/sign-in-sign-up")
        return
      }

      try {
        const userData = JSON.parse(user)
        setCandidateEmail(userData.email)
        setCandidateName(userData.name)

        // Load resume, applications, and jobs
        if (userData.email) {
          loadResume(userData.email)
          loadApplications(userData.email)
          loadAllJobs(userData.email)
          loadFilteredJobs(userData.email)
        }
      } catch (error) {
        console.error("Error parsing user data", error)
        router.push("/sign-in-sign-up")
      }
    }

    checkSession()
  }, [router])

  const loadResume = async (email: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/candidates?action=getResume&email=${email}`)
      const data = await response.json()

      if (response.ok) {
        setResume(data.resume)
        // Pre-fill form with existing resume data
        if (data.resume) {
          setResumeForm({
            education: data.resume.education || "",
            experience: data.resume.experience || "",
            skills: data.resume.skills || "",
            summary: data.resume.summary || "",
          })
        }
      } else if (response.status !== 404) {
        // 404 is expected if there's no resume yet
        setError(data.message || "Failed to load resume")
      }
    } catch (error) {
      setError("Error loading resume. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const loadApplications = async (email: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/candidates?action=getApplications&email=${email}`)
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

  const loadAllJobs = async (email: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/candidates?action=getAllJobs&email=${email}`)
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

  const loadFilteredJobs = async (email: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/candidates?action=getFilteredJobs&email=${email}`)
      const data = await response.json()

      if (response.ok) {
        setFilteredJobs(data.jobs || [])
      } else {
        setError(data.message || "Failed to load filtered jobs")
      }
    } catch (error) {
      setError("Error loading filtered jobs. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitResume = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!candidateEmail) return

    try {
      setLoading(true)
      setError("")
      setSuccessMessage("")

      const response = await fetch("/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "createResume",
          candidateEmail,
          ...resumeForm,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage("Resume saved successfully!")
        setResume(data.resume)

        // Refresh filtered jobs list as skills may have changed
        loadFilteredJobs(candidateEmail)
      } else {
        setError(data.message || "Failed to save resume")
      }
    } catch (error) {
      setError("Error saving resume. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleApplyForJob = async (jobId: number) => {
    if (!candidateEmail) return

    try {
      setLoading(true)
      setError("")
      setSuccessMessage("")

      const response = await fetch("/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "applyForJob",
          candidateEmail,
          jobId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage("Applied for job successfully!")

        // Refresh applications list
        loadApplications(candidateEmail)
      } else {
        setError(data.message || "Failed to apply for job")
      }
    } catch (error) {
      setError("Error applying for job. Please try again.")
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

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  // New animations
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  }

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    opacity: [0.7, 0.9, 0.7],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  }

  const tabHoverAnimation = {
    scale: 1.05,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    transition: { duration: 0.2 },
  }

  // Helper to check if user has already applied for a job
  const hasAppliedForJob = (jobId: number) => {
    return applications.some((app) => app.job_id === jobId)
  }

  // Helper to get application status counts
  const getStatusCounts = () => {
    const counts = {
      pending: 0,
      interviewing: 0,
      accepted: 0,
      rejected: 0,
      total: applications.length,
    }

    applications.forEach((app) => {
      if (counts.hasOwnProperty(app.status)) {
        counts[app.status as keyof typeof counts]++
      }
    })

    return counts
  }

  const statusCounts = getStatusCounts()

  // Calculate match percentage for a job based on skills
  const calculateMatchPercentage = (jobSkills: string) => {
    if (!resume?.skills || !jobSkills) return 0

    const candidateSkillsArray = resume.skills.split(",").map((s: string) => s.trim().toLowerCase())
    const jobSkillsArray = jobSkills.split(",").map((s: string) => s.trim().toLowerCase())

    let matchCount = 0
    jobSkillsArray.forEach((skill: string) => {
      if (candidateSkillsArray.includes(skill)) {
        matchCount++
      }
    })

    return Math.round((matchCount / jobSkillsArray.length) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-[800px] h-[800px] border-8 border-teal-600 rounded-full"
          />
        </div>
        <div className="grid grid-cols-5 gap-16 absolute inset-0 p-8">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              animate={floatingAnimation}
              className="text-teal-600 text-opacity-20 text-6xl font-bold"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {i % 2 === 0 ? "JOBS" : "CAREER"}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated particles */}
      {typeof window !== 'undefined' && Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-teal-500 bg-opacity-20"
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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
            </motion.div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              Candidate Dashboard
            </h1>
          </motion.div>
          <div className="flex items-center space-x-4">
            {candidateName && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold"
                >
                  {candidateName.charAt(0)}
                </motion.div>
                <p className="text-gray-600">Welcome, {candidateName}</p>
              </motion.div>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition shadow-sm"
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
            className="mb-4 p-4 bg-red-100 text-red-700 rounded-md shadow-sm"
          >
            {error}
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-green-100 text-green-700 rounded-md shadow-sm"
          >
            {successMessage}
          </motion.div>
        )}

        {/* Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Applications</p>
                <p className="text-2xl font-bold text-gray-800">{statusCounts.total}</p>
              </div>
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-800">{statusCounts.pending}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Interviewing</p>
                <p className="text-2xl font-bold text-gray-800">{statusCounts.interviewing}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
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
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Accepted</p>
                <p className="text-2xl font-bold text-gray-800">{statusCounts.accepted}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
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
            </div>
          </motion.div>
        </motion.div>

        <div className="mb-6">
          <nav className="flex space-x-4 border-b border-gray-200">
            {[
              { id: "resume", label: "Details to find the job" },
              { id: "matchingJobs", label: "Matching Jobs" },
              { id: "allJobs", label: "All Jobs" },
              { id: "applications", label: "My Applications" },
              { id: "templates", label: "Resume Templates" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={tabHoverAnimation}
                className={`px-4 py-2 font-medium text-sm transition rounded-t-lg ${
                  activeTab === tab.id
                    ? "border-b-2 border-teal-500 text-teal-700 bg-teal-50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </nav>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "resume" && (
            <motion.div
              key="resume"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Details to find the job</h2>
                <div className="text-sm text-gray-500">
                  {resume ? "Last updated: " + new Date(resume.updated_at).toLocaleDateString() : "No resume yet"}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Resume Tips</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Be specific about your skills to improve job matching</li>
                        <li>Include quantifiable achievements in your experience</li>
                        <li>Keep your summary concise and focused on your career goals</li>
                        <li>Update your resume regularly to reflect new skills and experiences</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.form variants={itemVariants} onSubmit={handleSubmitResume} className="space-y-6">
                <div>
                  <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Summary
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    rows={1}
                    value={resumeForm.summary}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 min-h-[40px] text-left flex items-center py-2 pl-4"
                    placeholder="Brief overview of your professional background and goals"
                    onFocus={autoResizeTextarea}
                    style={{ display: 'flex', alignItems: 'center' }}
                  />
                </div>

                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                    Education
                  </label>
                  <textarea
                    id="education"
                    name="education"
                    rows={1}
                    value={resumeForm.education}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 min-h-[40px] text-left flex items-center py-2 pl-4"
                    placeholder="List your educational qualifications, degrees, and institutions"
                    onFocus={autoResizeTextarea}
                    style={{ display: 'flex', alignItems: 'center' }}
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Work Experience
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    rows={1}
                    value={resumeForm.experience}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 min-h-[40px] text-left flex items-center py-2 pl-4"
                    placeholder="Detail your work history, responsibilities, and achievements"
                    onFocus={autoResizeTextarea}
                    style={{ display: 'flex', alignItems: 'center' }}
                  />
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={resumeForm.skills}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-left h-[40px] pl-4"
                    placeholder="e.g. JavaScript, React, Node.js, Project Management"
                    style={{ lineHeight: '40px' }}
                  />
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-md hover:from-teal-600 hover:to-blue-600 transition disabled:opacity-50 shadow-sm"
                  >
                    {loading ? "Saving..." : "Save Resume"}
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          )}

          {activeTab === "allJobs" && (
            <motion.div key="allJobs" initial="hidden" animate="visible" exit="hidden" variants={containerVariants}>
              <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">All Available Jobs</h2>
                <div className="text-sm text-gray-500">{jobs.length} jobs found</div>
              </motion.div>

              {loading && jobs.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center p-8 bg-white rounded-lg shadow-sm">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading jobs...</p>
                </motion.div>
              ) : jobs.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center p-8 bg-white rounded-lg shadow-sm">
                  <motion.div
                    animate={pulseAnimation}
                    className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-teal-500"
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
                  </motion.div>
                  <p className="text-gray-500 mt-4">No jobs available at the moment.</p>
                  <p className="text-sm text-gray-400 mt-2">Check back later for new opportunities.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      variants={itemVariants}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="bg-blue-100 p-2 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-600"
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
                          </motion.div>
                        </div>
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">Company:</span> {job.company}
                        </p>
                        {job.location && (
                          <p className="text-gray-600 mb-2">
                            <span className="font-medium">Location:</span> {job.location}
                          </p>
                        )}
                        {job.salary && (
                          <p className="text-gray-600 mb-2">
                            <span className="font-medium">Salary:</span> {job.salary}
                          </p>
                        )}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-1">Required Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.required_skills?.split(",").map((skill: string, index: number) => (
                              <motion.span
                                key={index}
                                whileHover={{ y: -2 }}
                                className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
                              >
                                {skill.trim()}
                              </motion.span>
                            )) || <span className="text-gray-500">No specific skills listed</span>}
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 mb-4">
                          Posted on {new Date(job.posted_at).toLocaleDateString()}
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedJob(job)}
                            className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                          >
                            <span>View Details</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.button>

                          {hasAppliedForJob(job.id) ? (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm flex items-center space-x-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Applied</span>
                            </span>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleApplyForJob(job.id)}
                              className="px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded hover:from-teal-600 hover:to-blue-600 transition text-sm shadow-sm"
                            >
                              Apply Now
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "matchingJobs" && (
            <motion.div
              key="matchingJobs"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Jobs Matching Your Skills</h2>
                <div className="text-sm text-gray-500">{filteredJobs.length} matching jobs found</div>
              </motion.div>

              {!resume ? (
                <motion.div
                  variants={itemVariants}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6 shadow-sm"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Resume Required</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>Please create your resume with skills to see matching job opportunities.</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setActiveTab("resume")}
                          className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Go to Resume
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : loading && filteredJobs.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center p-8 bg-white rounded-lg shadow-sm">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Finding matching jobs...</p>
                </motion.div>
              ) : filteredJobs.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center p-8 bg-white rounded-lg shadow-sm">
                  <motion.div
                    animate={pulseAnimation}
                    className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-teal-500"
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
                  </motion.div>
                  <p className="text-gray-500 mt-4">No matching jobs found based on your skills.</p>
                  <p className="mt-2 text-gray-600">Try updating your skills or check all available jobs.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => {
                    const matchPercentage = calculateMatchPercentage(job.required_skills)

                    return (
                      <motion.div
                        key={job.id}
                        variants={itemVariants}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 border-l-4 border-teal-500"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                            <div className="flex items-center space-x-1 bg-teal-100 px-2 py-1 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-teal-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-xs font-medium text-teal-800">{matchPercentage}% Match</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">
                            <span className="font-medium">Company:</span> {job.company}
                          </p>
                          {job.location && (
                            <p className="text-gray-600 mb-2">
                              <span className="font-medium">Location:</span> {job.location}
                            </p>
                          )}
                          {job.salary && (
                            <p className="text-gray-600 mb-2">
                              <span className="font-medium">Salary:</span> {job.salary}
                            </p>
                          )}
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-800 mb-1">Required Skills:</h4>
                            <div className="flex flex-wrap gap-2">
                              {job.required_skills?.split(",").map((skill: string, index: number) => {
                                const isMatch = resume.skills.toLowerCase().includes(skill.trim().toLowerCase())
                                return (
                                  <motion.span
                                    key={index}
                                    whileHover={{ y: -2 }}
                                    className={`${isMatch ? "bg-teal-100 text-teal-800" : "bg-gray-100 text-gray-800"} px-2 py-1 text-xs rounded-full flex items-center space-x-1`}
                                  >
                                    {isMatch && (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    )}
                                    <span>{skill.trim()}</span>
                                  </motion.span>
                                )
                              }) || <span className="text-gray-500">No specific skills listed</span>}
                            </div>
                          </div>

                          <div className="text-sm text-gray-500 mb-4">
                            Posted on {new Date(job.posted_at).toLocaleDateString()}
                          </div>

                          <div className="mt-4 flex justify-between items-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedJob(job)}
                              className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                            >
                              <span>View Details</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>

                            {hasAppliedForJob(job.id) ? (
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm flex items-center space-x-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>Applied</span>
                              </span>
                            ) : (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleApplyForJob(job.id)}
                                className="px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded hover:from-teal-600 hover:to-blue-600 transition text-sm shadow-sm"
                              >
                                Apply Now
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "applications" && (
            <motion.div
              key="applications"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">My Applications</h2>
                <div className="text-sm text-gray-500">{applications.length} applications submitted</div>
              </motion.div>

              {loading && applications.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center p-8 bg-white rounded-lg shadow-sm">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading your applications...</p>
                </motion.div>
              ) : applications.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center p-8 bg-white rounded-lg shadow-sm">
                  <motion.div
                    animate={pulseAnimation}
                    className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-teal-500"
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
                  </motion.div>
                  <p className="text-gray-500 mt-4">You haven't applied to any jobs yet.</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveTab("allJobs")}
                    className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Browse Available Jobs
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
                      <div className="col-span-5">Job</div>
                      <div className="col-span-3">Applied On</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {applications.map((app) => (
                      <motion.li
                        key={app.id}
                        variants={slideIn}
                        whileHover={{ backgroundColor: "rgba(237, 242, 247, 0.5)" }}
                        className="p-4 transition-colors duration-200"
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-5">
                            <h3 className="font-semibold text-gray-900">{app.title}</h3>
                            <p className="text-sm text-gray-600">{app.company}</p>
                          </div>
                          <div className="col-span-3">
                            <p className="text-sm text-gray-500">{new Date(app.applied_at).toLocaleDateString()}</p>
                          </div>
                          <div className="col-span-2">
                            <motion.div
                              whileHover={{ y: -2 }}
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                              {app.status === "pending" && (
                                <svg className="mr-1.5 h-2 w-2 text-yellow-400" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                              )}
                              {app.status === "interviewing" && (
                                <svg className="mr-1.5 h-2 w-2 text-blue-400" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                              )}
                              {app.status === "accepted" && (
                                <svg className="mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                              )}
                              {app.status === "rejected" && (
                                <svg className="mr-1.5 h-2 w-2 text-red-400" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                              )}
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </motion.div>
                          </div>
                          <div className="col-span-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                const job = jobs.find((j) => j.id === app.job_id)
                                if (job) setSelectedJob(job)
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              View Job
                            </motion.button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "templates" && (
            <motion.div
              key="templates"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Resume Templates</h2>
                <div className="text-sm text-gray-500">Quick-start with professional templates</div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Template Information</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Choose from one of our professionally designed resume templates to get started quickly.</p>
                      <p className="mt-1">You can download templates in PDF format for printing or JSON format for easy editing and importing.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Template 1 - Professional */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 border border-gray-200"
                >
                  <div className="relative h-64 bg-gray-100">
                    <div className="absolute inset-0 p-4 flex flex-col">
                      <div className="bg-teal-600 h-6 w-full mb-4"></div>
                      <div className="flex h-32">
                        <div className="w-1/3 bg-teal-100 h-full"></div>
                        <div className="w-2/3 p-2">
                          <div className="h-4 bg-gray-300 w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-300 w-1/2 mb-4"></div>
                          <div className="h-2 bg-gray-200 w-full mb-1"></div>
                          <div className="h-2 bg-gray-200 w-full mb-1"></div>
                          <div className="h-2 bg-gray-200 w-3/4"></div>
                        </div>
                      </div>
                      <div className="mt-4 p-2">
                        <div className="h-3 bg-teal-600 w-1/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 w-full mb-1"></div>
                        <div className="h-2 bg-gray-200 w-full mb-1"></div>
                        <div className="h-2 bg-gray-200 w-4/5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Professional Template</h3>
                    <p className="text-sm text-gray-500 mb-4">Clean and traditional layout perfect for corporate roles</p>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-teal-100 text-teal-700 rounded text-sm flex items-center"
                        onClick={() => handlePdfDownload('professional')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        PDF
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center"
                        onClick={() => handleJsonDownload('professional')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        JSON
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Template 2 - Creative */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 border border-gray-200"
                >
                  <div className="relative h-64 bg-gray-100">
                    <div className="absolute inset-0 p-4 flex flex-col">
                      <div className="flex justify-center mb-3">
                        <div className="w-20 h-20 bg-purple-500 rounded-full"></div>
                      </div>
                      <div className="text-center mb-4">
                        <div className="h-4 bg-gray-300 w-1/2 mx-auto mb-2"></div>
                        <div className="h-3 bg-gray-300 w-1/3 mx-auto"></div>
                      </div>
                      <div className="mt-2">
                        <div className="h-3 bg-purple-500 w-1/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 w-full mb-1"></div>
                        <div className="h-2 bg-gray-200 w-full mb-1"></div>
                        <div className="h-2 bg-gray-200 w-4/5 mb-3"></div>
                        
                        <div className="h-3 bg-purple-500 w-1/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 w-full mb-1"></div>
                        <div className="h-2 bg-gray-200 w-full mb-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Creative Template</h3>
                    <p className="text-sm text-gray-500 mb-4">Modern design ideal for creative and design positions</p>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm flex items-center"
                        onClick={() => handlePdfDownload('creative')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        PDF
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center"
                        onClick={() => handleJsonDownload('creative')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        JSON
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Template 3 - Technical */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 border border-gray-200"
                >
                  <div className="relative h-64 bg-gray-100">
                    <div className="absolute inset-0 p-4 flex flex-col">
                      <div className="mb-4">
                        <div className="h-5 bg-blue-600 w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-300 w-1/2"></div>
                      </div>
                      <div className="flex h-40">
                        <div className="w-2/3 pr-2">
                          <div className="h-3 bg-blue-600 w-1/3 mb-2"></div>
                          <div className="h-2 bg-gray-200 w-full mb-1"></div>
                          <div className="h-2 bg-gray-200 w-full mb-1"></div>
                          <div className="h-2 bg-gray-200 w-4/5 mb-4"></div>
                          
                          <div className="h-3 bg-blue-600 w-1/3 mb-2"></div>
                          <div className="h-2 bg-gray-200 w-full mb-1"></div>
                          <div className="h-2 bg-gray-200 w-full mb-1"></div>
                        </div>
                        <div className="w-1/3 pl-2">
                          <div className="h-3 bg-blue-600 w-2/3 mb-2"></div>
                          <div className="bg-gray-200 rounded-full h-2 mb-2"></div>
                          <div className="bg-gray-200 rounded-full h-2 mb-2"></div>
                          <div className="bg-gray-200 rounded-full h-2 mb-2"></div>
                          <div className="bg-gray-200 rounded-full h-2 mb-2"></div>
                          <div className="bg-gray-200 rounded-full h-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Technical Template</h3>
                    <p className="text-sm text-gray-500 mb-4">Skills-focused layout for technical and IT professionals</p>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center"
                        onClick={() => handlePdfDownload('technical')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        PDF
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center"
                        onClick={() => handleJsonDownload('technical')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        JSON
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Template 4 - Executive */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 border border-gray-200"
                >
                  <div className="relative h-64 bg-gray-100">
                    <div className="absolute inset-0 p-4 flex flex-col">
                      <div className="border-b-4 border-gray-800 pb-4 mb-4">
                        <div className="h-5 bg-gray-800 w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-300 w-3/4 mb-1"></div>
                        <div className="h-3 bg-gray-300 w-2/5"></div>
                      </div>
                      <div className="mb-4">
                        <div className="h-3 bg-gray-800 w-1/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 w-full mb-1"></div>
                        <div className="h-2 bg-gray-200 w-full mb-1"></div>
                        <div className="h-2 bg-gray-200 w-4/5"></div>
                      </div>
                      <div className="mb-4">
                        <div className="h-3 bg-gray-800 w-1/4 mb-2"></div>
                        <div className="flex mb-1">
                          <div className="w-1/4 h-2 bg-gray-400"></div>
                          <div className="w-3/4 pl-2">
                            <div className="h-2 bg-gray-200 w-full"></div>
                          </div>
                        </div>
                        <div className="flex mb-1">
                          <div className="w-1/4 h-2 bg-gray-400"></div>
                          <div className="w-3/4 pl-2">
                            <div className="h-2 bg-gray-200 w-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Executive Template</h3>
                    <p className="text-sm text-gray-500 mb-4">Sophisticated design for senior leadership positions</p>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm flex items-center"
                        onClick={() => handlePdfDownload('executive')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        PDF
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center"
                        onClick={() => handleJsonDownload('executive')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        JSON
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Template 5 - Graduate */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 border border-gray-200"
                >
                  <div className="relative h-64 bg-gray-100">
                    <div className="h-24 bg-green-500 absolute top-0 left-0 right-0"></div>
                    <div className="absolute inset-0 p-4 flex flex-col">
                      <div className="mt-12 bg-white p-2 mx-2 rounded shadow-sm z-10">
                        <div className="h-4 bg-gray-300 w-1/2 mx-auto mb-1"></div>
                        <div className="h-3 bg-gray-300 w-3/4 mx-auto mb-1"></div>
                        <div className="flex justify-center mt-2 space-x-1">
                          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="h-3 bg-green-500 w-1/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 w-full mb-1"></div>
                        <div className="h-2 bg-gray-200 w-full mb-4"></div>
                        
                        <div className="h-3 bg-green-500 w-1/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 w-full mb-1"></div>
                        <div className="h-2 bg-gray-200 w-full mb-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Graduate Template</h3>
                    <p className="text-sm text-gray-500 mb-4">Education-focused design for recent graduates and students</p>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm flex items-center"
                        onClick={() => handlePdfDownload('graduate')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        PDF
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center"
                        onClick={() => handleJsonDownload('graduate')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        JSON
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Resume Creation</h3>
                <p className="text-gray-600 mb-4">
                  Want to create a custom resume using your existing profile information? You can generate a resume based on the details you've provided in your profile.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGenerateProfilePdf}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-md hover:from-teal-600 hover:to-blue-600 transition shadow-sm flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate PDF from Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleExportProfileJson}
                    className="px-4 py-2 bg-white border border-teal-500 text-teal-600 rounded-md hover:bg-teal-50 transition shadow-sm flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export Profile as JSON
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
          
        </AnimatePresence>
      </main>

      {/* Career Resources Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Career Resources</h2>
          <p className="text-lg text-gray-600">
            Explore our collection of resources to help you advance your career and land your dream job.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Resume Building</h3>
            <p className="text-gray-600 mb-4">
              Learn how to create a standout resume that highlights your skills and experience effectively.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenResourceModal("resume")}
              className="text-teal-600 hover:text-teal-800 font-medium flex items-center"
            >
              <span>Read More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
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
            <h3 className="text-xl font-bold mb-2 text-gray-900">Interview Preparation</h3>
            <p className="text-gray-600 mb-4">
              Prepare for your interviews with our comprehensive guides and practice questions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenResourceModal("interview")}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <span>Read More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Career Growth</h3>
            <p className="text-gray-600 mb-4">
              Discover strategies for advancing your career and achieving your professional goals.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenResourceModal("career")}
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
            >
              <span>Read More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Job Market Trends Section */}
      <section className="py-16 bg-gradient-to-br from-teal-900 to-blue-900 text-white relative z-10 overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Job Market Trends</h2>
            <p className="text-lg text-blue-100">
              Stay informed about the latest trends and insights in the job market to make better career decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-teal-500/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-teal-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Remote Work</h3>
              <p className="text-blue-100 mb-4">
                Remote work opportunities have increased by 140% since 2020, with more companies embracing flexible work
                arrangements.
              </p>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "65%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-teal-400 to-blue-400"
                />
              </div>
              <div className="mt-2 text-sm text-blue-200">65% of companies offer remote options</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Tech Skills</h3>
              <p className="text-blue-100 mb-4">
                Demand for AI, machine learning, and data science skills continues to grow across all industries.
              </p>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "78%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                />
              </div>
              <div className="mt-2 text-sm text-blue-200">78% increase in tech job postings</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Salary Transparency</h3>
              <p className="text-blue-100 mb-4">
                More companies are including salary information in job postings, leading to better candidate engagement.
              </p>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "42%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                />
              </div>
              <div className="mt-2 text-sm text-blue-200">42% of job listings include salary info</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Skill-Based Hiring</h3>
              <p className="text-blue-100 mb-4">
                Companies are shifting focus from degrees to skills and competencies when evaluating candidates.
              </p>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "55%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-400 to-teal-400"
                />
              </div>
              <div className="mt-2 text-sm text-blue-200">55% prioritize skills over degrees</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-800 text-white py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
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
              </motion.div>
              <div>
                <h3 className="font-bold text-lg">JobConnect</h3>
                <p className="text-xs text-gray-400">Find your dream job today</p>
              </div>
            </div>

            <div className="flex space-x-4 mb-4 md:mb-0">
              <motion.a whileHover={{ y: -3 }} href="/sign-in-sign-up" className="text-gray-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </motion.a>
              <motion.a whileHover={{ y: -3 }} href="/sign-in-sign-up" className="text-gray-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
              <motion.a whileHover={{ y: -3 }} href="#" className="text-gray-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.72.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                </svg>
              </motion.a>
            </div>

            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} JobConnect. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-500 transition-all"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedJob.company}</p>
                    {selectedJob.location && <p className="text-sm text-gray-500">{selectedJob.location}</p>}
                  </div>
                </div>

                {selectedJob.salary && (
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Salary</p>
                      <p className="text-sm text-gray-500">{selectedJob.salary}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-600"
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
                  <div>
                    <p className="font-medium text-gray-900">Posted</p>
                    <p className="text-sm text-gray-500">{new Date(selectedJob.posted_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Job Description</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">{selectedJob.description}</p>
                </div>
              </div>

              {selectedJob.required_skills && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.required_skills.split(",").map((skill: string, index: number) => {
                      const isMatch = resume?.skills?.toLowerCase().includes(skill.trim().toLowerCase())
                      return (
                        <motion.span
                          key={index}
                          whileHover={{ y: -2 }}
                          className={`${isMatch ? "bg-teal-100 text-teal-800" : "bg-blue-100 text-blue-800"} px-3 py-1 rounded-full text-sm flex items-center space-x-1`}
                        >
                          {isMatch && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                          <span>{skill.trim()}</span>
                        </motion.span>
                      )
                    })}
                  </div>
                </div>
              )}

              {resume && selectedJob.required_skills && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Skills Match</h3>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Match Percentage</span>
                      <span className="font-medium text-blue-700">
                        {calculateMatchPercentage(selectedJob.required_skills)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateMatchPercentage(selectedJob.required_skills)}%` }}
                        className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {calculateMatchPercentage(selectedJob.required_skills) > 70
                      ? "You're a great match for this position!"
                      : calculateMatchPercentage(selectedJob.required_skills) > 40
                        ? "You match some of the required skills for this position."
                        : "You might need to develop more skills for this position."}
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                {hasAppliedForJob(selectedJob.id) ? (
                  <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>You have already applied</span>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleApplyForJob(selectedJob.id)
                      setSelectedJob(null)
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded hover:from-teal-600 hover:to-blue-600 transition shadow-sm flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
                    <span>Apply Now</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resource Content Modal */}
      <AnimatePresence>
        {openResourceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {resourceContent[openResourceModal].title}
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-blue-500 mt-2"></div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpenResourceModal(null)}
                  className="text-gray-400 hover:text-gray-500 transition-all"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <div className="space-y-6 mb-8">
                {resourceContent[openResourceModal].content.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.subtitle}</h3>
                    <p className="text-gray-700">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Helpful Resources</h3>
                <ul className="space-y-2">
                  {resourceContent[openResourceModal].resources.map((resource, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <a href={resource.link} className="font-medium">{resource.name}</a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpenResourceModal(null)}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded hover:from-teal-600 hover:to-blue-600 transition shadow-sm"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
