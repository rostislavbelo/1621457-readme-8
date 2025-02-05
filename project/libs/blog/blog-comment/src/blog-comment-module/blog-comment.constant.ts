export const BlogPostQueryDefaults = {
  CommentCountLimit: 50,
  PageCount: 1,
} as const;

export const BlogCommentResponseMessages = {
  Forbidden: 'Access denied',
  ServerError: 'Internal server error',
  CommentDeleted: 'Comment was deleted',
  CommentFound: 'Comment was found',
  CommentNotFound: 'Comment was not found',
} as const;
