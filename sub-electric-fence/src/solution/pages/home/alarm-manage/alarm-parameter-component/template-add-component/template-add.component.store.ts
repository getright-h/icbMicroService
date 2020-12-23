import { ITemplateAddProps, ITemplateAddState } from './template-add.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form, message } from 'antd';
import { useRef } from 'react';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
import { validateAlarmItems } from '~/solution/components/custom/alarm-form-item-component/alarm.util';

export function useTemplateAddStore(props: ITemplateAddProps) {
  const { state, setStateWrap } = useStateStore(new ITemplateAddState());
  const alarmManageService: AlarmManageService = new AlarmManageService();
  const formInfoRef = useRef([]);

  function getFormInfo(formInfo: any[]) {
    formInfoRef.current = formInfo;
  }

  function selfClose(isSuccess = false) {
    props?.close(isSuccess);
  }

  function selfSubmit() {
    if (validateAlarmItems(formInfoRef.current)) {
      setStateWrap({ confirmLoading: true });
      alarmManageService.insertAlarmTemplatePackage(formInfoRef.current).subscribe(
        res => {
          message.success('新增模板成功！');
          setStateWrap({ confirmLoading: false });
          selfClose(true);
        },
        err => {
          setStateWrap({ confirmLoading: false });
        }
      );
    }
  }

  return { state, selfClose, selfSubmit, getFormInfo };
}
