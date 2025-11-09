import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from '@common/interface/gateway/responses.interface';
import { map } from 'rxjs';
import { TcpClient } from '@common/interface/tcp/common/tcp-client.interface';
import { ProcessId } from '@common/decorators/processId.decorator';
@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TCP_INVOICE_SERVICE') private readonly invoiceClient: TcpClient
  ) {}

  @Get()
  getData() {
    const result = this.appService.getData();
    return new ResponseDto({
      data: result,
    });
  }
  @Get('invoice')
  getInvoices(@ProcessId() processId: string) {
    return this.invoiceClient
      .send<string, number>('get_invoices', { processId: processId, data: 1 })
      .pipe(map((data) => new ResponseDto<string>(data)));
  }
}
