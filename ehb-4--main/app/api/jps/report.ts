import { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react'; // Uncomment if using session auth

// Mock data for demonstration; replace with real DB queries
const mockJPSReport = {
  name: 'Ali Raza',
  specialization: 'Legal',
  joinDate: '2022-01-01',
  metrics: {
    totalEarnings: 12000,
    activeClients: 8,
    rating: 4.7,
    completedJobs: 25,
  },
  recentJobs: [
    { id: 'j1', title: 'Case A', client: 'Client X', status: 'completed', amount: 500, dueDate: '2024-06-01' },
    { id: 'j2', title: 'Case B', client: 'Client Y', status: 'in-progress', amount: 300, dueDate: '2024-06-10' },
    { id: 'j3', title: 'Case C', client: 'Client Z', status: 'pending', amount: 200, dueDate: '2024-06-15' },
  ],
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getSession({ req });
  // const userId = session?.user?.id || req.query.userId;
  // TODO: Replace mock data with DB query using userId
  res.status(200).json(mockJPSReport);
} 