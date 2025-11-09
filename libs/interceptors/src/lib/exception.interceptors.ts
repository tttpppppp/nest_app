import {
  CallHandler,
  ExecutionContext,
  HttpException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Request } from 'express';
import { MetaDataKeys } from '@common/constants/common.constant';
import { ResponseDto } from '@common/interface/gateway/responses.interface';

export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request & {
      [MetaDataKeys.PROCESS_ID]: string;
      [MetaDataKeys.START_TIME]: number;
    } = context.switchToHttp().getRequest();

    const processId = request[MetaDataKeys.PROCESS_ID] as string;
    const startTime = Number(request[MetaDataKeys.START_TIME]);

    return next.handle().pipe(
      map((data: ResponseDto<unknown>) => {
        const duration = Date.now() - startTime;
        data.processId = processId;
        data.duration = duration;
        return data;
      }),
      catchError((err) => {
        console.log(err);

        const duration = Date.now() - startTime;
        const message =
          err.response?.message || err?.message || 'Internal Server Error';
        const statusCode = err.response?.statusCode || err?.status || 500;

        const response = new ResponseDto({
          message,
          statusCode,
          processId,
          data: null,
          duration,
        });

        return throwError(() => new HttpException(response, statusCode));
      })
    );
  }
}
