import * as React from 'react';
import { IMainFenceLeftState, IMainFenceLeftProps } from './main-fence-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';
const { confirm } = Modal;
export function useMainFenceLeftStore(props: IMainFenceLeftProps) {
  const { state, setStateWrap, getState } = useStateStore(new IMainFenceLeftState());
  const fenceManageService = new FenceManageService();
  const { searchForm } = state;
  const { editPopShow } = props;

  useEffect(() => {
    getFenceList();
  }, []);
  function callbackAction(actionType: number, data: FenceManageListReturnModal) {
    switch (actionType) {
      case ACTION_TYPE.EDIT:
        editPopShow(data);
        break;
      case ACTION_TYPE.DELETE:
        showConfirm(data.id);
        break;
      default:
        break;
    }
  }

  function showConfirm(id: string) {
    confirm({
      title: '是否删除',
      icon: <ExclamationCircleOutlined />,
      content: '确认要删除该围栏',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        confirmDeleteFence(id);
      },
      onCancel() {
        console.log('取消');
      }
    });
  }

  function confirmDeleteFence(id: string) {
    fenceManageService.fenceDelete({ id }).subscribe(res => {
      searchClick();
    });
  }

  function getFenceList() {
    fenceManageService.fenceList(getState().searchForm).subscribe(res => {
      setStateWrap({
        tableData: res.data,
        total: res.total
      });
    });
  }

  function onValueChange(key: string, event: any) {
    setStateWrap({
      searchForm: { ...searchForm, name: event.target.value }
    });
  }

  function searchClick() {
    setStateWrap({
      searchForm: { ...searchForm, index: 1 }
    });
    getFenceList();
  }

  function changeTablePageIndex(index: number) {
    setStateWrap({
      searchForm: { ...searchForm, index }
    });
    getFenceList();
  }
  return { state, callbackAction, changeTablePageIndex, searchClick, onValueChange };
}
