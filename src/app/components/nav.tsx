'use client';

import AuthService from '../api/auth/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Nav() {
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkLoginStatus = () => {
            const loggedIn = AuthService.loggedIn();
            console.log('Logged In:', loggedIn);
            setLoggedIn(loggedIn);
        };

        checkLoginStatus();

        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        setLoggedIn(false); 
        router.push('/wiki');
      };

    return (
        <nav>
            <ul>
                <li><a href="/wiki">Wiki Home</a></li>
                <li><a href="/">Return to Map</a></li>
                {loggedIn ? (
                    <li><a href="/wiki" onClick={handleLogout}>Logout</a></li>
                ) : (
                <li><a href="/wiki/login">Login or Register</a></li>
                )}
            </ul>
        </nav>
    )
}