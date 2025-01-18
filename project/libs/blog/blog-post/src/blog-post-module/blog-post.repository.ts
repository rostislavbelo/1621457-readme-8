import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/data-access';
import { BlogPostEntity } from './blog-post.entity';
import {
  BlogContents,
  PaginationResult,
  Post,
  PostTypes,
} from '@project/shared/core';
import { BlogPostFactory } from './blog-post.factory';
import { PrismaClientService } from '@project/blog-models';
import { $Enums, Prisma } from '@prisma/client';
import { BlogPostQuery } from './blog-post.query';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<
  BlogPostEntity,
  Post
> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        id: undefined,
        tags: {
          connectOrCreate: pojoEntity.tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });

    entity.id = record.id;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(this.transformRawDocument(document));
  }

  public async update(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        content: pojoEntity.content,
        tags: {
          connectOrCreate: pojoEntity.tags.map((name) => ({
            where: { name },
            create: { name },
          })),
          set: pojoEntity.tags.map((tag) => ({ name: tag })),
        },
      },
      include: {
        tags: true,
      },
    });
  }

  public async find(
    query?: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.tags) {
      where.tags = {
        some: {
          name: {
            in: query.tags,
          },
        },
      };
    }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          tags: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) =>
        this.createEntityFromDocument(this.transformRawDocument(record))
      ),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }

  private transformRawDocument(
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
}