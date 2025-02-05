import { User } from "./user.interface";

export interface AuthUser extends User  {
  passwordHash: string;
  subscribersCount?: number;
  postsCount?: number;
  subscriptions?: string[];
  createdAt?: string;
}