import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import { Logger } from '@nestjs/common';
export class ConfigurationBase {
  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;
  IS_DEV: boolean;
  DATABASE_URL: string;
  @IsString()
  @IsNotEmpty()
  GLOBAL_PREFIX: string;

  constructor() {
    this.NODE_ENV = process.env['NODE_ENV'] as string;
    this.IS_DEV = this.NODE_ENV === 'development';
    this.DATABASE_URL =
      process.env['DATABASE_URL'] || 'postgres://localhost:5432/mydb';
    this.GLOBAL_PREFIX = process.env['GLOBAL_PREFIX'] as string;
  }

  async validate() {
    const errors = validateSync(this, { skipMissingProperties: true });
    console.log(errors);

    if (errors.length > 0) {
      const _errors = errors.map((err) => {
        return err.constraints;
      });
      Logger.error('Configuration validation failed', _errors);
    }
  }
}
