type PostStatus = 'TO LEARN' | 'LEARNING' | 'LEARNED';

export interface Post {
  _id: string;
  title: string;
  description?: string;
  url?: string;
  status: PostStatus;
}

export interface AddNewPost extends Omit<Post, '_id'> {}

export interface Toast {
  show: boolean;
  message: string;
  type?: 'success' | 'danger';
}

