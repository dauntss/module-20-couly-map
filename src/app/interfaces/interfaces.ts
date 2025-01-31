export type User = {
    name: string;
    picture: string;
    email?: string;
    sub?: string;
  };
  
export type Comment = {
    id: string;
    created_at: number;
    url: string;
    text: string;
    user: User;
  };