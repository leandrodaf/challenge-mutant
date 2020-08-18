import axios, {
  AxiosInstance,
  AxiosResponse as AxiosResponseDefault,
} from 'axios';

declare module 'axios' {
  type AxiosResponseDefault<T = any> = Promise<T>;
}

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    );
  };

  private handleResponse = ({ data }: any) => data;

  protected handleError = (error: any) => Promise.reject(error);
}
