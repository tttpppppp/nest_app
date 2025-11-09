import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptors';
import { Response } from '@common/interface/tcp/common/response.interface';
import { RequestParams } from '@common/decorators/requestParams.decorator';
import { ProcessId } from '@common/decorators/processId.decorator';
@Controller()
@UseInterceptors(new TcpLoggingInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('get_invoices')
  getInvoices(
    @RequestParams() data,
    @ProcessId() processId: string
  ): Response<string> {
    return Response.success<string>(
      `Invoice ${data} from processId ${processId}`
    );
  }
}
