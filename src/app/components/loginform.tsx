import { useState } from 'react';
import {users} from '../lib/data';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {  // Type the component
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const Router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => { // Type the event
    e.preventDefault();
    setError('');

    const userresponse = await users(username, password); // Type the function
    if (userresponse) {
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