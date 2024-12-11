import { StorableEntity, AuthUser, Entity } from '@project/shared/core';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public name: string;
  public registrationDate: Date;
  public avatarId?: string;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (! user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.registrationDate = user.registrationDate;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
    this.avatarId = user.avatarId ?? undefined;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      registrationDate: this.registrationDate,
      passwordHash: this.passwordHash,
      avatarId: this.avatarId
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