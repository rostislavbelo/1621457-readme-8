import { HttpService } from '@nestjs/axios';
import { Comment, Post } from '@project/shared/core';
import { ApplicationServiceURL } from '../app.config';

export async function fillAuthorInfo(
  httpService: HttpService,
  record: Post | Comment
) {
  let authorData = `failed to get author data for author with id ${record.authorId}`;
  try {
    const { data } = await httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${record.authorId}`
    );
    authorData = data;
  } catch {
    console.log(
      `failed to get author data for author with id ${record.authorId}`
    );
  }
  record['author'] = authorData;
}
