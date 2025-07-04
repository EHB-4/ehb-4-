# JPS Backend API Documentation

## Roman Urdu: Overview
JPS (Job Placement System) backend API documentation jo tamam endpoints, data structures, aur usage examples provide karta hai.

## Roman Urdu: Base URL
```
http://localhost:3000/api/jps
```

## Roman Urdu: Authentication
Currently, API authentication is not implemented. Future versions mein JWT tokens ya API keys add kiye jayenge.

## Roman Urdu: Main API Endpoints

### 1. Jobs Management

#### Roman Urdu: Get All Jobs
```http
GET /api/jps?type=jobs
```

**Response:**
```json
[
  {
    "id": "1",
    "title": "Senior React Developer",
    "company": "TechCorp Solutions",
    "location": "Karachi, Pakistan",
    "salary": 150000,
    "description": "We are seeking a talented Senior React Developer...",
    "requirements": ["React", "TypeScript", "Node.js", "5+ years experience"],
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Roman Urdu: Create New Job
```http
POST /api/jps?type=jobs
Content-Type: application/json

{
  "title": "Full Stack Developer",
  "company": "Digital Solutions",
  "location": "Lahore, Pakistan",
  "salary": 120000,
  "description": "Join our innovative team as a Full Stack Developer.",
  "requirements": ["JavaScript", "Python", "Django", "3+ years experience"],
  "status": "active"
}
```

#### Roman Urdu: Update Job
```http
PUT /api/jps?type=jobs&id=1
Content-Type: application/json

{
  "salary": 160000,
  "status": "filled"
}
```

#### Roman Urdu: Delete Job
```http
DELETE /api/jps?type=jobs&id=1
```

### 2. Candidates Management

#### Roman Urdu: Get All Candidates
```http
GET /api/jps?type=candidates
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "Ahmed Khan",
    "email": "ahmed.khan@email.com",
    "phone": "+92-300-1234567",
    "sqlLevel": 3,
    "experience": 5,
    "skills": ["React", "TypeScript", "Node.js", "MongoDB"],
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Roman Urdu: Create New Candidate
```http
POST /api/jps?type=candidates
Content-Type: application/json

{
  "name": "Sarah Ahmed",
  "email": "sarah.ahmed@email.com",
  "phone": "+92-301-2345678",
  "sqlLevel": 2,
  "experience": 3,
  "skills": ["JavaScript", "Python", "Django", "PostgreSQL"],
  "status": "active"
}
```

### 3. Placements Management

#### Roman Urdu: Get All Placements
```http
GET /api/jps?type=placements
```

**Response:**
```json
[
  {
    "id": "1",
    "jobId": "1",
    "candidateId": "1",
    "jobTitle": "Senior React Developer",
    "candidateName": "Ahmed Khan",
    "company": "TechCorp Solutions",
    "salary": 150000,
    "status": "completed",
    "placementDate": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Roman Urdu: Create New Placement
```http
POST /api/jps?type=placements
Content-Type: application/json

{
  "jobId": "1",
  "candidateId": "1",
  "jobTitle": "Senior React Developer",
  "candidateName": "Ahmed Khan",
  "company": "TechCorp Solutions",
  "salary": 150000,
  "status": "pending"
}
```

### 4. System Statistics

#### Roman Urdu: Get All Data with Statistics
```http
GET /api/jps?type=all
```

**Response:**
```json
{
  "jobs": [...],
  "candidates": [...],
  "placements": [...],
  "stats": {
    "totalJobs": 5,
    "totalCandidates": 10,
    "totalPlacements": 3,
    "activeJobs": 4,
    "activeCandidates": 8,
    "completedPlacements": 2
  }
}
```

## Roman Urdu: AI Matching API

### Roman Urdu: Get Compatibility Score
```http
GET /api/jps/ai-matching?jobId=1&candidateId=1
```

**Response:**
```json
{
  "jobId": "1",
  "candidateId": "1",
  "overallScore": 85,
  "breakdown": {
    "skills": 90,
    "experience": 100,
    "location": 100,
    "salary": 80,
    "sqlLevel": 95
  },
  "details": {
    "matchingSkills": ["React", "TypeScript", "Node.js"],
    "missingSkills": ["MongoDB"],
    "recommendations": [
      "Excellent match! Strongly recommend for immediate interview.",
      "Consider additional training in required skills."
    ]
  }
}
```

### Roman Urdu: Get Top Matches for Job
```http
POST /api/jps/ai-matching
Content-Type: application/json

{
  "jobId": "1",
  "limit": 5
}
```

**Response:**
```json
{
  "jobId": "1",
  "totalCandidates": 10,
  "matches": [
    {
      "candidate": {...},
      "overallScore": 85,
      "breakdown": {...},
      "details": {...}
    }
  ]
}
```

## Roman Urdu: Notifications API

### Roman Urdu: Send Email Notification
```http
POST /api/jps/notifications
Content-Type: application/json

{
  "type": "email",
  "to": "ahmed.khan@email.com",
  "subject": "Interview Invitation",
  "message": "You have been selected for an interview...",
  "template": "interview-invitation"
}
```

### Roman Urdu: Send SMS Notification
```http
POST /api/jps/notifications
Content-Type: application/json

{
  "type": "sms",
  "to": "+92-300-1234567",
  "message": "Interview reminder for tomorrow",
  "template": "interview-reminder"
}
```

### Roman Urdu: Send Interview Notification
```http
POST /api/jps/notifications
Content-Type: application/json

