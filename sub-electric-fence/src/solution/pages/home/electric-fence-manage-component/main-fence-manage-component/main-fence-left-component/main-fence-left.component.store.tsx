import React from 'react';
import { IMainFenceLeftState, IMainFenceLeftProps } from './main-fence-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';
import { editFence, getFenceListAction, changeSearchForm } from '../hooks-redux/main-fence-action';
import { MainFenceManageContext } from '../main-fence-manage.provider';
const { confirm } = Modal;
export function useMainFenceLeftStore(props: IMainFenceLeftProps) {
  const { state, getState } = useStateStore(new IMainFenceLeftState());
  const fenceManageService = new FenceManageService();
  const { mainFenceManageState, dispatch } = React.useContext(MainFenceManageContext);
  useEffect(() => {
    getFenceList();
  }, []);
  function callbackAction(e: Event, actionType: number, data: FenceManageListReturnModal) {
    e.stopPropagation();
    switch (actionType) {
      case ACTION_TYPE.EDIT:
        editFence(data, dispatch);
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

  function getFenceList(searchForm = mainFenceManageState.searchForm) {
    console.log('mainFenceManageState.searchForm', mainFenceManageState.searchForm);

    getFenceListAction(searchForm, dispatch);
  }

  function searchClick() {
    getFenceList();
  }

  function changeTablePageIndex(index: number) {
    console.log('index.searchForm', index);
    changeSearchForm('index', index, dispatch);
    getFenceList({ ...mainFenceManageState.searchForm, index });
  }
  return { state, callbackAction, changeTablePageIndex, searchClick };
}
