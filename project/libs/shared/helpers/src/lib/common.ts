import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { $Enums, Prisma } from '@prisma/client';
import { BlogContents, PostTypes } from '@project/shared/core';

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function fillDto<T, V extends []>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
      excludeExtraneousValues: true,
      ...options,
  });
}

//Соединение с монгой
export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function postDocumentToPojo(
  document: {
    tags: {
      name: string;
    }[];
  } & {
    id: string;
    authorId: string;
    type: $Enums.Type;
    content: Prisma.JsonValue;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    reposted: boolean;
    originalId: string | null;
    originalAuthorId: string | null;
  }
) {
  return {
    ...document,
    tags: document.tags.map(({ name }) => name),
    content:
      document.content as BlogContents[(typeof PostTypes)[keyof typeof PostTypes]],
  };
}