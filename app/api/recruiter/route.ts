import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://job-application_owner:npg_9BjEXIPZcN3O@ep-jolly-leaf-a4qs5f3h-pooler.us-east-1.aws.neon.tech/job-application?sslmode=require";
const sql = neon(DATABASE_URL);

// Ensure necessary tables exist
async function ensureTablesExist() {
  try {
    // Check if recruiter_jobs table exists
    const jobsExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'recruiter_jobs'
      );
    `;
    
    if (!jobsExists[0].exists) {
      // Create recruiter_jobs table
      await sql`
        CREATE TABLE recruiter_jobs (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          company VARCHAR(255) NOT NULL,
          location VARCHAR(255),
          salary VARCHAR(100),
          required_skills TEXT,
          recruiter_email VARCHAR(255) NOT NULL,
          posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (recruiter_email) REFERENCES recruiters(email)
        )
      `;
      console.log('Recruiter jobs table created');
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
  const jobId = searchParams.get('jobId');

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    await ensureTablesExist();

    if (action === 'getJobs') {
      // Get all jobs posted by the recruiter
      const jobs = await sql`SELECT * FROM recruiter_jobs WHERE recruiter_email = ${email} ORDER BY posted_at DESC`;
      
      return NextResponse.json({ jobs });
    } else if (action === 'getJobApplications' && jobId) {
      // Get all applications for a specific job
      const applications = await sql`
        SELECT a.*, c.name, c.email, c.skills AS candidate_skills
        FROM applications a
        JOIN candidates c ON a.candidate_email = c.email
        WHERE a.job_id = ${jobId}
      `;
      
      return NextResponse.json({ applications });
    } else if (action === 'getJobDetails' && jobId) {
      // Get details of a specific job
      const job = await sql`SELECT * FROM recruiter_jobs WHERE id = ${jobId}`;
      
      if (job.length === 0) {
        return NextResponse.json({ message: 'Job not found' }, { status: 404 });
      }
      
      return NextResponse.json({ job: job[0] });
    }
    
    return NextResponse.json({ message: 'Invalid action or missing parameters' }, { status: 400 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureTablesExist();
    
    const { action, recruiterEmail, ...data } = await request.json();
    
    if (!recruiterEmail) {
      return NextResponse.json({ message: 'Recruiter email is required' }, { status: 400 });
    }
    
    if (action === 'createJob') {
      const { title, description, company, location, salary, requiredSkills } = data;
      
      if (!title || !description || !company) {
        return NextResponse.json({ 
          message: 'Title, description, and company are required' 
        }, { status: 400 });
      }
      
      // Create new job posting
      const newJob = await sql`
        INSERT INTO recruiter_jobs (
          title, description, company, location, salary, required_skills, recruiter_email
        )
        VALUES (
          ${title}, ${description}, ${company}, ${location}, ${salary}, ${requiredSkills}, ${recruiterEmail}
        )
        RETURNING *
      `;
      
      return NextResponse.json({ 
        message: 'Job posted successfully', 
        job: newJob[0] 
      }, { status: 201 });
    } else if (action === 'updateJob') {
      const { jobId, title, description, company, location, salary, requiredSkills } = data;
      
      if (!jobId) {
        return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });
      }
      
      // Check if job exists and belongs to the recruiter
      const existingJob = await sql`
        SELECT * FROM recruiter_jobs 
        WHERE id = ${jobId} AND recruiter_email = ${recruiterEmail}
      `;
      
      if (existingJob.length === 0) {
        return NextResponse.json({ 
          message: 'Job not found or you do not have permission to update it' 
        }, { status: 404 });
      }
      
      // Update job
      const updatedJob = await sql`
        UPDATE recruiter_jobs
        SET 
          title = ${title || existingJob[0].title},
          description = ${description || existingJob[0].description},
          company = ${company || existingJob[0].company},
          location = ${location || existingJob[0].location},
          salary = ${salary || existingJob[0].salary},
          required_skills = ${requiredSkills || existingJob[0].required_skills}
        WHERE id = ${jobId}
        RETURNING *
      `;
      
      return NextResponse.json({ 
        message: 'Job updated successfully', 
        job: updatedJob[0] 
      });
    } else if (action === 'deleteJob') {
      const { jobId } = data;
      
      if (!jobId) {
        return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });
      }
      
      // Check if job exists and belongs to the recruiter
      const existingJob = await sql`
        SELECT * FROM recruiter_jobs 
        WHERE id = ${jobId} AND recruiter_email = ${recruiterEmail}
      `;
      
      if (existingJob.length === 0) {
        return NextResponse.json({ 
          message: 'Job not found or you do not have permission to delete it' 
        }, { status: 404 });
      }
      
      // Delete associated applications first
      await sql`DELETE FROM applications WHERE job_id = ${jobId}`;
      
      // Delete job
      await sql`DELETE FROM recruiter_jobs WHERE id = ${jobId}`;
      
      return NextResponse.json({ message: 'Job deleted successfully' });
    } else if (action === 'updateApplicationStatus') {
      const { applicationId, status } = data;
      
      if (!applicationId || !status) {
        return NextResponse.json({ 
          message: 'Application ID and status are required' 
        }, { status: 400 });
      }
      
      // Check if application exists for a job owned by this recruiter
      const application = await sql`
        SELECT a.* FROM applications a
        JOIN recruiter_jobs j ON a.job_id = j.id
        WHERE a.id = ${applicationId} AND j.recruiter_email = ${recruiterEmail}
      `;
      
      if (application.length === 0) {
        return NextResponse.json({ 
          message: 'Application not found or you do not have permission to update it' 
        }, { status: 404 });
      }
      
      // Update application status
      const updatedApplication = await sql`
        UPDATE applications
        SET status = ${status}
        WHERE id = ${applicationId}
        RETURNING *
      `;
      
      return NextResponse.json({ 
        message: 'Application status updated successfully', 
        application: updatedApplication[0] 
      });
    }
    
    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
