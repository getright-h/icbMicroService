import { createHashHistory } from 'history';
import { ShowNotification } from '~/framework/util/common';
import { DepUtil } from '~/framework/aop/inject';
import { BaseRequestService, StorageUtil } from '@fch/fch-tool';
import { TOKEN_NAME } from '~/solution/baseConfig';
const history = createHashHistory();
function getRootUrl(url: string) {
  let returnInfo = process.env.MAIN;
  if (!!~url.indexOf('VerifyCode') || !!~url.indexOf('Login')) {
    returnInfo = process.env.LOGIN;
  } else if (!!~url.indexOf('gps/')) {
    returnInfo = process.env.GPS;
  } else if (!!~url.indexOf('fence/')) {
    returnInfo = StorageUtil.getLocalStorage('source') ? process.env.FENCE_V2 : process.env.FENCE;
  } else if (!!~url.indexOf('alarmCenter/')) {
    returnInfo = process.env.ALARM_CENTER;
  } else if (!!~url.indexOf('vehicle/manage/') || !!~url.indexOf('dispatch/manage/')) {
    returnInfo = process.env.VEHICLE;
  } else if (!!~url.indexOf('dataProcess/')) {
    returnInfo = process.env.REPORT_EXPORT;
  } else {
    returnInfo = process.env.MAIN;
  }
  return returnInfo;
}

export function createAuthHeaders() {
  const headers = { token: '' };
  const token = StorageUtil.getLocalStorage(TOKEN_NAME);
  if (token) {
    headers.token = token;
  }
  return headers;
}

export function backLoginFunction() {
  StorageUtil.removeLocalStorage(TOKEN_NAME);
  history.push('/login');
}

function errorMessageFunction(error: string) {
  ShowNotification.error(error);
}

@DepUtil.Injectable()
export class RequestService extends BaseRequestService {
  constructor() {
    super(getRootUrl, createAuthHeaders(), backLoginFunction, errorMessageFunction);
  }
}
