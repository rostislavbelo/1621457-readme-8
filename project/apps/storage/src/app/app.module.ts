import { Module } from '@nestjs/common';
import { FileUploaderModule } from '@project/file-uploader';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageConfigModule, getMongooseOptions } from '@project/config-storage';

@Module({
  imports: [FileUploaderModule, StorageConfigModule, MongooseModule.forRootAsync(getMongooseOptions())],
  controllers: [],
  providers: [],
})
export class AppModule {}