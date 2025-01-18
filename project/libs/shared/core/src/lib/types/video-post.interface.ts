import { Post } from './post.interface';
import { BlogContents } from './blog-contents';
import { PostTypes } from './post-types';

export interface VideoPost extends Post {
  content: BlogContents[typeof PostTypes.Video];
}