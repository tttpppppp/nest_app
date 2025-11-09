import { AppConfiguration } from '@common/configuration/app.config';
import { ConfigurationBase } from '@common/configuration/base.config';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TcpConfiguration } from '@common/configuration/tcp.config';
class Configuration extends ConfigurationBase {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();
  @ValidateNested()
  @Type(() => TcpConfiguration)
  TCP_SERV = new TcpConfiguration();
}

export const CONFIGURATION = new Configuration();

export type ConfigurationType = typeof CONFIGURATION;
CONFIGURATION.validate();
