import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const DATABASE_URL = "postgresql://job-application_owner:npg_9BjEXIPZcN3O@ep-jolly-leaf-a4qs5f3h-pooler.us-east-1.aws.neon.tech/job-application?sslmode=require";
const sql = neon(DATABASE_URL, { 
  fetchOptions: {
    // Increase timeout to 30 seconds
    timeout: 30000,
    // Add retry logic
    retryDelay: 1000,
    retryCount: 3
  }
});

// Check if tables exist first, create them if they don't
async function ensureTablesExist() {
  try {
    // Check if recruiters table exists
    const recruitersExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'recruiters'
      );
    `;
    
    if (!recruitersExists[0].exists) {
      // Create recruiters table if it doesn't exist
      await sql`
        CREATE TABLE recruiters (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          company VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log('Recruiters table created');
    }

    // Check if candidates table exists
    const candidatesExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'candidates'
      );
    `;
    
    if (!candidatesExists[0].exists) {
      // Create candidates table if it doesn't exist
      await sql`
        CREATE TABLE candidates (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          skills TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log('Candidates table created');
    }
    
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure tables exist before processing any request
    const tablesInitialized = await ensureTablesExist();
    if (!tablesInitialized) {
      return NextResponse.json(
        { message: 'Database initialization failed' },
        { status: 500 }
      );
    }

    const { userType, action, email, password, name, company, skills } = await request.json();

    // Validate required fields
    if (!userType || !action || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (userType !== 'recruiter' && userType !== 'candidate') {
      return NextResponse.json(
        { message: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Handle sign-in
    if (action === 'signin') {
      let user;
      
      try {
        if (userType === 'recruiter') {
          const recruiters = await sql`SELECT * FROM recruiters WHERE email = ${email}`;
          user = recruiters[0];
        } else {
          const candidates = await sql`SELECT * FROM candidates WHERE email = ${email}`;
          user = candidates[0];
        }
      } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json(
          { message: 'Database error during sign in' },
          { status: 500 }
        );
      }

      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Create a safe user object without password
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        ...(userType === 'recruiter' ? { company: user.company } : { skills: user.skills }),
      };

      return NextResponse.json({ 
        message: 'Sign in successful',
        user: safeUser,
        userType
      });
    }

    // Handle sign-up
    if (action === 'signup') {
      if (!name) {
        return NextResponse.json(
          { message: 'Name is required for sign up' },
          { status: 400 }
        );
      }

      if (userType === 'recruiter' && !company) {
        return NextResponse.json(
          { message: 'Company name is required for recruiter sign up' },
          { status: 400 }
        );
      }

      // Check if user already exists
      let existingUser;
      
      try {
        if (userType === 'recruiter') {
          const recruiters = await sql`SELECT * FROM recruiters WHERE email = ${email}`;
          existingUser = recruiters[0];
        } else {
          const candidates = await sql`SELECT * FROM candidates WHERE email = ${email}`;
          existingUser = candidates[0];
        }
      } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json(
          { message: 'Database error checking existing user' },
          { status: 500 }
        );
      }

      if (existingUser) {
        return NextResponse.json(
          { message: 'User already exists with this email' },
          { status: 409 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      let newUser;
      try {
        if (userType === 'recruiter') {
          const result = await sql`
            INSERT INTO recruiters (name, email, password, company)
            VALUES (${name}, ${email}, ${hashedPassword}, ${company})
            RETURNING id, name, email, company
          `;
          newUser = result[0];
        } else {
          const result = await sql`
            INSERT INTO candidates (name, email, password, skills)
            VALUES (${name}, ${email}, ${hashedPassword}, ${skills || ''})
            RETURNING id, name, email, skills
          `;
          newUser = result[0];
        }
      } catch (error) {
        console.error('Database insert error:', error);
        return NextResponse.json(
          { message: 'Error creating user' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: 'User created successfully',
        user: newUser,
        userType
      }, { status: 201 });
    }

    return NextResponse.json(
      { message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
