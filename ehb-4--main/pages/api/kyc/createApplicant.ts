import type { NextApiRequest, NextApiResponse } from 'next';
import onfido from '@/lib/kyc/onfidoClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const applicant = await onfido.applicant.create({
      first_name: firstName,
      last_name: lastName,
      email,
    });
    return res.status(200).json({ applicantId: applicant.id, applicant });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to create applicant' });
  }
} 