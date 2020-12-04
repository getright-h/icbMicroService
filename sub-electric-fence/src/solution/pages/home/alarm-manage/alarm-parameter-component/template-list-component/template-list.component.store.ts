import { ITemplateListProps, ITemplateListState } from './template-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form, message } from 'antd';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
import { MutableRefObject, useEffect, useRef } from 'react';
import { AlarmTypeItem } from '~/solution/components/custom/alarm-form-item-component/alarm-form-item.interface';
import { validateAlarmItems } from '~/solution/components/custom/alarm-form-item-component/alarm.util';

export function useTemplateListStore(props: ITemplateListProps) {
  const { state, setStateWrap } = useStateStore(new ITemplateListState());
  const alarmManageService: AlarmManageService = new AlarmManageService();
  const [form] = Form.useForm();
  const formInfoRef: MutableRefObject<AlarmTypeItem[]> = useRef(null);

  useEffect(() => {
    props.info && initTemplateList(props.info.id);
  }, []);

  function initTemplateList(id: string) {
    alarmManageService.queryTemplatePackageList(id).subscribe(res => {
      setStateWrap({ templateList: res });
    });
  }

  function selfClose() {
    props?.close();
  }

  function selectTemplate(id: string) {
    setStateWrap({ selectTempId: id });
  }

  function submitTemplate() {
    console.log('submitTemplate', formInfoRef.current);
    if (validateAlarmItems(formInfoRef.current)) {
      setStateWrap({ confirmLoading: true });
      alarmManageService.setAlarmTemplatePackage(formInfoRef.current).subscribe(
        res => {
          message.success('修改模板成功！');
          setStateWrap({ confirmLoading: false, selectTempId: null });
        },
        err => {
          setStateWrap({ confirmLoading: false });
        }
      );
    }
  }

  function getFormInfo(formInfo: AlarmTypeItem[]) {
    formInfoRef.current = formInfo;
  }

  return { state, form, selfClose, selectTemplate, submitTemplate, getFormInfo };
}
