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
  const response = await sql('SELECT * FROM users WHERE username = $1', [username]);
  const user = response[0];

  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  } else {
    throw new Error('Invalid credentials');
  }
}

export async function comments() {
  const response = await sql`SELECT * FROM comments`;
  return response;
}

export async function registerUser(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const response = await sql('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
  return response[0];
}