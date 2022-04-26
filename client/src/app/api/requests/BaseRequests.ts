import { AxiosInstance, AxiosResponse } from "axios";

// BaseRequests simplifies API requests with predefined axios instance and interceptors
export class BaseRequests {
  private readonly _instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this._instance = instance;
  }

  protected Get = (url: string, params?: URLSearchParams) => {
    return this._instance.get(url, { params }).then(this.BodyResolver);
  };

  protected Post = (url: string, body: {}) => {
    return this._instance.post(url, body).then(this.BodyResolver);
  };

  protected Put = (url: string, body: {}) => {
    return this._instance.get(url, body).then(this.BodyResolver);
  };

  protected Delete = (url: string) => {
    return this._instance.delete(url).then(this.BodyResolver);
  };

  // BodyResolver makes dealing with axios responses much easier
  private BodyResolver = (res: AxiosResponse) => {
    return res.data;
  };
}
