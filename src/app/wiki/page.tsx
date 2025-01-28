'use client';

import { comments } from '../lib/data';
import { useState, useEffect } from 'react';

interface Comment {
    id: string;
    userid: string;
    commenttext: string;
}

export default function Page() {
    const [data, setData] = useState<Comment[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await comments() as Comment[];
            setData(result);
        }
        fetchData();
    }, []);

    if (!data) {
        return <div>No Comments Yet.</div>;
    }

    if (!Array.isArray(data)) {
        return <div>No Comments Available.</div>;
    }

    return (
        <main>
            <h1>Wiki</h1>
            {data.map((comment) => (
              <div key={comment.id}>
                  <h2>{comment.userid}</h2>
                  <p>{comment.commenttext}</p>
              </div>
            ))}
        </main>
    );
}