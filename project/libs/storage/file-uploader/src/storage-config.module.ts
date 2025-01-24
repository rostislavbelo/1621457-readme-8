import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import storageConfig from './storage.config';

const ENV_FILE_PATH = 'apps/storage/storage.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [storageConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class StorageConfigModule {}
