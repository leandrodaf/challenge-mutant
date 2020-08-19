import axios, {
  AxiosInstance,
  AxiosResponse as AxiosResponseDefault,
} from 'axios';

import { log } from '../Logger';

declare module 'axios' {
  type AxiosResponseDefault<T = any> = Promise<T>;
}

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    );
  };

  private handleRequest = (request: any) => {
    const { url, method, headers, baseURL } = request;
    log.log('debug', {
      type: 'HTTP_REQUEST_DEBUG',
      url,
      method,
      headers,
      baseURL,
    });

    return request;
  };

  private handleResponse = ({
    data,
    status,
    statusText,
    headers,
    config,
  }: any) => {
    log.log('debug', {
      type: 'HTTP_RESPONSE_DEBUG',
      headers,
      config,
      status,
      statusText,
    });
    return data;
  };

  protected handleError = (error: any) => Promise.reject(error);
}
