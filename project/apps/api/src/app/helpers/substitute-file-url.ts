import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { File } from '@project/shared/core';

export async function substituteFileUrl(httpService: HttpService, id: string) {
  try {
    const { data } = await httpService.axiosRef.get<File>(
      `${ApplicationServiceURL.Files}/${id}`
    );
    const subdirectory = data.subDirectory.replace('\\', '/');
    return `${ApplicationServiceURL.FilesStatic}/${subdirectory}/${data.hashName}`;
  } catch {
    console.log(`Failed to get information for file with id ${id}`);
    return id;
  }
}
