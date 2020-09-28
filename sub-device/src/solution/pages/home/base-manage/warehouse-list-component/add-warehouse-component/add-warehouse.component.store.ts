import { IAddWarehouseState, IAddWarehouseProps } from './add-warehouse.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useRef, useEffect } from 'react';
import { Form } from 'antd';
import { AddWarehouseParams } from '~/solution/model/dto/warehouse-list.dto';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { ShowNotification } from '~/framework/util/common';

export function useAddWarehouseStore(props: IAddWarehouseProps) {
  const { state, setStateWrap } = useStateStore(new IAddWarehouseState());
  const formData = useRef(new AddWarehouseParams());
  const warehouseListService = useRef(new WarehouseListService());
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.warehouseId) {
      getWarehouseDetail();
    }
  }, [props.warehouseId]);

  // 获取仓库详情用于编辑
  function getWarehouseDetail() {
    warehouseListService.current.getStoreDetail({ id: props.warehouseId }).subscribe(res => {
      const { provinceCode, cityCode, areaCode, personName, organizationName } = res;
      const areaDetail = [provinceCode, cityCode, areaCode];
      res.minAlarm = res.minAlarm == -1 ? '' : res.minAlarm;
      res.maxAlarm = res.maxAlarm == -1 ? '' : res.maxAlarm;
      form.setFieldsValue({ ...res, areaDetail });
      formData.current = res;
      setStateWrap({
        editOrganizationName: organizationName,
        editmanageName: personName,
        areaDetail
      });
    });
  }

  // 确定创建
  function handleOk() {
    setStateWrap({
      confirmLoading: true
    });
    form
      .validateFields()
      .then(value => {
        addWarehouse({ ...formData.current, ...value });
      })
      .catch(() => {
        setStateWrap({
          confirmLoading: false
        });
      });
  }

  // 添加仓库的网络请求
  function addWarehouse(formInfo: AddWarehouseParams) {
    const URL = props.isEdit ? 'updateStore' : 'insertStore';
    formInfo.minAlarm = formInfo.minAlarm + '' == '' ? -1 : formInfo.minAlarm;
    formInfo.maxAlarm = formInfo.maxAlarm + '' == '' ? -1 : formInfo.maxAlarm;
    warehouseListService.current[URL](formInfo).subscribe(
      res => {
        setStateWrap({
          confirmLoading: false
        });
        // 关闭的时候销毁当前的modal
        ShowNotification.success('创建仓库成功');
        // 通知父应用刷新树列表
        props.closeAddWarehouseModal(!props.isEdit);
      },
      error => {
        setStateWrap({
          confirmLoading: false
        });
      }
    );
  }

  // 关闭当前的modal
  function handleCancel() {
    props.closeAddWarehouseModal();
  }

  // 设置当前的地址信息
  function setAreaInfo(value: any, selectedOptions: any) {
    if (selectedOptions.length >= 3) {
      formData.current = {
        ...formData.current,
        provinceName: selectedOptions[0].label,
        provinceCode: selectedOptions[0].value,
        cityName: selectedOptions[1].label,
        cityCode: selectedOptions[1].value,
        areaName: selectedOptions[2].label,
        areaCode: selectedOptions[2].value
      };
    }
  }

  // 设置当前的选择的组织相关的信息内容
  function getCurrentSelectInfo(valueInfo: string, options: any) {
    const name = options && options.info.name;
    const code = options && options.info.code;
    formData.current = {
      ...formData.current,
      organizationId: valueInfo,
      organizationName: name,
      organizationCode: code
    };
    form.setFieldsValue({ organizationId: valueInfo });
  }

  // 获取当前管理人员的信息
  function getCurrentSelectAdmin(valueInfo: string, options: any) {
    const { name, telephone } = options.info;
    formData.current = {
      ...formData.current,
      personId: valueInfo,
      personName: name,
      personMobile: telephone
    };
  }
  return { state, handleCancel, handleOk, form, getCurrentSelectInfo, setAreaInfo, getCurrentSelectAdmin, formData };
}