{
  "type": "interview",
  "candidateId": "1",
  "jobId": "1",
  "interviewDate": "2024-01-20",
  "interviewTime": "10:00 AM",
  "location": "Office",
  "type": "in-person"
}
```

### Roman Urdu: Get Notification History
```http
GET /api/jps/notifications?type=email&limit=10
```

## Roman Urdu: Payments API

### Roman Urdu: Get Payment Report
```http
GET /api/jps/payments?type=payments&status=completed&startDate=2024-01-01&endDate=2024-01-31
```

**Response:**
```json
{
  "payments": [
    {
      "id": "1",
      "placementId": "1",
      "candidateId": "1",
      "jobId": "1",
      "candidateName": "Ahmed Khan",
      "jobTitle": "Senior React Developer",
      "company": "TechCorp Solutions",
      "amount": 12000,
      "commissionRate": 0.08,
      "paymentMethod": "bank_transfer",
      "status": "completed",
      "paymentDate": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "summary": {
    "totalPayments": 5,
    "totalAmount": 60000,
    "completedAmount": 48000,
    "pendingAmount": 12000,
    "averageCommission": 12000
  }
}
```

### Roman Urdu: Calculate Commission
```http
POST /api/jps/payments
Content-Type: application/json

{
  "action": "calculate-commission",
  "placementId": "1",
  "candidateSQLLevel": 3,
  "jobSalary": 150000,
  "placementDate": "2024-01-15T10:30:00.000Z"
}
```

**Response:**
```json
{
  "placementId": "1",
  "jobSalary": 150000,
  "candidateSQLLevel": 3,
  "commissionRate": 0.08,
  "commissionAmount": 12000,
  "placementDate": "2024-01-15T10:30:00.000Z",
  "calculatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Roman Urdu: Process Payment
```http
POST /api/jps/payments
Content-Type: application/json

{
  "action": "process-payment",
  "placementId": "1",
  "candidateId": "1",
  "jobId": "1",
  "amount": 12000,
  "commissionRate": 0.08,
  "paymentMethod": "bank_transfer",
  "description": "Commission payment for successful placement"
}
```

## Roman Urdu: Data Models

### Roman Urdu: Job Model
```typescript
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
  requirements: string[];
  status: 'active' | 'inactive' | 'filled';
  createdAt: string;
  updatedAt: string;
}
```

### Roman Urdu: Candidate Model
```typescript
interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  sqlLevel: number; // 0-4
  experience: number;
  skills: string[];
  status: 'active' | 'inactive' | 'placed';
  createdAt: string;
  updatedAt: string;
}
```

### Roman Urdu: Placement Model
```typescript
interface Placement {
  id: string;
  jobId: string;
  candidateId: string;
  jobTitle: string;
  candidateName: string;
  company: string;
  salary: number;
  status: 'pending' | 'completed' | 'cancelled';
  placementDate: string;
  createdAt: string;
  updatedAt: string;
}
```

## Roman Urdu: Error Handling

### Roman Urdu: Error Response Format
```json
{
  "error": "Error message",
  "details": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### Roman Urdu: Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Roman Urdu: Commission Rates

SQL Level ke hisab se commission rates:

| SQL Level | Commission Rate |
|-----------|----------------|
| 0         | 15%            |
| 1         | 12%            |
| 2         | 10%            |
| 3         | 8%             |
| 4         | 5%             |

## Roman Urdu: AI Matching Algorithm

### Roman Urdu: Scoring Weights
- Skills: 35%
- Experience: 25%
- Location: 15%
- Salary: 15%
- SQL Level: 10%

### Roman Urdu: Score Ranges
- 90-100%: Excellent match
- 80-89%: Good match
- 70-79%: Moderate match
- Below 70%: Poor match

## Roman Urdu: Usage Examples

### Roman Urdu: Frontend Integration Example
```typescript
// Roman Urdu: Fetch jobs
const fetchJobs = async () => {
  const response = await fetch('/api/jps?type=jobs');
  const jobs = await response.json();
  return jobs;
};

// Roman Urdu: Create candidate
const createCandidate = async (candidateData) => {
  const response = await fetch('/api/jps?type=candidates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(candidateData),
  });
  return response.json();
};

// Roman Urdu: Get AI matching score
const getCompatibilityScore = async (jobId, candidateId) => {
  const response = await fetch(`/api/jps/ai-matching?jobId=${jobId}&candidateId=${candidateId}`);
  return response.json();
};
```

## Roman Urdu: Rate Limiting

Currently, rate limiting is not implemented. Production environment mein rate limiting add karni hogi.

## Roman Urdu: Security Considerations

1. **Input Validation**: Tamam inputs validate kiye jate hain
2. **SQL Injection Protection**: Parameterized queries use hoti hain
3. **CORS**: Cross-origin requests handle hoti hain
4. **Error Handling**: Sensitive information expose nahi hoti

## Roman Urdu: Future Enhancements

1. **Authentication**: JWT tokens implementation
2. **Rate Limiting**: API rate limiting
3. **Caching**: Redis caching for performance
4. **Webhooks**: Real-time notifications
5. **Analytics**: Advanced reporting and analytics
6. **Multi-tenancy**: Multiple organization support

## Roman Urdu: Support

Koi bhi questions ya issues ke liye, please contact development team. 