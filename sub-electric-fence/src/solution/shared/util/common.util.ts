import moment from 'moment';
export const formatTime = (timeInfo: any, formatType: string) => {
  timeInfo = timeInfo ? moment(new Date(Number(timeInfo))).format(formatType) : '';
  return timeInfo;
};
export const formatToUnix = (timeInfo?: any, format?: string) => {
  timeInfo = timeInfo != 'Invalid date' && Date.parse(new Date(timeInfo) + '');
  return timeInfo;
};

export function debounce(func: (value: any) => void, time: number) {
  let timeout: any = null;
  return function(value: any) {
    console.log(1);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(value);
    }, time);
  };
}

export function getUrlParamsByName() {
  try {
    const arr = (location.hash || '').split('?')[1].split('&');
    const params = {};
    for (let i = 0; i < arr.length; i++) {
      const data = arr[i].split('=');
      if (data.length === 2) {
        params[data[0]] = data[1];
      }
    }
    return params;
  } catch (error) {
    return '';
  }
}

export function getHashParameter(key: string) {
  const params = getUrlParamsByName();
  return params && params[key];
}
