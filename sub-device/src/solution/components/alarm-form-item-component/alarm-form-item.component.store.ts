import {
  AlarmTypeItem,
  alarmTypeTemplates,
  IAlarmFormItemProp,
  IAlarmFormItemState,
  nameTemplate
} from './alarm-form-item.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { AlarmTypeEnum } from '~/solution/shared/constant/alarm.const';
import { DurationField } from './duration-setting-component/duration-setting.interface';

export function useAlarmFormItemStore(props: IAlarmFormItemProp) {
  const { state, setStateWrap } = useStateStore(new IAlarmFormItemState());
  const { initialInfo, hasTempName = false, selectTemp } = props;

  useEffect(() => {
    initFormInfo();
  }, []);

  function initFormInfo() {
    const formInfo = [];
    alarmTypeTemplates[initialInfo.code].forEach(item => {
      formInfo.push({ ...item, alarmTemplateId: initialInfo.id });
    });
    if (hasTempName) {
      formInfo.unshift({ ...nameTemplate, alarmTemplateId: initialInfo.id });
    }

    if (selectTemp.length) {
      formatFormData(formInfo);
    } else {
      setStateWrap({ formInfo });
      props.getFormInfo(formInfo);
    }
  }

  function formatFormData(formInfo: AlarmTypeItem[]) {
    formInfo.map((item, i) => {
      Object.assign(item, selectTemp[i]);
    });

    // 行驶报警
    let durationFields: DurationField[] = [];
    if (initialInfo.code === AlarmTypeEnum.Running) {
      durationFields = JSON.parse(
        selectTemp.find((item: { alarmKey: string }) => item.alarmKey === 'Duration').alarmValue || '[]'
      );
    }
    setStateWrap({ formInfo, durationFields });
    props.getFormInfo(formInfo);
  }

  function handleInputChange(value: any, formItem: AlarmTypeItem) {
    const formInfo = state.formInfo.map(item => {
      if (item.alarmKey == formItem.alarmKey) {
        item.alarmValue = value;
      }
      return item;
    });

    setStateWrap({ formInfo });
    props.getFormInfo(formInfo);
  }

  function durationFieldsChange(fields: DurationField[]) {
    const { formInfo } = state;
    formInfo.map(item => {
      if (item.alarmKey === 'Duration') {
        item.alarmValue = JSON.stringify(fields);
      }
    });
    props.getFormInfo(formInfo);
  }

  return { state, handleInputChange, durationFieldsChange };
}
