import { IAction } from '~/solution/shared/interfaces/common.interface';
import { TYPES } from './main-fence-type';
import { FENCETYPENUM } from '../create-electric-fence-component/create-electric-fence.interface';
import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';

export const mainFenceInitialState: any = {
  visible: false,
  isEdit: true,
  editData: undefined,
  tableData: [],
  total: 0,
  isLoading: false,
  searchForm: {
    index: 1,
    size: 5,
    name: ''
  }
};

export function MainFenceReducer(state = mainFenceInitialState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.ROW_CLICK:
      return {
        ...state,
        editData: payload
      };
    case TYPES.SET_MODALVISIBLE:
      return {
        ...state,
        ...payload
      };
    case TYPES.NEW_FENCE:
      return {
        ...state,
        isEdit: false,
        visible: true,
        editData: undefined
      };
    case TYPES.EDIT_FENCE:
      return {
        ...state,
        ...payload
      };
    case TYPES.TABLE_INFO:
      return {
        ...state,
        ...payload
      };
    case TYPES.SET_TABLE_INFO:
      return {
        ...state,
        ...payload
      };
    case TYPES.SET_SEARCH_FORM:
      const { key, value } = payload;
      return {
        ...state,
        searchForm: {
          ...state.searchForm,
          [key]: value
        }
      };
    default:
      return state;
  }
}
