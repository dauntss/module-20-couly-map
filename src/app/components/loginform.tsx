'use client';

import { useState } from 'react';
import { users } from '../lib/data';
import { useRouter } from 'next/navigation';
import AuthService from '../api/auth/authlogic';

const LoginForm: React.FC = () => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    setError('');

    try {
      const userresponse = await users(username, password); 
      console.log(userresponse);
      if (userresponse) {
        AuthService.login(userresponse.token);
        // router.push('/wiki');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <input 
        type="text" 
        value={username} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} 
    />
    <input 
        type="password" 
        value={password} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
    />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm