import { PostTypes } from './post-types';
import { BlogContents } from './blog-contents';

export interface Post {
  id?: string;
  type: (typeof PostTypes)[keyof typeof PostTypes];
  authorId: string;
  published: boolean;
  reposted: boolean;
  originalId?: string;
  originalAuthorId?: string;
  tags: string[];
  content: BlogContents[(typeof PostTypes)[keyof typeof PostTypes]];
  createdAt?: Date;
  updatedAt?: Date;
  likesCount: number;
  commentsCount: number;
}