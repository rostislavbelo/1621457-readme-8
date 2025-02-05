import { HttpService } from '@nestjs/axios';
import { Post, PostTypes } from '@project/shared/core';
import { substituteFileUrl } from './substitute-file-url';
import { fillAuthorInfo } from './fill-author-info';
export async function transformPost(httpService: HttpService, record: Post) {
  await fillAuthorInfo(httpService, record);
  if (record?.type === PostTypes.Photo) {
    record.content['pictureUrl'] = await substituteFileUrl(
      httpService,
      record.content['pictureId']
    );
  }
}