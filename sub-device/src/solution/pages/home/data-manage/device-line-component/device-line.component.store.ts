import { IDeviceLineState } from './device-line.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ModalType } from '~shared/constant/common.const';
import { useEffect } from 'react';
import { Form } from 'antd';
import { DeviceTypeService } from '~/solution/model/services/device-type.service';
import { ShowNotification } from '~/framework/util/common';
import { useHistory } from 'react-router-dom';
import { Subscription } from 'rxjs';
export function useDeviceLineStore() {
  const { state, setStateWrap } = useStateStore(new IDeviceLineState());
  const deviceTypeService: DeviceTypeService = new DeviceTypeService();
  let queryDevicePagedListSubscribable: Subscription;
  const history = useHistory();
  const [form] = Form.useForm();
  useEffect(() => {
    getTableData();
    return () => {
      queryDevicePagedListSubscribable && queryDevicePagedListSubscribable.unsubscribe();
    };
  }, []);

  function getTableData() {
    const { searchForm } = state;
    setStateWrap({ isLoading: true });
    queryDevicePagedListSubscribable = deviceTypeService.queryDevicePagedList(searchForm).subscribe(
      (res: any) => {
        const { dataList = [], total = 0 } = res;
        setStateWrap({ tableData: dataList, total: total, isLoading: false });
      },
      err => {
        setStateWrap({ isLoading: false });
        ShowNotification.error(err);
      }
    );
  }
  function getFlowNode(data: any) {
    setStateWrap({
      currentData: data,
      routeModalVisible: true
    });
  }
  function onChange(value: any, valueType: string) {
    const { searchForm } = state;
    setStateWrap({
      searchForm: {
        ...searchForm,
        [valueType]: value
      }
    });
  }
  function searchClick() {
    const { searchForm } = state;
    searchForm.index = 1;
    setStateWrap({ searchForm });
    getTableData();
  }
  function searchClean() {
    const initParams = {
      index: 1,
      size: 10,
      state: -1,
      code: ''
    };
    form.resetFields();

    setStateWrap({
      searchForm: initParams
    });
    const setState = new Promise((reslove, reject) => {
      setStateWrap({
        searchForm: initParams
      });
      reslove();
    });
    setState.then((res: any) => {
      getTableData();
    });
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    searchForm.index = index;
    searchForm.size = pageSize;
    setStateWrap({ searchForm });
    getTableData();
  }

  function handleModalCancel() {
    setStateWrap({ visibleModal: false, routeModalVisible: false });
  }
  function openModal(type: ModalType) {
    switch (type) {
      default:
        break;
    }
  }
  return {
    state,
    form,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    onChange,
    searchClean,
    getFlowNode
  };
}