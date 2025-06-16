import type { NextApiRequest, NextApiResponse } from 'next';
import onfido from '@/lib/kyc/onfidoClient';
import formidable, { Fields, Files, File } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' });
    }
    const applicantId = Array.isArray(fields.applicantId)
      ? fields.applicantId[0] || ''
      : (fields.applicantId as string) || '';
    const documentType = Array.isArray(fields.documentType)
      ? fields.documentType[0] || 'passport'
      : (fields.documentType as string) || 'passport';
    const fileField = files.file;
    const file = Array.isArray(fileField)
      ? fileField[0] || null
      : (fileField as File) || null;

    if (!applicantId || !file) {
      return res.status(400).json({ error: 'Missing applicantId or file' });
    }

    try {
      const fileStream = fs.createReadStream(file.filepath);
      const document = await onfido.document.upload(applicantId, {
        file: fileStream,
        type: documentType,
        filename: file.originalFilename || 'document.jpg',
      });
      return res.status(200).json({ documentId: document.id, document });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Failed to upload document' });
    }
  });
} 