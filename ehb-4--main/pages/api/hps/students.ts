import type { NextApiRequest, NextApiResponse } from 'next';
import { sampleStudents } from '../../../types/hps';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(sampleStudents);
} 