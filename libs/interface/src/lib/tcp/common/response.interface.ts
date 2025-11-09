import { HTTP_MESSAGE } from '@common/constants/enum/http-message.enum';
import { HttpStatus } from '@nestjs/common';

export class Response<T> {
  code: string;
  data?: T;
  error?: string;
  statusCode: number;
  constructor(response: Partial<Response<T>>) {
    this.code = response.code ?? HTTP_MESSAGE.OK;
    this.data = response.data;
    this.error = response.error;
    this.statusCode = response.statusCode ?? HttpStatus.OK;
  }
  static success<T>(data: T) {
    return new Response<T>({
      data,
      statusCode: HttpStatus.OK,
      code: HTTP_MESSAGE.OK,
    });
  }
}

export type ResponseType<T> = Response<T>;
