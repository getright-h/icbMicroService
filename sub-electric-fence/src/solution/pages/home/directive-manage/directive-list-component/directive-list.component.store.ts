import { IDirectiveListState, ModalType } from './directive-list.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { DirectiveService } from '~/solution/model/services/directive-manage.service';
import { useEffect } from 'react';
import moment from 'moment';
import { Subscription } from 'rxjs';
export function useDirectiveListStore() {
  const { state, setStateWrap, getState } = useStateStore(new IDirectiveListState());
  const directiveService: DirectiveService = new DirectiveService();
  const [searchForm] = Form.useForm();
  let getCmdListSubscription: Subscription;

  const params = {
    endTime: moment().valueOf(),
    beginTime: moment()
      .subtract(10, 'days')
      .valueOf()
  };
  useEffect(() => {
    initSearchForm();
    return () => {
      getCmdListSubscription && getCmdListSubscription.unsubscribe();
    };
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    const { pageIndex, pageSize } = getState();
    getCmdListSubscription = directiveService
      .getCmdList({
        ...searchForm.getFieldsValue(),
        index: pageIndex,
        size: pageSize,
        ...params
      })
      .subscribe(
        res => {
          setStateWrap({ tableData: res.data, total: res.total, isLoading: false });
        },
        err => {
          setStateWrap({ isLoading: false });
        }
      );
  }

  function searchClick() {
    setStateWrap({ pageIndex: 1 });
    getTableData();
  }

  function initSearchForm() {
    searchForm.resetFields();
    searchClick();
  }

  function callbackAction<T>(actionType: number, data?: any) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.CREATE:
        setStateWrap({});
        break;
      case ModalType.EDIT:
        setStateWrap({});
        break;
      case ModalType.PATCH:
        setStateWrap({ patchModalVisible: true });
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
    setStateWrap({
      patchModalVisible: false
    });
    isSuccess && searchClick();
  }

  function getCurrentSelectInfo(value: any, option: any, type: string) {
    if (type == 'dateRange' && Array.isArray(value) && value.length) {
      value[0] && (params.beginTime = new Date(value[0]).getTime());
      value[1] && (params.endTime = new Date(value[1]).getTime());
      return;
    }
    const { info = {} } = option;
    if (type == 'directiveType') {
      searchForm.setFieldsValue({ cmdCode: info?.cmdCode });
    }
  }
  return {
    state,
    searchForm,
    initSearchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    getCurrentSelectInfo
  };
}
