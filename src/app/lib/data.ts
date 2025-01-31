'use server';

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error('DATABASE_URL not set');
}
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);

async function getData() {
  const response = await sql`SELECT version()`;
  return response[0].version;
}

export async function users(username: string, password: string) {
  const response = await sql('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
  return response[0];
}

export async function comments() {
  const response = await sql`SELECT * FROM comments`;
  return response;
}