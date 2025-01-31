'use client';

import { useState } from 'react';
import {users} from '../lib/data';
import { useRouter } from 'next/navigation';
import AuthService from '../api/auth/auth';

const LoginForm: React.FC = () => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const Router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    setError('');

    const userresponse = await users(username, password); 
    if (userresponse) {
      AuthService.login(userresponse.token);
      Router.push('/wiki');
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