import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://job-application_owner:npg_9BjEXIPZcN3O@ep-jolly-leaf-a4qs5f3h-pooler.us-east-1.aws.neon.tech/job-application?sslmode=require";
const sql = neon(DATABASE_URL);

// Ensure necessary tables exist
async function ensureTablesExist() {
  try {
    // Check if resumes table exists
    const resumesExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'resumes'
      );
    `;
    
    if (!resumesExists[0].exists) {
      // Create resumes table
      await sql`
        CREATE TABLE resumes (
          id SERIAL PRIMARY KEY,
          candidate_email VARCHAR(255) NOT NULL,
          education TEXT,
          experience TEXT,
          skills TEXT,
          summary TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (candidate_email) REFERENCES candidates(email)
        )
      `;
      console.log('Resumes table created');
    }

    // Check if applications table exists
    const applicationsExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'applications'
      );
    `;
    
    if (!applicationsExists[0].exists) {
      // Create applications table
      await sql`
        CREATE TABLE applications (
          id SERIAL PRIMARY KEY,
          job_id INTEGER NOT NULL,
          candidate_email VARCHAR(255) NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (candidate_email) REFERENCES candidates(email),
          FOREIGN KEY (job_id) REFERENCES recruiter_jobs(id)
        )
      `;
      console.log('Applications table created');
    }
    
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    await ensureTablesExist();

    if (action === 'getResume') {
      // Get candidate's resume
      const resume = await sql`SELECT * FROM resumes WHERE candidate_email = ${email}`;
      
      if (resume.length === 0) {
        return NextResponse.json({ message: 'Resume not found' }, { status: 404 });
      }
      
      return NextResponse.json({ resume: resume[0] });
    } else if (action === 'getApplications') {
      // Get candidate's job applications
      const applications = await sql`
        SELECT a.*, j.title, j.company, j.recruiter_email
        FROM applications a
        JOIN recruiter_jobs j ON a.job_id = j.id
        WHERE a.candidate_email = ${email}
      `;
      
      return NextResponse.json({ applications });
    } else if (action === 'getAllJobs') {
      // Get all available jobs
      const jobs = await sql`SELECT * FROM recruiter_jobs`;
      
      return NextResponse.json({ jobs });
    } else if (action === 'getFilteredJobs') {
      // Get candidate's skills
      const candidate = await sql`SELECT skills FROM candidates WHERE email = ${email}`;
      
      if (candidate.length === 0) {
        return NextResponse.json({ message: 'Candidate not found' }, { status: 404 });
      }
      
      const candidateSkills = candidate[0].skills?.split(',').map((s: string) => s.trim().toLowerCase()) || [];
      
      if (candidateSkills.length === 0) {
        return NextResponse.json({ jobs: [] });
      }
      
      // Get all jobs
      const allJobs = await sql`SELECT * FROM recruiter_jobs`;
      
      // Filter jobs based on matching skills
      const filteredJobs = allJobs.filter((job: any) => {
        const jobSkills = job.required_skills?.split(',').map((s: string) => s.trim().toLowerCase()) || [];
        return jobSkills.some((skill: string) => candidateSkills.includes(skill));
      });
      
      return NextResponse.json({ jobs: filteredJobs });
    }
    
    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureTablesExist();
    
    const { action, candidateEmail, ...data } = await request.json();
    
    if (!candidateEmail) {
      return NextResponse.json({ message: 'Candidate email is required' }, { status: 400 });
    }
    
    if (action === 'createResume') {
      const { education, experience, skills, summary } = data;
      
      // Check if resume already exists
      const existingResume = await sql`SELECT * FROM resumes WHERE candidate_email = ${candidateEmail}`;
      
      if (existingResume.length > 0) {
        // Update existing resume
        const updatedResume = await sql`
          UPDATE resumes
          SET education = ${education}, experience = ${experience}, skills = ${skills}, summary = ${summary}
          WHERE candidate_email = ${candidateEmail}
          RETURNING *
        `;
        
        return NextResponse.json({ 
          message: 'Resume updated successfully', 
          resume: updatedResume[0] 
        });
      } else {
        // Create new resume
        const newResume = await sql`
          INSERT INTO resumes (candidate_email, education, experience, skills, summary)
          VALUES (${candidateEmail}, ${education}, ${experience}, ${skills}, ${summary})
          RETURNING *
        `;
        
        return NextResponse.json({ 
          message: 'Resume created successfully', 
          resume: newResume[0] 
        }, { status: 201 });
      }
    } else if (action === 'applyForJob') {
      const { jobId } = data;
      
      if (!jobId) {
        return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });
      }
      
      // Check if job exists
      const job = await sql`SELECT * FROM recruiter_jobs WHERE id = ${jobId}`;
      
      if (job.length === 0) {
        return NextResponse.json({ message: 'Job not found' }, { status: 404 });
      }
      
      // Check if already applied
      const existingApplication = await sql`
        SELECT * FROM applications 
        WHERE job_id = ${jobId} AND candidate_email = ${candidateEmail}
      `;
      
      if (existingApplication.length > 0) {
        return NextResponse.json({ message: 'Already applied for this job' }, { status: 409 });
      }
      
      // Create application
      const application = await sql`
        INSERT INTO applications (job_id, candidate_email)
        VALUES (${jobId}, ${candidateEmail})
        RETURNING *
      `;
      
      return NextResponse.json({ 
        message: 'Applied for job successfully', 
        application: application[0] 
      }, { status: 201 });
    }
    
    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
