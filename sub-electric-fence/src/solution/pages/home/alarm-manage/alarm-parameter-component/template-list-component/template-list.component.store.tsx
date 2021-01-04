import React from 'react';
import { ITemplateListProps, ITemplateListState } from './template-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form, message, Modal } from 'antd';
import { AlarmManageService } from '~/solution/model/services/alarm-manage.service';
import { MutableRefObject, useEffect, useRef } from 'react';
import { AlarmTypeItem } from '~/solution/components/custom/alarm-form-item-component/alarm-form-item.interface';
import { validateAlarmItems } from '~/solution/components/custom/alarm-form-item-component/alarm.util';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AlarmPackageContent } from '~/solution/model/dto/alarm-manage.dto';

export function useTemplateListStore(props: ITemplateListProps) {
  const { state, setStateWrap } = useStateStore(new ITemplateListState());
  const alarmManageService: AlarmManageService = new AlarmManageService();
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
    // 直接在父级获取模板信息
    alarmManageService.queryTemplatePackageDetail(id).subscribe(res => {
      setStateWrap({ selectTempId: id, tempalteValue: res || [], isCurTempDefault: res[0].isDefault });
    });
  }

  function submitTemplate() {
    setStateWrap({ tempalteValue: formInfoRef.current });
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

  function deleteAlarmTemplate(template: AlarmPackageContent) {
    Modal.confirm({
      title: `确定删除模板“${template.alarmValue}”吗？`,
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      onOk() {
        new Promise((resolve, reject) => {
          alarmManageService.deleteTemplatePackage(template.groupId).subscribe(
            res => {
              message.success('删除模板成功！');
              setStateWrap({ selectTempId: null });
              initTemplateList(props.info.id);
              resolve(true);
            },
            err => {
              reject();
            }
          );
        });
      }
    });
  }

  return { state, selfClose, selectTemplate, submitTemplate, getFormInfo, deleteAlarmTemplate };
}
