import AuthService from '../api/auth/authlogic';
import { useEffect, useState } from 'react';

const UserName: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const username = await AuthService.getUsername();
        setUsername(username);
      } catch (error) {
        console.error('Error fetching username:', error);
        setUsername(null);
      }
    };

    fetchUsername();
  }, []);

  if (!username) return null;

  return (
    <>
      {username}
    </>
  );
};

export default UserName;