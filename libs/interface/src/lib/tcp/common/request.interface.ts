export class Request<T> {
  processId?: string;
  data?: T;
  constructor(request: Partial<Request<T>>) {
    Object.assign(this, request);
  }
}

export type RequestType<T> = Request<T>;
