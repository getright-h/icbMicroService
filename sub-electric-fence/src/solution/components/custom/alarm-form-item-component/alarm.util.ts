import { message } from 'antd';
import { AlarmTypeItem } from './alarm-form-item.interface';

export function validateAlarmItems(formData: AlarmTypeItem[]): boolean {
  if (!formData.length) {
    message.warning('未填写');
    return false;
  }
  let isPass = true;
  formData.forEach(item => {
    if (!item.alarmValue) {
      isPass = false;
      message.warning(`请填写${item.alarmText}`);
      return;
    }
    if (item.alarmText === '时间段设置') {
      const parse = JSON.parse(item.alarmValue);
      console.log('parse', parse);
      parse.forEach((parseItem: Record<string, string>) => {
        if (!parseItem['Begin'] || !parseItem['End'] || !parseItem['Speed']) {
          isPass = false;
          message.warning(`请完善${item.alarmText}`);
          return;
        }
        // const reg = /^(\d+)$/;
        // if (!reg.test(parseItem['Speed'])) {
        //   isPass = false;
        //   message.warning('请填写整数速度值');
        //   return;
        // }
      });
    }
    if (item.validateFn && !item.validateFn(item.alarmValue)) {
      isPass = false;
      message.warning(`请正确填写${item.alarmText}`);
      return;
    }
  });
  return isPass;
}

// export function validateNumRange(value: any, min?: number, max?: number, isInt = true): boolean {
//   if ((min && Number(value) < min) || (max && Number(value) > max)) {
//     return false;
//   }
//   if (isInt) {
//     const reg = /^(\d+)$/;
//     return reg.test(value);
//   }
//   return true;
// }

// export function validateDecimal(value: any, decimal: number): boolean {
//   const reg = /^\d+\.\d+$/;
//   if (reg.test(value)) {
//     return value.split('.')[1].length <= decimal;
//   }
//   return true;
// }
