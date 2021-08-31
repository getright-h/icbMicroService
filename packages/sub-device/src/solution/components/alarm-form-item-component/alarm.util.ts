import { message } from 'antd';
import { AlarmPackageContent } from '~/solution/model/dto/alarm-manage.dto';

export function validateAlarmItems(formData: AlarmPackageContent[]): boolean {
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
