import { IAddWarehouseState } from './add-warehouse.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useRef, useContext } from 'react';
import { Form } from 'antd';
import { WarehouseListManageContext } from '../warehouse-list.component';
import { setModalvisible } from '../warehouse-list-redux/warehouse-list-action';
import { AddWarehouseParams } from '~/solution/model/dto/warehouse-list.dto';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { ShowNotification } from '~/framework/util/common';

export function useAddWarehouseStore() {
  const { state, setStateWrap } = useStateStore(new IAddWarehouseState());
  const { dispatch } = useContext(WarehouseListManageContext);
  const formData = useRef(new AddWarehouseParams());
  const warehouseListService = useRef(new WarehouseListService());
  const [form] = Form.useForm();
  function handleOk() {
    setStateWrap({
      confirmLoading: true
    });
    form
      .validateFields()
      .then(value => {
        console.log(formData.current);

        addWarehouse({ ...value, ...formData.current });
      })
      .catch(error => {
        console.log(error);
        setStateWrap({
          confirmLoading: false
        });
      });
  }

  // 添加仓库的网络请求
  function addWarehouse(formInfo: AddWarehouseParams) {
    warehouseListService.current.insertStore(formInfo).subscribe(
      res => {
        setStateWrap({
          confirmLoading: false
        });
        // 关闭的时候销毁当前的modal
        ShowNotification.success('创建仓库成功');
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
    setModalvisible({ modal: 'addWarehousevisible', value: false }, dispatch);
  }

  // 设置当前的地址信息
  function setAreaInfo(value: any, selectedOptions: any) {
    console.log(selectedOptions);

    if (selectedOptions.length >= 3) {
      form.setFieldsValue({ areaCode: selectedOptions[2].value });
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
    const { name, code } = options.info;
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
    form.setFieldsValue({ personId: valueInfo });
  }
  return { state, handleCancel, handleOk, form, getCurrentSelectInfo, setAreaInfo, getCurrentSelectAdmin };
}
