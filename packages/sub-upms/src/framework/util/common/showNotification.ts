import { notification } from 'antd';

export class ShowNotification {
  static success(info: string) {
    notification.success({
      message: '成功',
      description: info
    });
  }
  static info(info: string) {
    notification.info({
      message: '提示',
      description: info
    });
  }
  static warning(info: string) {
    notification.warning({
      message: '警告',
      description: info
    });
  }
  static error(info: string) {
    notification.error({
      message: '错误',
      description: info
    });
  }
}
