import { ShowNotification } from '@fch/fch-shop-web';
import * as React from 'react';
import { IMAP } from './map.util';

const REG_LONGITUDE = /^[\-\+]?(0(\.\d+)?|([1-9](\d)?)(\.\d+)?|1[0-7]\d{1}(\.\d+)?|180(\.0+)?)$/;
const REG_LATITUDE = /^[\-\+]?(\d(\.\d+)?|([1-8]\d)(\.\d+)?|90(\.0+)?)$/;

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

  async formatAddress(dataList: any[]): Promise<any[]> {
    return new Promise(async (resolve: any, reject: any) => {
      if (Array.isArray(dataList) && dataList.length > 0) {
        const errIndexArr: number[] = [];
        const lnglats: any[] = [];
        dataList.forEach((o, i) => {
          if (
            (o.longitude == 0 && o.latitude == 0) ||
            !new RegExp(REG_LONGITUDE).test(o.longitude) ||
            !new RegExp(REG_LATITUDE).test(o.latitude)
          ) {
            errIndexArr.push(i);
          } else {
            const format = IMAP.initLonlat(o.longitude, o.latitude);
            o.longitude = format[0];
            o.latitude = format[1];
            lnglats.push(format);
          }
        });
        await IMAP.covertLnglatsToAddress(lnglats).then(
          (res: any) => {
            let ii = 0;
            dataList.forEach((o, i) => {
              if (!errIndexArr.includes(i)) {
                o.address = res[ii]?.formattedAddress;
                ii++;
              }
            });
          },
          // (err: any) => {
          //   ShowNotification.error(err);
          // }
        );
      }
      resolve(dataList);
    });
    // return new Promise(async (resolve: any, reject: any) => {
    //   if (Array.isArray(dataList)) {
    //     for (const item of dataList) {
    //       const { latitude, longitude } = item;
    //       if (latitude && longitude) {
    //         await IMAP.covertPointToAddress(IMAP.initLonlat(longitude, latitude)).then(
    //           (res: any) => {
    //             item.address = res;
    //           },
    //           (err: any) => {
    //             item.address = undefined;
    //           }
    //         );
    //       }
    //     }
    //     resolve(dataList);
    //   }
    // });
  },

  linkToMapWithLnglat(lng: string, lat: string) {
    return lng && lat ? (
      <a
        target="_blank"
        href={`https://uri.amap.com/marker?position=${lng},${lat}`}
        rel="noreferrer"
      >{`${lng},${lat}`}</a>
    ) : (
      '-'
    );
  }
};
