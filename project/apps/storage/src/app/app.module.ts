import { Module } from '@nestjs/common';
import { FileUploaderModule } from '@project/file-uploader';
import { StorageConfigModule } from '@project/config-storage';

@Module({
  imports: [FileUploaderModule, StorageConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}