import { IAllocationDetailState, IFlowNode } from './allocation-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { useHistory } from 'react-router-dom';
import { getQueryParams } from '~/framework/util/common';
import { item } from '../../../approval-manage/appraval-template-component/approval-template-left-component/add-template-type-component/add-template-type.component.less';

export function useAllocationDetailStore() {
  const { state, setStateWrap } = useStateStore(new IAllocationDetailState());
  const history = useHistory();
  const allocationManageService: AllocationManageService = new AllocationManageService();
  let allocationManageServiceSubscription: Subscription;

  // 获取默认路由参数
  function getDefaultParams() {
    const { id = '' } = getQueryParams();
    id && getAlloactionDetail(id);
  }

  //获取调拨单详情
  function getAlloactionDetail(id: string) {
    if (!id) return;
    allocationManageServiceSubscription = allocationManageService.allotDetail({ allotId: id }).subscribe(
      (res: any) => {
        setStateWrap({
          detail: res
        });
        setAlloactionTemplateFlowData(res.flowList);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  // 节点流程数据重构
  function setAlloactionTemplateFlowData(flowListData: Array<IFlowNode>) {
    if (!Array.isArray(flowListData) || !flowListData.length) return;
    const flowList = [];
    // 根据获取所有的sort,并且去重来获取流程的节点长度
    const sort: Array<number> = flowListData.map(flow => flow.sort);
    console.log(sort);
    const nodeLength = sort.length;
    // 数组去重未作处理！！！！
    for (let i = 0; i <= nodeLength; i++) {
      flowList.push(flowListData.filter((flow: IFlowNode) => flow.sort == i));
    }
    setStateWrap({ flowList: flowList.filter(item => !!item.length) });
  }
  useEffect(() => {
    getDefaultParams();
    return () => {
      allocationManageServiceSubscription && allocationManageServiceSubscription.unsubscribe();
    };
  }, []);
  return { state };
}
