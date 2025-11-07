import { AppConfiguration } from '@common/configuration/app.config';
import { ConfigurationBase } from '@common/configuration/base.config';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
class Configuration extends ConfigurationBase {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();
}

export const CONFIGURATION = new Configuration();

export type ConfigurationType = typeof CONFIGURATION;
CONFIGURATION.validate();
