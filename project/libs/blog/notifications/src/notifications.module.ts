import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/helpers';
import { BlogNotificationsService } from './notifications.service';
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit')),
  ],
  providers: [BlogNotificationsService],
  exports: [BlogNotificationsService],
})
export class BlogNotificationsModule {}