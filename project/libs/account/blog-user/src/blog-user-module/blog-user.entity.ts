import { StorableEntity, AuthUser, Entity } from '@project/shared/core';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public name: string;
  public avatar?: string;
  public passwordHash: string;
  public subscribersCount: number;
  public postsCount: number;
  public subscriptions: string[];
  public createdAt?: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (! user) {
      return;
    }

    this.id = user.id ?? undefined;
    this.createdAt = user.createdAt;
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.subscriptions = user.subscriptions ?? [];
    this.subscribersCount = user.subscribersCount ?? 0;
    this.postsCount = user.postsCount ?? 0;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash,
      avatar: this.avatar,
      subscriptions: this.subscriptions,
      subscribersCount: this.subscribersCount,
      postsCount: this.postsCount,
      createdAt: this.createdAt,
    }
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}