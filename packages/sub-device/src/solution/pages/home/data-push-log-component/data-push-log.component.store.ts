import { IDataPushLogState } from './data-push-log.interface';
import { useStateStore } from '@fch/fch-tool';
import { Form, Modal } from 'antd';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { ModalType } from '~/solution/shared/constant/common.const';
import { useEffect } from 'react';
import { SynchronLogPageListResType } from '~/solution/model/dto/customer-manage.dto';
import { ShowNotification } from '~/framework/util/common';
export function useDataPushLogStore() {
  const { state, setStateWrap, getState } = useStateStore(new IDataPushLogState());
  const [searchForm] = Form.useForm();
  const customerManageService: CustomerManageService = new CustomerManageService();

  useEffect(() => {
    initSearchForm();
  }, []);

  function initSearchForm() {
    searchForm.resetFields();
    searchForm.setFieldsValue({
      sex: -1,
      follow: -1
    });
    searchClick();
  }

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize } = getState();
    customerManageService
      .synchronLogPageList({
        ...searchForm.getFieldsValue(),
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

  function callbackAction(actionType: number, data: SynchronLogPageListResType) {
    switch (actionType) {
      case ModalType.DETAIL:
        setStateWrap({ detailVisible: true, currentData: data.contentList });
        break;
      case ModalType.SEND:
        sendSynchronData(data['id']);
        break;
      default:
        break;
    }
  }

  function handleModalCancel(isSuccess = false) {
    setStateWrap({ detailVisible: false });
    isSuccess && searchClick();
  }

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData();
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function sendSynchronData(id: string) {
    Modal.confirm({
      title: '是否确认发送消息给该金融公司？',
      onOk: () =>
        new Promise((resolve, reject) => {
          customerManageService.sendSynchronData(id).subscribe(
            (res: any) => {
              ShowNotification.success('已发送！');
              resolve(true);
            },
            (err: any) => {
              reject();
            }
          );
        })
    });
  }

  return {
    state,
    getTableData,
    searchForm,
    initSearchForm,
    handleModalCancel,
    searchClick,
    changeTablePageIndex,
    callbackAction
  };
}
