import type { NextApiRequest, NextApiResponse } from 'next';
import { sampleInstitutes } from '../../../types/hps';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(sampleInstitutes);
} 