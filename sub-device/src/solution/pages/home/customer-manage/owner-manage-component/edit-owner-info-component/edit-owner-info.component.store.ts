import { IEditOwnerInfoState, IEditOwnerInfoProps } from './edit-owner-info.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { useEffect } from 'react';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { ShowNotification } from '~/framework/util/common';

export function useEditOwnerInfoStore(props: IEditOwnerInfoProps) {
  const { state, setStateWrap } = useStateStore(new IEditOwnerInfoState());
  const customerManageService: CustomerManageService = new CustomerManageService();
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.id && props.visible) {
      getDetails(props.id);
      setStateWrap({ isEdit: true });
    }
  }, [props.id, props.visible]);

  function getDetails(id: string) {
    customerManageService.getOwnerDetail(id).subscribe(res => {
      form.setFieldsValue(res);
      const areaValues = res.areaCode ? [res.provinceCode, res.cityCode, res.areaCode] : undefined;
      const areaInfo = {
        provinceCode: res.provinceCode,
        provinceName: res.provinceName,
        cityCode: res.cityCode,
        cityName: res.cityName,
        areaCode: res.areaCode,
        areaName: res.areaName
      };
      setStateWrap({ areaValues, areaInfo });
    });
  }

  function toggleShowMore() {
    setStateWrap({ hasMore: !state.hasMore });
  }

  function selfSubmit(values: any) {
    setStateWrap({ confirmLoading: true });
    const confirmForm = {
      ...values,
      ...state.areaInfo
    };
    if (state.isEdit) {
      customerManageService.updateOwner({ id: props.id, ...confirmForm }).subscribe(
        res => {
          ShowNotification.success('编辑车主成功！');
          setStateWrap({ confirmLoading: false });
          selfClose();
        },
        err => {
          setStateWrap({ confirmLoading: false });
        }
      );
    } else {
      customerManageService.insertOwner(confirmForm).subscribe(
        res => {
          ShowNotification.success('新增车主成功！');
          setStateWrap({ confirmLoading: false });
          selfClose(true);
        },
        err => {
          setStateWrap({ confirmLoading: false });
        }
      );
    }
  }

  function selfClose(isSuccess = false) {
    setStateWrap({
      areaValues: [],
      areaInfo: {}
    });
    form.resetFields();
    props?.close(isSuccess);
  }

  function setAreaInfo(values: string[], options: any[]) {
    if (options.length === 3) {
      const areaInfo = {
        provinceCode: options?.[0].value,
        provinceName: options?.[0].label,
        cityCode: options?.[1].value,
        cityName: options?.[1].label,
        areaCode: options?.[2].value,
        areaName: options?.[2].label
      };
      setStateWrap({
        areaValues: values,
        areaInfo
      });
    }
  }

  return { state, form, toggleShowMore, selfSubmit, selfClose, setAreaInfo };
}
