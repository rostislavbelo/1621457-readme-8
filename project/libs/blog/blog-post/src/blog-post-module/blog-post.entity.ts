import {
    BlogContents,
    Entity,
    Post,
    PostTypes,
    StorableEntity,
  } from '@project/shared/core';
  
  export class BlogPostEntity extends Entity implements StorableEntity<Post> {
    public type: (typeof PostTypes)[keyof typeof PostTypes];
    public authorId: string;
    public content: BlogContents[(typeof PostTypes)[keyof typeof PostTypes]];
    public published: boolean;
    public reposted: boolean;
    public originalId?: string;
    public originalAuthorId?: string;
    public tags: string[];
    public createdAt?: Date;
    public updatedAt?: Date;
  
    constructor(post?: Post) {
      super();
      this.populate(post);
    }
  
    public populate(post?: Post): void {
      if (!post) {
        return;
      }
  
      this.id = post.id ?? undefined;
      this.type = post.type;
      this.authorId = post.authorId;
      this.content = post.content;
      this.published = post.published;
      this.reposted = post.reposted;
      this.originalId = post.originalId;
      this.originalAuthorId = post.originalAuthorId;
      this.tags = post.tags;
      this.createdAt = post.createdAt;
      this.updatedAt = post.updatedAt;
    }
  
    public toPOJO(): Post {
      return {
        id: this.id,
        type: this.type,
        authorId: this.authorId,
        content: this.content,
        published: this.published,
        reposted: this.reposted,
        originalId: this.originalId,
        originalAuthorId: this.originalAuthorId,
        tags: this.tags,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
    }
  }