import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('New Post:', req.body);
    return res.status(201).json({ success: true });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
