import { IEditDepartmentState } from './edit-department.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { FormInstance } from 'antd/lib/form';
import { DepartmentManageService } from '~/solution/model/services/department-manage.service';
import { Subscription } from 'rxjs';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';

export function useEditDepartmentStore(props: any, form: FormInstance) {
  const { state, setStateWrap } = useStateStore(new IEditDepartmentState());
  const departmentManageService = useService(DepartmentManageService);

  function initForm() {
    const info = props.info;
    if (props.isEdit) {
      form.setFieldsValue({
        name: info.name,
        instruction: info.instruction,
        state: info.state
      });
    } else {
      form.setFieldsValue({
        state: true
      });
    }
  }
  function selfClose() {
    props.close && props.close();
  }
  function selfSubmit(values: Record<string, any>) {
    console.log(values);
    setStateWrap({ confirmLoading: true });
    if (props.isEdit) {
      departmentManageService.setDepartment({ ...values, id: props.info.id }).subscribe(
        (res: any) => {
          setStateWrap({ confirmLoading: false });
          ShowNotification.success('编辑成功！');
          form.resetFields();
          selfClose();
        },
        (err: any) => {
          setStateWrap({ confirmLoading: false });
          ShowNotification.error(err);
        }
      );
    } else {
      departmentManageService.addDepartment({ ...values }).subscribe(
        (res: any) => {
          setStateWrap({ confirmLoading: false });
          ShowNotification.success('添加成功！');
          form.resetFields();
          selfClose();
        },
        (err: any) => {
          setStateWrap({ confirmLoading: false });
          ShowNotification.error(err);
        }
      );
    }
  }
  function selectOrganization(value: string, option: Record<string, any>) {
    form.setFieldsValue({ parentOrganizationId: value, parentDepartmentId: '' });
    setStateWrap({ parentCode: value ? option.info.code : '' });
  }
  useEffect(() => {
    initForm();
  }, [props.visible]);
  return { state, selfClose, selfSubmit, selectOrganization };
}
