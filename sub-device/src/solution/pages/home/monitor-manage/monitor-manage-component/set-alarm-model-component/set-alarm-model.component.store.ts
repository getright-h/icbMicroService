import { EditAlarmTemplateItem, IAddMonitorGroupState, ISetAlarmProp } from './set-alarm-model.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { MutableRefObject, useEffect, useRef } from 'react';
import { Form, message } from 'antd';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
import { AlarmConfig, AlarmParamItem } from '~/solution/model/dto/alarm-manage.dto';
import { validateAlarmItems } from '~/solution/components/alarm-form-item-component/alarm.util';
import { ShowNotification } from '~/framework/util/common';
import { AlarmPushModeEnum } from '~/solution/shared/constant/alarm.const';

export function useSetAlarmStore(props: ISetAlarmProp) {
  const { state, setStateWrap } = useStateStore(new IAddMonitorGroupState());
  const alarmManageService: AlarmManageService = useService(AlarmManageService);
  const [form] = Form.useForm();
  const pushTypeArr = ['isPlatFormPush', 'isMessagePush', 'isWeChatPush'];
  const templateListRef: MutableRefObject<EditAlarmTemplateItem[]> = useRef(null);
  const submitFormRef: MutableRefObject<AlarmConfig> = useRef(null);

  useEffect(() => {
    props.data && getAlarmParamTemplates();
  }, []);

  function getAlarmParamTemplates() {
    alarmManageService.queryAlarmParamList().subscribe(res => {
      getAlarmConfigDetail(res);
    });
  }

  function getAlarmConfigDetail(alarmParamList: AlarmParamItem[]) {
    alarmManageService.queryAlarmConfig(props.data.id).subscribe(res => {
      // 推送类型
      const pushTypes: string[] = [];
      pushTypeArr.forEach(type => {
        res[type] && pushTypes.push(type);
      });
      form.setFieldsValue({ pushTypes });
      // 报警参数
      templateListRef.current = res.templateList.map(template => {
        const curSelectTemp = template.packageList.length && template.packageList.find(item => item.isSelected);
        const alarmParamTemp = alarmParamList.find(item => item.type === template.code);
        return {
          ...template,
          curSelectTemp,
          childList: alarmParamTemp ? alarmParamTemp.childList : null
        };
      });
      console.log('templateList', templateListRef.current);

      setStateWrap({ templateList: templateListRef.current });
    });
  }

  function switchTemplate(checked: boolean, curTemplate: EditAlarmTemplateItem) {
    templateListRef.current.map(template => {
      if (template.id === curTemplate.id) {
        template.isTemplateSelected = checked;
        !checked && (template.curSelectTemp = null);
      }
    });
    setStateWrap({ templateList: templateListRef.current });
  }

  function selectTemplate(value: string, curTemplate: EditAlarmTemplateItem) {
    templateListRef.current.map(template => {
      if (template.id === curTemplate.id) {
        template.curSelectTemp = { ...template.packageList.find(item => item.id == value) };
        template.curSelectTemp.isSelected = true;
      }
    });
    setStateWrap({ templateList: templateListRef.current });
  }

  function handleFormChange(formInfo: any, curTemplate: EditAlarmTemplateItem) {
    templateListRef.current.map(template => {
      if (template.id === curTemplate.id) {
        template.curSelectTemp.content = formInfo;
      }
    });
  }

  function validateSelectTemplate(template: EditAlarmTemplateItem): boolean {
    let isPass = true;
    if (!template.curSelectTemp && template.isTemplateSelected && template.isParam) {
      message.warning(`请选择${template.name}的参数`);
      isPass = false;
    }
    return isPass;
  }

  function close() {
    form.resetFields();
    props.close && props.close();
  }

  function setAlarm() {
    console.log('prop', props.data);

    setStateWrap({ submitLoading: true });
    let isPass = true;
    let selectNum = 0;
    // 处理推送类型
    let pushMode = 0;
    const pushTypes: string[] = form.getFieldValue('pushTypes');
    pushTypes.map(item => {
      pushMode += AlarmPushModeEnum[item];
    });

    // 处理报警参数及验证
    templateListRef.current.map(template => {
      template.isTemplateSelected && selectNum++;
      if (!validateSelectTemplate(template)) {
        isPass = false;
        return;
      }
      template.packageList.map(packageItem => {
        if (template.curSelectTemp && packageItem.id === template.curSelectTemp.id) {
          if (!validateAlarmItems(template.curSelectTemp.content)) {
            isPass = false;
            return;
          }
          Object.assign(packageItem, template.curSelectTemp);
        } else {
          packageItem.isSelected = false;
        }
      });
    });
    if (!selectNum) {
      message.warning('未选择任何报警类型，无法开启报警');
    }

    submitFormRef.current = { id: props.data.id, pushMode, type: 1, templateList: templateListRef.current };

    if (isPass && selectNum) {
      alarmManageService.setAlarmConfig(submitFormRef.current).subscribe(res => {
        ShowNotification.success('设置成功');
        setStateWrap({ submitLoading: false });
        close();
      }, err => {
        setStateWrap({ submitLoading: false });
      });
    } else {
      setStateWrap({ submitLoading: false });
    }
  }

  return { state, form, setAlarm, close, switchTemplate, selectTemplate, handleFormChange };
}
