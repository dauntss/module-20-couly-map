'use client';

import Nav from '../components/nav';
import "../ui/wiki.css";
import "../ui/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Nav />
            {children}
        </div>
    );
}