import { TYPES } from './main-fence-type';
import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';
import { Dispatch } from 'react';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';
const fenceManageService = new FenceManageService();
export function rowClickAction(record?: FenceManageListReturnModal, dispatch?: Dispatch<any>) {
  // 设置map的值
  try {
    const allTrNodes = document.querySelectorAll('tr[data-row-key]');
    allTrNodes.forEach(item => {
      if (record && item.getAttribute('data-row-key') == record.id) {
        item.className = 'ant-table-row ant-table-row-level-0 ant-table-row-selected';
        return;
      }
      item.className = 'ant-table-row ant-table-row-level-0';
    });
    if (!record) return;
    return dispatch({
      type: TYPES.ROW_CLICK,
      payload: record
    });
  } catch (error) {
    console.log(error);
  }
}

export function visibleInfo(isShow: boolean, dispatch: Dispatch<any>) {
  // 主要用于close
  return dispatch({
    type: TYPES.SET_MODALVISIBLE,
    payload: {
      visible: isShow,
      editData: undefined
    }
  });
}

export function changeSearchForm(key: string, value: string | number | any, dispatch: Dispatch<any>) {
  dispatch({
    type: TYPES.SET_SEARCH_FORM,
    payload: {
      key,
      value
    }
  });
}

export function getFenceListAction(
  searchForm: {
    name: string;
    index: number;
    size: number;
  },
  dispatch: Dispatch<any>
) {
  dispatch({
    type: TYPES.SET_TABLE_INFO,
    payload: {
      isLoading: true,
      searchForm
    }
  });
  fenceManageService.fenceList(searchForm).subscribe(
    res => {
      dispatch({
        type: TYPES.SET_TABLE_INFO,
        payload: {
          tableData: res.data,
          total: res.total,
          isLoading: false
        }
      });
    },
    () => {
      dispatch({
        type: TYPES.SET_TABLE_INFO,
        payload: {
          isLoading: false
        }
      });
    }
  );
}

export function newFence(dispatch: Dispatch<any>) {
  rowClickAction();
  return dispatch({
    type: TYPES.NEW_FENCE
  });
}

export function editFence(data: FenceManageListReturnModal, dispatch: Dispatch<any>) {
  rowClickAction();
  return dispatch({
    type: TYPES.EDIT_FENCE,
    payload: {
      visible: true,
      editData: data,
      isEdit: true
    }
  });
}
