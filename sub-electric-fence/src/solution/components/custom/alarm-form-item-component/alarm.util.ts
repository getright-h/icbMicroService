import { message } from 'antd';
import { AlarmTypeItem } from './alarm-form-item.interface';

export function validateAlarmItems(formData: AlarmTypeItem[]): boolean {
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
      });
    }
  });
  return isPass;
}
