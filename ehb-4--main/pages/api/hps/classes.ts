import type { NextApiRequest, NextApiResponse } from 'next';
import { sampleClasses } from '../../../types/hps';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(sampleClasses);
} 