import { PostTypes } from './post-types';
import { Comment } from './comment.interface';

export interface Post {
  id?: string;
  type: (typeof PostTypes)[keyof typeof PostTypes];
  authorId: string;
  published: boolean;
  reposted: boolean;
  originalId?: string;
  originalAuthorId?: string;
  tags: string[];
  comments: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
  // может быть favorites
}