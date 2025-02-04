'use client';

import Link from 'next/link';
import Signin from './sign-in';
import UserName from './username';

const Nav: React.FC = () => {

    return (
        <nav>
            <ul>
                <li><Link href="/wiki">All Pages</Link></li>
                <li><Link href="/">Return to Map</Link></li>
                <li>Welcome, <UserName /></li>
                <li><Signin /></li>
            </ul>
        </nav>
    );
};

export default Nav;