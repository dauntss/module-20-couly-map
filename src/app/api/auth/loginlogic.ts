import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

const db = neon(process.env.NEXT_PUBLIC_DATABASE_URL as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const [user] = await db('SELECT * FROM users WHERE email = $1', [username]);

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET!, // Non-null assertion as we know it's defined
        { expiresIn: '200h' }
      );

      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600`);
      res.status(200).json({ message: 'Login successful' });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: 'Something went wrong' });
    } finally {
      return;
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}