import { ICreateAllocationState, IFlowNode } from './create-allocation.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useCallback } from 'react';
import { Form } from 'antd';
import { ShowNotification, getQueryParams } from '~/framework/util/common';
import { TemplateServiceService } from '~/solution/model/services/template-service.service';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useHistory } from 'react-router-dom';
import { Subscription } from 'rxjs';
import _ from 'lodash';
export function useCreateAllocationStore() {
  const { state, setStateWrap } = useStateStore(new ICreateAllocationState());
  const templateServiceService: TemplateServiceService = new TemplateServiceService();
  const allocationManageService: AllocationManageService = new AllocationManageService();
  const history = useHistory();
  const [form] = Form.useForm();
  let templateServiceServiceSubscription: Subscription;
  let queryAllotFlowTemplateNodeListByTemplateIdSubscription: Subscription;
  let allocationManageServiceSubscription: Subscription;
  // 获取默认路由参数
  function getDefaultParams() {
    const { id = '' } = getQueryParams();
    id && getAlloactionDetail(id);
    setStateWrap({
      id
    });
  }
  // 新增调拨单
  function createNewAllocation() {
    let params;
    try {
      params = setAlloactionTemplateSubmitData();
    } catch (error) {
      ShowNotification.warning(error);
      return;
    }
    setStateWrap({ submitLoading: true });
    templateServiceServiceSubscription = allocationManageService.insertAllot({ ...params }).subscribe(
      (res: any) => {
        ShowNotification.success('添加调拨单成功!');
        form.resetFields();
        setStateWrap({ setStateWrap: {}, submitLoading: false });
      },
      (error: any) => {
        setStateWrap({ submitLoading: false });
      }
    );
  }
  // 编辑调拨单 ==> 获取调拨单详情
  function getAlloactionDetail(id: string) {
    if (!id) return;
    allocationManageServiceSubscription = allocationManageService.allotDetail({ allotId: id }).subscribe(
      (res: any) => {
        console.log(res);
        setStateWrap({
          searchForm: res
        });
        form.setFieldsValue(res);
        setAlloactionTemplateFlowData(res.flowList);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // 获取模板对应的节点列表
  function getAlloactionTemplateFlow(id: any) {
    if (!id) return;
    queryAllotFlowTemplateNodeListByTemplateIdSubscription = templateServiceService
      .queryAllotFlowTemplateDetail({ id })
      .subscribe(
        (res: any) => {
          setAlloactionTemplateFlowData(res.flowList);
        },
        (error: any) => {
          ShowNotification.warning('获取模板失败');
        }
      );
  }
  // 节点流程数据重构
  function setAlloactionTemplateFlowData(flowListData: Array<IFlowNode>) {
    if (!Array.isArray(flowListData) || !flowListData.length) return;
    const flowList = [];
    // 根据获取所有的sort,并且去重来获取流程的节点长度
    const sort: Array<number> = flowListData.map(flow => flow.sort);
    const nodeLength = sort.length;
    // 数组去重未作处理！！！！
    for (let i = 1; i <= nodeLength; i++) {
      flowList.push(flowListData.filter((flow: IFlowNode) => flow.sort == i));
    }
    setStateWrap({ flowList });
  }
  /**
   * 选择流程节点
   * @param index 层级
   * @param flowId 节点ID
   * 通过 index flowId 共同定位到改变的数据
   */
  function selectAlloactionTemplateFlowNode(index: number, flowId: string) {
    const { flowList } = state;
    flowList[index].forEach((flow: IFlowNode) => {
      if (flow.flowId === flowId) {
        flow.isSelected = !flow.isSelected;
      }
    });
    setStateWrap({ flowList });
  }
  // 设置提交数据的数据结构
  function setAlloactionTemplateSubmitData() {
    const { flowList, searchForm } = state;
    // 对数据克隆防止污染节点,以及设备数据
    const params = JSON.parse(JSON.stringify(searchForm));
    const _flowList = JSON.parse(JSON.stringify(flowList));

    // 节点流程数据处理
    _flowList.forEach((item: any) => {
      // 如果当前节点只有一个选项则默认为选中
      if (item.length === 1) {
        item[0].isSelected = true;
      }
      // 每层节点至少选择一项
      if (!item.some((item: any) => !!item.isSelected)) {
        throw '请完善节点信息';
      }
      // 对选择节点列表数据处理,移除多余的数据
      item.forEach((cur: any) => {
        cur.id != undefined && delete cur.id;
        cur.name != undefined && delete cur.name;
      });
    });
    // 扁平化数据
    params.attributeList = _flowList.flat();

    // 对设备数据处理
    if (params.content && Array.isArray(params.content) && params.content.length) {
      params.content.forEach((item: any) => {
        item.key != undefined && delete item.key;
      });
    }
    return { ...params };
  }
  function onChange(value: any, valueType: string) {
    if (valueType === 'allotTemplateId') {
      getAlloactionTemplateFlow(value);
    }
    setStateWrap({
      searchForm: {
        ...state.searchForm,
        [valueType]: value
      }
    });
  }
  // 用于设置设备
  function updateTypeDevice(value: any, valueType: string) {
    const { searchForm = {} } = state;
    const { field = {}, option = {}, number = -1 } = value;
    const { key } = field;
    const { info = {} } = option;
    let currentType: {
      key?: number;
      typeId?: string;
      typeName?: string;
      number?: number;
    } = { key };

    if (valueType == 'type') {
      // 输入设备型号数据结构
      currentType = {
        ...currentType,
        typeId: info.id,
        typeName: info.name
      };
    } else {
      // 输入设备数量数据结构
      currentType = {
        ...currentType,
        number
      };
    }
    if (searchForm.content && Array.isArray(searchForm.content) && searchForm.content.length) {
      //寻找存在相同Key的对象
      const sameContentIndex = searchForm.content.findIndex((content: any) => content.key === currentType.key);
      // 若存在
      if (sameContentIndex != -1) {
        searchForm.content[sameContentIndex] = {
          ...searchForm.content[sameContentIndex],
          ...currentType
        };
      } else {
        // 不存在
        searchForm.content = [...searchForm.content, currentType];
      }
    } else {
      // 将当前值与Key放入数组
      searchForm.content = [currentType];
    }
    setStateWrap({ searchForm });
  }
  // 移除设备
  function removeTypeDevice(field: any) {
    const { key } = field;
    const { searchForm = {} } = state;
    if (searchForm.content && Array.isArray(searchForm.content) && searchForm.content.length) {
      //寻找存在相同Key的对象
      const sameContentIndex = searchForm.content.findIndex((content: any) => content.key === key);
      if (sameContentIndex != -1) {
        searchForm.content.splice(sameContentIndex, 1);
      }
    }
    setStateWrap({ searchForm });
  }
  function addNode() {
    const { NodeList } = state;
    NodeList.push([{}]);
    setStateWrap({
      NodeList
    });
    setFLowList();
  }

  function setFLowList() {
    const { NodeList, flowList } = state;
    for (let i = 0; i < NodeList.length; i++) {
      const cur_flow_len = flowList[i] && flowList[i].length;
      const cur_node_len = NodeList[i].length;
      if (cur_flow_len == cur_node_len) continue;
      if (!flowList[i]) flowList[i] = [];
      flowList[i].push(...NodeList[i]);
    }
    setStateWrap({
      flowList
    });
  }

  /**
   *
   * @param field
   * @param add
   * @param index 数组第一层 表示环节
   */
  function addFlowNode(index: number, number: number) {
    const { NodeList = [] } = state;
    NodeList[index].push({});
    setStateWrap({
      NodeList
    });
    setFLowList();
  }

  function removeFlowNode(index: number, number: number) {
    const { NodeList = [] } = state;
    NodeList[index].splice(number, 1);
    setStateWrap({
      NodeList: NodeList.filter(node => node.length)
    });
    setFLowList();
  }

  function getCurrentSelectInfo(info: any, type: string, index: number, number: number) {
    const { NodeList } = state;
    NodeList[index][number].organizationId = info.value;
    NodeList[index][number].label = info.children;
    NodeList[index][number].isSelect = false;
    setStateWrap({
      [type]: info.value,
      NodeList
    });
  }

  function setCascaderInfo(info: any, type: any, index: number, number: number) {
    console.log(info);
    const { NodeList } = state;
    NodeList[index][number].warehouse = info[0].children.length
      ? info[0].label + '-' + info[0].children[0].label
      : info[0].label;
    NodeList[index][number].warehouseId = info[0].children.length ? info[0].children[0].value : info[0].value;
    setStateWrap({
      NodeList
    });
  }
  useEffect(() => {
    getDefaultParams();
    setFLowList();
    return () => {
      templateServiceServiceSubscription && templateServiceServiceSubscription.unsubscribe();
      queryAllotFlowTemplateNodeListByTemplateIdSubscription &&
        queryAllotFlowTemplateNodeListByTemplateIdSubscription.unsubscribe();
      allocationManageServiceSubscription && allocationManageServiceSubscription.unsubscribe();
    };
  }, []);
  return {
    state,
    form,
    onChange,
    createNewAllocation,
    removeTypeDevice,
    updateTypeDevice,
    selectAlloactionTemplateFlowNode,
    addNode,
    addFlowNode,
    removeFlowNode,
    getCurrentSelectInfo,
    setCascaderInfo
  };
}
