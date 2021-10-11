import { IMAP } from './map.util';

export const REPORT_UTIL = {
  formatStayTime(time: number) {
    const DAY_RANGE = 86400;
    const HOUR_RANGE = 3600;
    const MINUTE_RANGE = 60;
    const SECOND_RANGE = 1;
    let day, hour, minute, second;
    if (time > DAY_RANGE) {
      day = Math.floor(time / DAY_RANGE);
      hour = Math.floor((time % DAY_RANGE) / HOUR_RANGE);
      return day + ' 天 ' + (!!hour ? hour + ' 小时' : '');
    } else if (time < DAY_RANGE && time > HOUR_RANGE) {
      hour = Math.floor(time / HOUR_RANGE);
      minute = Math.floor((time % HOUR_RANGE) / MINUTE_RANGE);
      return hour + ' 小时 ' + (!!minute ? minute + ' 分' : '');
    } else if (time < HOUR_RANGE && time > MINUTE_RANGE) {
      minute = Math.floor(time / MINUTE_RANGE);
      second = Math.floor((time % MINUTE_RANGE) / SECOND_RANGE);
      return minute + ' 分 ' + (!!second ? second + ' 秒' : '');
    } else {
      return time + ' 秒';
    }
  },

  async formatAddress(dataList: any[]) {
    const fetchArrary: any[] = [];

    return new Promise(async (resolve: any, reject: any) => {
      if (Array.isArray(dataList)) {
        for (const item of dataList) {
          const { latitude, longitude } = item;
          if (latitude && longitude) {
            await IMAP.covertPointToAddress(IMAP.initLonlat(longitude, latitude)).then(
              (res: any) => {
                item.address = res;
              },
              (err: any) => {
                item.address = '';
              }
            );
          }
        }
        resolve(dataList);
      }
    });

    // try {
    //   const res = await Promise.all(fetchArrary);
    //   for (let i = 0; i < res.length; i++) {
    //     dataList[i].address = res[i];
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(dataList, 'dataList');

    return dataList;
  }
};
