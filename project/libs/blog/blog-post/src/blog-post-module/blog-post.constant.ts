import { SortDirection, SortType } from '@project/shared/core';

export const BlogPostQueryDefaults = {
    PostCountLimit: 25,
    SortDirection: SortDirection.Desc,
    PageCount: 1,
    SortType: SortType.CreatedAt,
  } as const;

export const BlogPostResponseMessages = {
    PostCreated: 'The post was created',
    AuthFailed: 'Authentication failed',
    ServerError: 'Internal server error',
    PostFound: 'Post was found',
    PostNotFound: 'Post was not found'
} as const;