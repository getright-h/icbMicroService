import { IAddOrganizationState, IAddOrganizationProps } from './add-organization.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useContext, useRef } from 'react';
import { Form } from 'antd';
import { OrganizationManageService } from '~/solution/model/services/organization-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export function useAddOrganizationStore(props: IAddOrganizationProps) {
  const { gState }: IGlobalState = useContext(GlobalContext);
  const { visible, id } = props;
  const { state, setStateWrap } = useStateStore(new IAddOrganizationState());
  const organizationManageService = useService(OrganizationManageService);
  const [organizationForm] = Form.useForm();
  const areaInfoRef = useRef({});

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
        const extra = res.extendAttributionModel;
        areaInfoRef.current = {
          province: extra.province,
          city: extra.city,
          area: extra.area
        };
        organizationForm.setFieldsValue({
          ...res,
          ...res.extendAttributionModel,
          province: extra.province ? extra.province.split(',')[0] : null,
          city: extra.province ? extra.city.split(',')[0] : null,
          area: extra.province ? extra.area.split(',')[0] : null
        });
        setStateWrap({
          formInfo: {
            systemCode: '',
            typeId: res.typeId,
            parentName: extra.parentName,
            parentCode: extra.parentCode,
            id: res.id
          },
          fileList: extra.logoUrl
            ? [
                {
                  url: extra.logoUrl,
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
    const submitForm = {
      ...values,
      ...state.formInfo,
      ...areaInfoRef.current
    };
    console.log('submit', submitForm);

    if (props.isEdit) {
      organizationManageService.setOrganization(submitForm).subscribe(
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
      organizationManageService.insertOrganization(submitForm).subscribe(
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

  function changeOrgType(value: any) {
    const { formInfo } = state;
    formInfo.typeId = value;
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
    organizationManageService.queryOrganizationTypeListBySystemId(gState.myInfo.systemId).subscribe(
      (res: any) => {
        setStateWrap({ typeList: res });
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }

  // 兼容权限网关省市区格式
  function handleAreaChange(curType: string, option?: any) {
    const arr = ['province', 'city', 'area'];
    const values = organizationForm.getFieldsValue();

    arr.forEach((type, index) => {
      if (type === curType) {
        areaInfoRef.current[curType] = option ? `${option.value},${option.children}` : null;
        const newArr = arr.slice(index + 1);

        newArr.forEach(clearType => {
          areaInfoRef.current[clearType] = null;
          values[clearType] && (values[clearType] = null);
        });
      }
    });
    console.log('handleAreaChange', areaInfoRef.current, values);

    organizationForm.setFieldsValue({ ...values });
  }

  return {
    state,
    organizationForm,
    onSubmit,
    handleFormDataChange,
    getProvinceList,
    getCityList,
    getAreaList,
    getTypeList,
    changeOrgType,
    handleAreaChange
  };
}
