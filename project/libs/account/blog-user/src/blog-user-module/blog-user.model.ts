import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser} from '@project/shared/core';

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop()
  public avatar: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({ required: true, default: 0 })
  subscribersCount: number;

  @Prop({ required: true, default: 0 })
  postsCount: number;

  @Prop({ required: true, default: [] })
  subscriptions: string[];
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);