import { DurationField, IDurationSettingProps, IDurationSettingState } from './duration-setting.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useDurationSettingStore(props: IDurationSettingProps) {
  const { state, setStateWrap } = useStateStore(new IDurationSettingState());

  useEffect(() => {
    initDurationFields();
  }, []);

  function initDurationFields() {
    const { initialFields } = props;
    const durationFields: DurationField[] = [];
    if (initialFields && initialFields.length) {
      initialFields.map(field => {
        durationFields.push({
          fieldId: createRandomId(),
          ...field
        });
      });
    } else {
      durationFields.push({
        fieldId: createRandomId()
      });
    }

    setStateWrap({ durationFields });
    props.getFieldsChange(durationFields);
  }

  function addField() {
    const { durationFields } = state;
    durationFields.push({
      fieldId: createRandomId()
    });
    setStateWrap({ durationFields });
    props.getFieldsChange(durationFields);
  }

  function removeField(index: number) {
    const { durationFields } = state;
    const newFields: DurationField[] = [];
    durationFields.splice(index, 1);
    if (durationFields.length) {
      durationFields.forEach(item => {
        newFields.push({ ...item });
      });
    } else {
      newFields.push({
        fieldId: createRandomId()
      });
    }
    setStateWrap({ durationFields: newFields });
    props.getFieldsChange(newFields);
  }

  function changeFieldValue(index: number, type: string, value: string | number) {
    const { durationFields } = state;
    durationFields[index][type] = value;
    setStateWrap({ durationFields });
    props.getFieldsChange(durationFields);
  }

  function createRandomId() {
    return (
      (Math.random() * 10000000).toString(16).substr(0, 4) +
      '-' +
      new Date().getTime() +
      '-' +
      Math.random()
        .toString()
        .substr(2, 5)
    );
  }

  return { state, addField, removeField, changeFieldValue };
}
