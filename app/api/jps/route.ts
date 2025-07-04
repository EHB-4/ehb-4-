// Roman Urdu: JPS Main API Route
// Jobs, candidates, aur placements ke liye CRUD operations

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Roman Urdu: Data validation schemas
const JobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
  salary: z.number().min(0, 'Salary must be positive'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is needed'),
  status: z.enum(['active', 'inactive', 'filled']).default('active')
});

const CandidateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  sqlLevel: z.number().min(0).max(4, 'SQL Level must be between 0-4'),
  experience: z.number().min(0, 'Experience must be positive'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  status: z.enum(['active', 'inactive', 'placed']).default('active')
});

const PlacementSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  candidateId: z.string().min(1, 'Candidate ID is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  candidateName: z.string().min(1, 'Candidate name is required'),
  company: z.string().min(1, 'Company name is required'),
  salary: z.number().min(0, 'Salary must be positive'),
  status: z.enum(['pending', 'completed', 'cancelled']).default('pending')
});

// Roman Urdu: Mock database (replace with real database)
const jobs: any[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp Solutions',
    location: 'Karachi, Pakistan',
    salary: 150000,
    description: 'We are seeking a talented Senior React Developer to join our dynamic team.',
    requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Digital Solutions',
    location: 'Lahore, Pakistan',
    salary: 120000,
    description: 'Join our innovative team as a Full Stack Developer.',
    requirements: ['JavaScript', 'Python', 'Django', '3+ years experience'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const candidates: any[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+92-300-1234567',
    sqlLevel: 3,
    experience: 5,
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    email: 'sarah.ahmed@email.com',
    phone: '+92-301-2345678',
    sqlLevel: 2,
    experience: 3,
    skills: ['JavaScript', 'Python', 'Django', 'PostgreSQL'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const placements: any[] = [
  {
    id: '1',
    jobId: '1',
    candidateId: '1',
    jobTitle: 'Senior React Developer',
    candidateName: 'Ahmed Khan',
    company: 'TechCorp Solutions',
    salary: 150000,
    status: 'completed',
    placementDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Roman Urdu: Utility functions
const generateId = () => Math.random().toString(36).substr(2, 9);
const findJob = (id: string) => jobs.find(job => job.id === id);
const findCandidate = (id: string) => candidates.find(candidate => candidate.id === id);
const findPlacement = (id: string) => placements.find(placement => placement.id === id);

// Roman Urdu: GET - Fetch all data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    // Roman Urdu: Return specific item by ID
    if (id) {
      switch (type) {
        case 'job':
          const job = findJob(id);
          if (!job) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
          }
          return NextResponse.json(job);

        case 'candidate':
          const candidate = findCandidate(id);
          if (!candidate) {
            return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
          }
          return NextResponse.json(candidate);

        case 'placement':
          const placement = findPlacement(id);
          if (!placement) {
            return NextResponse.json({ error: 'Placement not found' }, { status: 404 });
          }
          return NextResponse.json(placement);

        default:
          return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
      }
    }

    // Roman Urdu: Return all data by type
    switch (type) {
      case 'jobs':
        return NextResponse.json(jobs);

      case 'candidates':
        return NextResponse.json(candidates);

      case 'placements':
        return NextResponse.json(placements);

      case 'all':
        return NextResponse.json({
          jobs,
          candidates,
          placements,
          stats: {
            totalJobs: jobs.length,
            totalCandidates: candidates.length,
            totalPlacements: placements.length,
            activeJobs: jobs.filter(job => job.status === 'active').length,
            activeCandidates: candidates.filter(candidate => candidate.status === 'active').length,
            completedPlacements: placements.filter(placement => placement.status === 'completed').length
          }
        });

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Roman Urdu: POST - Create new data
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const body = await request.json();

    switch (type) {
      case 'job':
        const jobData = JobSchema.parse(body);
        const newJob = {
          id: generateId(),
          ...jobData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        jobs.push(newJob);
        return NextResponse.json(newJob, { status: 201 });

      case 'candidate':
        const candidateData = CandidateSchema.parse(body);
        const newCandidate = {
          id: generateId(),
          ...candidateData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        candidates.push(newCandidate);
        return NextResponse.json(newCandidate, { status: 201 });

      case 'placement':
        const placementData = PlacementSchema.parse(body);
        
        // Roman Urdu: Validate job and candidate exist
        const job = findJob(placementData.jobId);
        const candidate = findCandidate(placementData.candidateId);
        
        if (!job) {
          return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }
        if (!candidate) {
          return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
        }

        const newPlacement = {
          id: generateId(),
          ...placementData,
          placementDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        placements.push(newPlacement);
        return NextResponse.json(newPlacement, { status: 201 });

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Roman Urdu: PUT - Update existing data
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    switch (type) {
      case 'job':
        const jobData = JobSchema.partial().parse(body);
        const jobIndex = jobs.findIndex(job => job.id === id);
        if (jobIndex === -1) {
          return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }
        jobs[jobIndex] = {
          ...jobs[jobIndex],
          ...jobData,
          updatedAt: new Date().toISOString()
        };
        return NextResponse.json(jobs[jobIndex]);

      case 'candidate':
        const candidateData = CandidateSchema.partial().parse(body);
        const candidateIndex = candidates.findIndex(candidate => candidate.id === id);
        if (candidateIndex === -1) {
          return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
        }
        candidates[candidateIndex] = {
          ...candidates[candidateIndex],
          ...candidateData,
          updatedAt: new Date().toISOString()
        };
        return NextResponse.json(candidates[candidateIndex]);

      case 'placement':
        const placementData = PlacementSchema.partial().parse(body);
        const placementIndex = placements.findIndex(placement => placement.id === id);
        if (placementIndex === -1) {
          return NextResponse.json({ error: 'Placement not found' }, { status: 404 });
        }
        placements[placementIndex] = {
          ...placements[placementIndex],
          ...placementData,
          updatedAt: new Date().toISOString()
        };
        return NextResponse.json(placements[placementIndex]);

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Roman Urdu: DELETE - Remove data
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    switch (type) {
      case 'job':
        const jobIndex = jobs.findIndex(job => job.id === id);
        if (jobIndex === -1) {
          return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }
        jobs.splice(jobIndex, 1);
        return NextResponse.json({ message: 'Job deleted successfully' });

      case 'candidate':
        const candidateIndex = candidates.findIndex(candidate => candidate.id === id);
        if (candidateIndex === -1) {
          return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
        }
        candidates.splice(candidateIndex, 1);
        return NextResponse.json({ message: 'Candidate deleted successfully' });

      case 'placement':
        const placementIndex = placements.findIndex(placement => placement.id === id);
        if (placementIndex === -1) {
          return NextResponse.json({ error: 'Placement not found' }, { status: 404 });
        }
        placements.splice(placementIndex, 1);
        return NextResponse.json({ message: 'Placement deleted successfully' });

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 