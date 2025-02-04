import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { Comment, PaginationResult, SortDirection } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentQuery } from './blog-comment.query';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<
  BlogCommentEntity,
  Comment
> {
  constructor(
    entityFactory: BlogCommentFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogCommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const document = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  private async getCommentCount(
    where: Prisma.CommentWhereInput
  ): Promise<number> {
    return this.client.comment.count({ where });
  }

  private calculateCommentsPages(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async findByPostId(
    postId: string,
    query: BlogCommentQuery
  ): Promise<PaginationResult<BlogCommentEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.CommentWhereInput = {};
    where.postId = postId;
    const [records, commentCount] = await Promise.all([
      this.client.comment.findMany({
        where,
        take,
        skip,
        orderBy: {
          createdAt: SortDirection.Desc,
        },
      }),
      this.getCommentCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculateCommentsPages(commentCount, take),
      itemsPerPage: take,
      totalItems: commentCount,
    };
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }
}
