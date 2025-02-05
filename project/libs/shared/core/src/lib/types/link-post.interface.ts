import { BlogContents } from './blog-contents';
import { Post } from './post.interface';
import { PostTypes } from './post-types';

export interface LinkPost extends Post {
  content: BlogContents[typeof PostTypes.Link];
}
