'use client';

import { useEffect, useState } from 'react';
import { getComments } from '../lib/data';

interface Comment {
  id: string;
  username: string;
  commenttext: string;
}

const CommentList: React.FC<{ updateTrigger: boolean }> = ({ updateTrigger }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const rawData: Record<string, any>[] = await getComments();
      console.log("Raw Data:", rawData);

      const transformedData: Comment[] = rawData.map((item) => {
        return {
          id: item.id as string,
          username: item.username as string,
          commenttext: item.commenttext as string
        };
      });
  
      setComments(transformedData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [updateTrigger]);

  return (
      <ul>
        {comments.map((comment) => (
          <li className="singleComment" key={comment.id}>
            <h3>{comment.username}</h3>
            <p>{comment.commenttext}</p>
          </li>
        ))}
      </ul>
  );
};

export default CommentList;