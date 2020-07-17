import axios, { AxiosInstance, AxiosPromise, ResponseType } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DepUtil } from '~/framework/aop/inject';
import * as Sentry from '@sentry/browser';

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

    // const token = localStorage.getItem('TOKENINFO');
    const token =
      '5766fdebe2cea60cc71cd2422a4778c5:cf74367d9c3368da5b9475dff2b4390059f57c2b6a55416ce02b39d75b27efd730331df6df684c8510e7320de8e92e18572dc06ba3f350acee6d84c055cabcd06485f0155d7381d18cb091bd4a840d13344349b44487dec0dfdee456419862d1e07c7ead970596f3702f626e6007419522e81566625d51b7c60251f9a61d4ff0b902475691466bfb2fa10556887970c8c476677b9a69a86fa7539cae8cd4f990';
    if (token) {
      headers.token = token;
    }
    return headers;
  }

  private getRootUrl(url: string) {
    let returnInfo = process.env.MAIN;
    if (!!~url.indexOf('VerifyCode')) {
      returnInfo = process.env.LOGIN;
    } else {
      returnInfo = process.env.MAIN;
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
    // 后续在实际应用中添加
    if (error === undefined || error.code === 'ECONNABORTED') {
      error = '服务请求超时';
    } else {
      if (!error.response) {
        if (error.message == 'Network Error') {
          error = '请检查网络。';
        }
      } else {
        const status = error.response.status;
        if (status && parseInt(status) >= 500) {
          error = '服务器错误，请联系管理员。';
        } else if (status === 401) {
          localStorage.getItem('TOKENINFO');
          // this.route.navigateByUrl('login');
          error = '登录失效，请重新登录。';
        } else if (status && parseInt(status) >= 400) {
          error = '页面找不到了，请联系管理员。';
        }
      }
    }

    process.env.SENTRY_URL && Sentry.captureException({ PROJECT: process.env.SENTRY_LABLE, ERROR: error });
    // 在这个地方打印error
    return throwError(error);
  }

  dealWithError(data: any) {
    console.log(data);

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
        // this.cookieService.remove("FanCheHuiToken");
        // this.route.navigateByUrl('login');
        throw '登录失效，请重新登录！';
      }

      throw data.message;
    }
  }
}

export { RequestService };
