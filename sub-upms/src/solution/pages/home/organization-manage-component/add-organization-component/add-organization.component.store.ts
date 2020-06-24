import { IAddOrganizationState, IAddOrganizationProps } from './add-organization.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { FormInstance } from 'antd/lib/form';
import { OrganizationManageService } from '~/solution/model/services/organization-manage.service';
import { ShowNotification } from '~/framework/util/common';

export function useAddOrganizationStore(props: IAddOrganizationProps, form: FormInstance) {
  const { state, setStateWrap } = useStateStore(new IAddOrganizationState());
  const organizationManageService = useService(OrganizationManageService);
  const id = props.match.params.id;

  function getDetails(id: string) {
    organizationManageService.getOrganizationDetail(id).subscribe(
      (res: any) => {
        form.setFieldsValue({ ...res, ...res.extendAttributionModel });
        setStateWrap({
          formInfo: {
            systemCode: '',
            parentName: res.extendAttributionModel.parentName,
            parentCode: res.extendAttributionModel.parentCode,
            id: res.id
          }
        });
        console.log({ ...form.getFieldsValue(), ...state.formInfo });
        getProvinceList();
        getCityList();
        getAreaList();
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }
  function onSubmit(values: Record<string, any>) {
    if (state.isEdit) {
      console.log('编辑', { ...state.formInfo, ...values });
      organizationManageService.setOrganization({ ...values, ...state.formInfo }).subscribe(
        (res: any) => {
          ShowNotification.success('编辑机构成功');
        },
        (err: string) => {
          ShowNotification.error(err);
        }
      );
    } else {
      console.log('添加', { ...state.formInfo, ...values });
      organizationManageService.insertOrganization({ ...values, ...state.formInfo }).subscribe(
        (res: any) => {
          ShowNotification.success('添加机构成功！');
          props.history.push('/account/organizationManage');
        },
        (err: string) => {
          ShowNotification.error(err);
        }
      );
    }
  }
  function handleFormDataChange(value: string, type: string, option?: Record<string, any>) {
    const { formInfo } = state;
    switch (type) {
      case 'parentId':
        form.setFieldsValue({ parentId: value });
        console.log('form', form.getFieldsValue());
        formInfo.parentCode = value ? option.info.code : '';
        formInfo.parentName = value ? option.info.name : '';
        break;
      default:
        form.setFieldsValue({ [type]: value });
        break;
    }
    setStateWrap({ formInfo });
  }
  function getProvinceList() {
    organizationManageService.getProvinceList(1).subscribe(
      (res: any) => {
        setStateWrap({ provinceList: res });
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }
  function getCityList() {
    organizationManageService.getAreaListByCode(form.getFieldValue('province')).subscribe(
      (res: any) => {
        setStateWrap({ cityList: res });
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }
  function getAreaList() {
    organizationManageService.getAreaListByCode(form.getFieldValue('city')).subscribe(
      (res: any) => {
        setStateWrap({ areaList: res });
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }
  useEffect(() => {
    if (id) {
      const { formInfo } = state;
      formInfo.id = id;
      setStateWrap({ isEdit: true, formInfo });
      getDetails(id);
    }
    return () => {};
  }, []);
  return { state, onSubmit, handleFormDataChange, getProvinceList, getCityList, getAreaList };
}
