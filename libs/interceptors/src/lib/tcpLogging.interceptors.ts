import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError, tap } from 'rxjs';

export class TcpLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TcpLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const handler = context.getHandler();
    const handlerName = handler.name;
    const args = context.getArgs();
    const payload = args[0];
    const processId = payload?.processId ?? 'N/A';
    this.logger.log(
      ` [${processId}] TCP Request -> ${handlerName} | Payload: ${JSON.stringify(
        payload
      )}`
    );
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        this.logger.log(
          `[${processId}] TCP Response <- ${handlerName} | Duration: ${duration}ms | Response: ${JSON.stringify(
            payload
          )}`
        );
      }),
      catchError((err) => {
        const duration = Date.now() - startTime;
        this.logger.error(
          `❌ [${processId}] TCP Error <- ${handlerName} | Duration: ${duration}ms | Error: ${err.message}`
        );
        return throwError(() => err);
      })
    );
  }
}
