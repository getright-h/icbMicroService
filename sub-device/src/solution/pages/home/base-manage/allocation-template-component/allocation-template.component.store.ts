import { IAllocationTemplateState } from './allocation-template.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { AllocationTemplateService } from '../../../../model/services/allocation-template.service';
import { QueryAllotFlowTemplatePagedListReturn } from '~/solution/model/dto/allocation-template.dto';
import { useService } from '../../../../../framework/aop/hooks/use-base-store';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
export function useAllocationTemplateStore() {
  const { state, setStateWrap } = useStateStore(new IAllocationTemplateState());
  const allocationTemplateService: AllocationTemplateService = useService(AllocationTemplateService);
  const history = useHistory();
  useEffect(() => {
    getTableData();
  }, []);

  // 添加调拨模板
  function addAllocationTemplate() {
    history.push('/home/baseManage/addAndEditAllocationTemplate');
  }

  // 创建机构获取
  function getSelectOrganazationInfo(id: string) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        organizationId: id
      }
    });
  }

  // 当前的列表
  function getTableData() {
    setStateWrap({
      isLoading: true
    });
    allocationTemplateService
      .queryAllotFlowTemplatePagedList({
        ...state.searchForm,
        beginTime: state.timeInfo[0] ? moment(state.timeInfo[0]).valueOf() : 0,
        endTime: state.timeInfo[1] ? moment(state.timeInfo[1]).valueOf() : 0
      })
      .subscribe(
        (result: { dataList: QueryAllotFlowTemplatePagedListReturn[]; total: number }) => {
          setStateWrap({
            tableData: result.dataList,
            total: result.total,
            isLoading: false
          });
        },
        () => {
          setStateWrap({
            isLoading: false
          });
        }
      );
  }

  function changeTablePageIndex(index: number, size: number) {}

  function callbackAction(row: QueryAllotFlowTemplatePagedListReturn, actionType: string) {
    switch (actionType) {
      case '详情':
        break;
      case '删除':
        //   deleteAllocationTemplate(row);
        break;
      default:
        break;
    }
  }

  function handleFormDataChange(value: { target: { value: string } }, key: string) {
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        [key]: value.target.value
      }
    });
  }

  function getDateTimeInfo(times: Array<string>) {
    setStateWrap({
      timeInfo: times
    });
  }

  function deleteAllocationTemplate() {}
  return {
    state,
    addAllocationTemplate,
    getSelectOrganazationInfo,
    getTableData,
    callbackAction,
    handleFormDataChange,
    changeTablePageIndex,
    getDateTimeInfo
  };
}
