'use client';

import Link from 'next/link';
import { comments } from '../lib/data';
import { useState, useEffect } from 'react';

export default function Page() {
    const [data, setData] = useState<Record<string, any> | null>(null);
    useEffect(() => {
        async function fetchData() {
            const result = await comments();
            setData(result);
        }
        fetchData();
    }, []);
    return (
        <main>
            <h1>Wiki</h1>
            <Link href="/">Return to Map</Link>
            <div className="comments">{ data ? JSON.stringify(data) : 'Loading...' }</div>
        </main>
    )
};