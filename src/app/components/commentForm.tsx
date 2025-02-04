'use client';

import { useState } from 'react';
import AuthService from '../api/auth/authlogic';
import { addComment } from '../lib/data';
import { useSession, getSession } from 'next-auth/react';

interface Comment {
  username: string;
  commenttext: string;
}

const CommentForm: React.FC<{ onCommentAdded: () => void }> = ({ onCommentAdded }) => {
  const { data: session } = useSession();
  const [commentText, setCommentText] = useState("");
  const [postedComment, setPostedComment] = useState<Comment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const submitComment = async () => {
      try {
        const username = await AuthService.getUsername();
        const comment = await addComment(username, commentText);

        if (comment) {
          setCommentText('');
          onCommentAdded();
        } else {
          setError('Failed to add comment');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        setError('An unexpected error occurred');
      }
    };

    submitComment();
  };

  return (
    <>
      {session ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Comment"
          />
          <button type="submit">Add Comment</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      ) : (
        <p>Please sign in to add a comment.</p>
      )}
    </>
  );
};

export default CommentForm;