const DAY_RANGE = 86400;
const HOUR_RANGE = 3600;
const MINUTE_RANGE = 60;
const SECOND_RANGE = 1;

export function formatStayTime(time: number) {
  let day;
  let hour;
  let minute;
  let second;
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
}
