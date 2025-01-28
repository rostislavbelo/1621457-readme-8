import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from './common';

export function getRabbitMQOptions(nameSpace: string) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${nameSpace}.exchange`),
          type: 'direct'
        }
      ],
      uri:getRabbitMQConnectionString({
        host: config.get<string>(`${nameSpace}.host`),
        password: config.get<string>(`${nameSpace}.password`),
        user: config.get<string>(`${nameSpace}.user`),
        port: config.get<string>(`${nameSpace}.port`),
      }),
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }
}