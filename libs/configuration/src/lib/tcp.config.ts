import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientsProviderAsyncOptions,
  TcpClientOptions,
  Transport,
} from '@nestjs/microservices';
import { IsNotEmpty } from 'class-validator';

export enum TCP_SERVICE {
  INVOICE_SERVICE = 'TCP_INVOICE_SERVICE',
}

export class TcpConfiguration {
  @IsNotEmpty()
  TCP_INVOICE_SERVICE: TcpClientOptions;

  constructor() {
    Object.entries(TCP_SERVICE).forEach(([key, serviceName]) => {
      const host = process.env[`${key}_HOST`] || 'localhost';
      const port = parseInt(process.env[`${serviceName}_PORT`] || '3000', 10);
      this[serviceName] = TcpConfiguration.setValue(host, port);
    });
  }
  static setValue(host: string, port: number): TcpClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    };
  }
}

export function TcpProvider(
  serviceName: keyof TcpConfiguration
): ClientsProviderAsyncOptions {
  return {
    name: serviceName,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return configService.get(`TCP_SERV.${serviceName}`) as TcpClientOptions;
    },
  };
}
