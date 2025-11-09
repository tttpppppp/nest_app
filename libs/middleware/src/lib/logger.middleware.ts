import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getProcessId } from '@common/utils/string.utils';
import { MetaDataKeys } from '@common/constants/common.constant';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl, body } = req;
    const processId = getProcessId();
    const now = Date.now();
    (req as any)[MetaDataKeys.PROCESS_ID] = processId;
    (req as any)[MetaDataKeys.START_TIME] = startTime;
    Logger.log(
      `Start process [${processId}] ${method} ${originalUrl} -
      )} - Time: ${new Date(now).toISOString()}`
    );
    const originalSend = res.send.bind(res);
    res.send = function (body?: any): Response {
      const responseTime = Date.now() - startTime;
      Logger.log(
        `End process [${processId}] ${method} ${originalUrl} - Response Time: ${responseTime}ms`
      );
      return originalSend(body);
    };
    next();
  }
}
