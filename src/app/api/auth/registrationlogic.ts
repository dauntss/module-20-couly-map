import type { NextApiRequest, NextApiResponse } from 'next';
import { neon } from '@neondatabase/serverless';
import { registerUser } from '../../lib/data';

const db = neon(process.env.NEXT_PUBLIC_DATABASE_URL as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const user = await registerUser(username, password);

      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}