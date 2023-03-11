import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

export interface Request {
  count: number;
  query: string;
}

export class requestOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      }
    | undefined;
  context?: HttpContext | undefined;
  observe?: 'body' | undefined;
  params?: HttpParams | undefined;
  reportProgress?: boolean | undefined;
  responseType?: 'json' | undefined;
  withCredentials?: boolean | undefined;
}
