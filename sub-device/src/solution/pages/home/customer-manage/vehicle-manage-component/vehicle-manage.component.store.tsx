import * as React from 'react';
import { IVehicleManageState, ModalType } from './vehicle-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { Form, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function useVehicleManageStore() {
  const { state, setStateWrap, getState } = useStateStore(new IVehicleManageState());
  const customerManageService: CustomerManageService = new CustomerManageService();
  const [searchForm] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize, timeInfo } = getState();
    customerManageService
      .queryVehiclePagedList({
        ...searchForm.getFieldsValue(),
        serverBeginTime: timeInfo[0] ? moment(timeInfo[0] + ' 00:00:00').valueOf() : 0,
        serverEndTime: timeInfo[1] ? moment(timeInfo[1] + ' 23:59:59').valueOf() : 0,
        index: pageIndex,
        size: pageSize
      })
      .subscribe(
        res => {
          setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
        },
        err => {
          setStateWrap({ isLoading: false });
        }
      );
  }

  function initSearchForm() {
    searchForm.resetFields();
    setStateWrap({ timeInfo: [] });
    searchClick();
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function callbackAction(actionType: number, data?: any) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.CREATE:
        history.push('/home/customer/addVehicle');
        break;
      case ModalType.DETAIL:
        history.push(`/home/customer/vehicleDetail/${data.id}`);
        break;
      case ModalType.DELETE:
        Modal.confirm({
          title: '是否确认删除该车辆？',
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              customerManageService.deleteVehicle(data.id).subscribe(
                (res: any) => {
                  ShowNotification.success('已删除！');
                  searchClick();
                  resolve();
                },
                (err: any) => {
                  reject();
                }
              );
            })
        });
        break;
      case ModalType.UNBIND:
        setStateWrap({ isUnbindDevice: true, unbindInfo: data });
        break;
      default:
        break;
    }
  }

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData();
  }

  function handleModalCancel(isSuccess = false) {
    setStateWrap({ isUnbindDevice: false });
    isSuccess && searchClick();
  }

  function onSelectRows(selectedRowKeys: any) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
  }

  function getDateTimeInfo(timeInfo: any) {
    setStateWrap({ timeInfo });
  }
  return {
    state,
    searchForm,
    initSearchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    onSelectRows,
    getDateTimeInfo
  };
}
