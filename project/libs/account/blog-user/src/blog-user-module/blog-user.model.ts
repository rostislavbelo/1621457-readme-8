import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser} from '@project/shared/core';

//Модель документа для Монго, обрисовывает сущьность для БД
@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop()
  public avatar: string;

  @Prop({
    //валидация
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

  // @Prop({
  //   required: true,
  // })
  // public registrationDate: Date;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);