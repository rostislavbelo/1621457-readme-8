import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';
import { Post, RabbitRouting } from '@project/shared/core';
import { rabbitConfig } from '@project/account-config';

@Injectable()
export class BlogNotificationsService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}
  
  public async notifyNewPosts(posts: Post[]) {
    return this.rabbitClient.publish(
      this.rabbitOptions.exchange,
      RabbitRouting.NotifyNewPosts,
      { type: RabbitRouting.NotifyNewPosts, posts: posts }
    );
  }
}