import { IsNumber } from 'class-validator';
export class AppConfiguration {
  @IsNumber()
  PORT: number;
  @IsNumber()
  INVOICE_SERVICE_PORT: number;
  constructor() {
    this.PORT = parseInt(process.env['PORT'] || '3000', 10);
    this.INVOICE_SERVICE_PORT = parseInt(
      process.env['INVOICE_SERVICE_PORT'] || '8081',
      10
    );
  }
}
