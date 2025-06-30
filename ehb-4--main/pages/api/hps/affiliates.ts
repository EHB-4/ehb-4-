import type { NextApiRequest, NextApiResponse } from 'next';
import { sampleAffiliates } from '../../../types/hps';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(sampleAffiliates);
} 