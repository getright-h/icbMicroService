import { IAddOrganizationState, IAddOrganizationProps } from './add-organization.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { Form } from 'antd';
import { OrganizationManageService } from '~/solution/model/services/organization-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { StorageUtil } from '~/framework/util/storage';

const SYSTEMID = StorageUtil.getLocalStorage('systemId');

export function useAddOrganizationStore(props: IAddOrganizationProps) {
  const { visible, id } = props;
  const { state, setStateWrap } = useStateStore(new IAddOrganizationState());
  const organizationManageService = useService(OrganizationManageService);
  const [organizationForm] = Form.useForm();

  useEffect(() => {
    getTypeList();
  }, []);

  useEffect(() => {
    if (id && visible) {
      getDetails(id);
    }
  }, [id && visible]);

  /**
   * @param id 查询机构详情
   */
  function getDetails(id: string) {
    organizationManageService.getOrganizationDetail(id).subscribe(
      (res: any) => {
        organizationForm.setFieldsValue({ ...res, ...res.extendAttributionModel });
        setStateWrap({
          formInfo: {
            systemCode: '',
            parentName: res.extendAttributionModel.parentName,
            parentCode: res.extendAttributionModel.parentCode,
            id: res.id
          },
          fileList: res.extendAttributionModel.logoUrl
            ? [
                {
                  url: res.extendAttributionModel.logoUrl,
                  uid: '0',
                  type: 'image/jpg',
                  status: 'done'
                }
              ]
            : []
        });
        getProvinceList();
        getCityList();
        getAreaList();
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }

  /**
   * @param values 提交机构信息
   */
  function onSubmit(values: Record<string, any>) {
    setStateWrap({ confirmLoading: true });
    if (props.isEdit) {
      organizationManageService.setOrganization({ ...values, ...state.formInfo }).subscribe(
        (res: any) => {
          ShowNotification.success('编辑机构成功');
          setStateWrap({ confirmLoading: false });
          props.close(true);
        },
        (err: string) => {
          setStateWrap({ confirmLoading: false });
          ShowNotification.error(err);
        }
      );
    } else {
      organizationManageService.insertOrganization({ ...values, ...state.formInfo }).subscribe(
        (res: any) => {
          ShowNotification.success('添加机构成功！');
          setStateWrap({ confirmLoading: false });
          props.close(true);
        },
        (err: string) => {
          setStateWrap({ confirmLoading: false });
          ShowNotification.error(err);
        }
      );
    }
  }

  /**
   *
   * @param value 表单项获取值
   * @param name 表单项字段名
   * @param option 表单项获取额外信息
   */
  function handleFormDataChange(value: string, option?: Record<string, any>) {
    const { formInfo } = state;
    organizationForm.setFieldsValue({ parentId: value });
    formInfo.parentCode = value ? option.info.code : '';
    formInfo.parentName = value ? option.info.name : '';
    setStateWrap({ formInfo });
  }

  /**
   * 获取省下拉列表
   */
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
  /**
   * 获取市下拉列表
   */
  function getCityList() {
    organizationManageService.getAreaListByCode(organizationForm.getFieldValue('province')).subscribe(
      (res: any) => {
        setStateWrap({ cityList: res });
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }
  /**
   * 获取区下拉列表
   */
  function getAreaList() {
    organizationManageService.getAreaListByCode(organizationForm.getFieldValue('city')).subscribe(
      (res: any) => {
        setStateWrap({ areaList: res });
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }
  /**
   * 获取机构类型下拉列表
   */
  function getTypeList() {
    organizationManageService.queryOrganizationTypeListBySystemId(SYSTEMID).subscribe(
      (res: any) => {
        setStateWrap({ typeList: res });
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }
  return {
    state,
    organizationForm,
    onSubmit,
    handleFormDataChange,
    getProvinceList,
    getCityList,
    getAreaList,
    getTypeList
  };
}
