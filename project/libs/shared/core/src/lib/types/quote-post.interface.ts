import { Post } from './post.interface';
import { BlogContents } from './blog-contents';
import { PostTypes } from './post-types';

export interface QuotePost extends Post {
  content: BlogContents[typeof PostTypes.Quote];
}