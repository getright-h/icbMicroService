import axios, { AxiosInstance, AxiosPromise, ResponseType } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DepUtil } from '~/framework/aop/inject';
import * as Sentry from '@sentry/browser';
import { StorageUtil } from '~/framework/util/storage';

export interface HttpResponseModel {
  message: string;
  data: any;
  code: number;
  total?: number;
  status?: boolean;
  timestamp?: string;
}

@DepUtil.Injectable()
class RequestService {
  private _httpClient: AxiosInstance;

  constructor() {
    this._httpClient = axios.create();
  }

  private createAuthHeaders(): any {
    const headers = { token: '' };
    const token = StorageUtil.getLocalStorage('token');
    if (token) {
      headers.token = token;
    }
    return headers;
  }

  private getRootUrl(url: string) {
    let returnInfo = process.env.MAIN;
    if (!!~url.indexOf('/Login')) {
      returnInfo = process.env.VERIFICATIONCODE;
    } else if (!!~url.indexOf('VerifyCode')) {
      returnInfo = process.env.VERIFICATIONCODE;
    } else if (!!~url.indexOf('dataProcess/')) {
      returnInfo = process.env.REPORT_EXPORT;
    } else {
      returnInfo = process.env.USERINFO;
    }
    return returnInfo;
  }

  private _makeRequest(
    method: string,
    url: string,
    queryParams?: object,
    // body?: object,
    responseType: ResponseType = 'json'
  ) {
    let request: AxiosPromise;
    if (method == 'post' || method == 'put') {
      request = this._httpClient[method](this.getRootUrl(url) + url, queryParams, {
        headers: this.createAuthHeaders(),
        responseType,
        timeout: 300000
      });
    } else {
      request = this._httpClient[method](this.getRootUrl(url) + url, {
        params: queryParams,
        headers: this.createAuthHeaders(),
        responseType,
        timeout: 300000
      });
    }
    return new Observable(subscriber => {
      request
        .then(response => {
          subscriber.next(response.data);
          subscriber.complete();
        })
        .catch((err: Error) => {
          subscriber.error(err);
          subscriber.complete();
        });
    });
  }

  public get(url: string, queryParams?: object) {
    return this._makeRequest('get', url, queryParams).pipe(
      map(data => {
        return this.dealWithError(data);
      }),
      catchError(this.handleError)
    );
  }

  public post(url: string, queryParams?: object) {
    return this._makeRequest('post', url, queryParams).pipe(
      map(data => {
        return this.dealWithError(data);
      }),
      catchError(this.handleError)
    );
  }

  public put(url: string, queryParams?: object) {
    return this._makeRequest('put', url, queryParams).pipe(
      map(data => {
        return this.dealWithError(data);
      }),
      catchError(this.handleError)
    );
  }

  public delete(url: string, queryParams?: object) {
    return this._makeRequest('delete', url, queryParams).pipe(
      map(data => {
        return this.dealWithError(data);
      }),
      catchError(this.handleError)
    );
  }

  public getDownload(url: string, queryParams?: object) {
    return this._makeRequest('get', url, queryParams, 'arraybuffer').pipe(
      map(data => {
        return this.dealWithError(data);
      }),
      catchError(this.handleError)
    );
  }

  public postDownload(url: string, queryParams?: object) {
    return this._makeRequest('post', url, queryParams, 'arraybuffer').pipe(
      map(data => {
        return this.dealWithError(data);
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    // ??????????????????????????????
    if (error === undefined || error.code === 'ECONNABORTED') {
      error = '??????????????????';
    } else {
      if (!error.response) {
        if (error.message == 'Network Error') {
          error = '??????????????????';
        }
      } else {
        const status = error.response.status;
        if (status && parseInt(status) >= 500) {
          error = '???????????????????????????????????????';
        } else if (status === 401) {
          StorageUtil.removeLocalStorage('token');
          history.pushState({}, '', '#/login');
          location.reload();
          error = '?????????????????????????????????';
        } else if (status && parseInt(status) >= 400) {
          error = '??????????????????????????????????????????';
        }
      }
    }

    process.env.SENTRY_URL && Sentry.captureException({ PROJECT: process.env.SENTRY_LABLE, ERROR: error });
    // ?????????????????????error
    return throwError(error);
  }

  dealWithError(data: any) {
    data = data as HttpResponseModel;
    if (data.status) {
      if (data.total || data.total == 0) {
        return { total: data.total, data: data.data };
      }
      if (data.data == 0 || data.data) {
        return data.data;
      } else {
        return data;
      }
    } else {
      if (data.code === 401 || data.StatusCode === 401) {
        StorageUtil.removeLocalStorage('token');
        history.pushState({}, '', '#/login');
        location.reload();
        throw '?????????????????????????????????';
      }

      throw data.message;
    }
  }
}

export { RequestService };
