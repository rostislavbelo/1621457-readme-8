import { AuthUser, EntityFactory } from '@project/core';
import { BlogUserEntity } from './blog-user.entity';

export class BlogUserFactory implements EntityFactory<BlogUserEntity> {
  public create(entityPlainData: AuthUser): BlogUserEntity {
    return new BlogUserEntity(entityPlainData);
  }
}