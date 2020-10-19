import { IAddTemplateTypeProps, IAddTemplateTypeState } from './add-template-type.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { EventDataNode } from 'antd/lib/tree';
import { forkJoin } from 'rxjs';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { dealWithTreeData, getCheckedList, updateTreeData } from '~/framework/util/common/treeFunction';
import { TREE_MAP } from '../../appraval-template.interface';
import { useEffect, useContext } from 'react';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';
import { DataNode } from 'rc-tree/lib/interface';
import _ from 'lodash';

export function useAddTemplateTypeStore(props: IAddTemplateTypeProps) {
  const { state, setStateWrap, getState } = useStateStore(new IAddTemplateTypeState());
  const warehouseListService: WarehouseListService = new WarehouseListService();
  const { gState }: IGlobalState = useContext(GlobalContext);
  useEffect(() => {
    queryOrganizationTypeListByTypeId();
  }, []);

  // 根据根据系统id查找机构类型
  function queryOrganizationTypeListByTypeId(id?: string) {
    warehouseListService.queryStoreOrganization({ typeId: gState.myInfo.typeId, id }).subscribe(res => {
      const treeData = dealWithTreeData<QueryStoreOrganizationReturn>(res, TREE_MAP, false);
      setStateWrap({
        treeData
      });
    });
  }
  // 确定创建
  function handleOk() {
    setStateWrap({
      confirmLoading: true
    });
    // 添加模板类型
    addTemplateType();
  }

  function onCheck(checkedKeys: any) {
    const checkedObject = getCheckedList(state.treeData, checkedKeys);

    setStateWrap({
      checkedKeys,
      checkedObject
    });
  }

  async function addTemplateType() {
    setStateWrap({
      confirmLoading: false
    });
    // 是否刷新左边栏
    props.closeAddTemplateTypeModal(!props.isEdit);
  }

  // 关闭当前的modal
  function handleCancel() {
    props.closeAddTemplateTypeModal();
  }

  /**
   *
   * 根据父级Id查询子级机构
   * @param {string} id 父级id
   */
  function queryStoreOrganizationListSub(parentId: string, treeNode: EventDataNode, resolve: Function) {
    forkJoin(warehouseListService.queryStoreOrganizationListSub({ parentId })).subscribe((res: any) => {
      treeNode.children = [...dealWithTreeData(res[1], TREE_MAP, true), ...dealWithTreeData(res[0], TREE_MAP, false)];

      const treeData = updateTreeData(state.treeData, treeNode.key, treeNode.children);
      const checkedObject = getCheckedList(treeData, state.checkedKeys);
      // 统计现在勾选的节点数
      setStateWrap({
        treeData,
        checkedObject
      });
      resolve();
    });
  }

  // 搜索得到想要的key获取当前组
  function getCurrentSelectInfo<T>(value: T, key: string) {
    setStateWrap({
      loadStoreOrganizationParams: {
        ...state.loadStoreOrganizationParams,
        [key]: value
      }
    });
    searchCurrentSelectInfo(getState().loadStoreOrganizationParams);
  }

  // 选择当前的机构信息，这边进行搜索
  function searchCurrentSelectInfo(params: { typeId: string; id: string }) {
    warehouseListService.queryStoreOrganization(params).subscribe(res => {
      const expandedKeys: string[] = [];
      res.forEach(item => {
        expandedKeys.push(item.id);
      });

      setStateWrap({
        expandedKeys
      });
    });
  }

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }

  function onChangeHaveChooseShop(id: string) {
    document.getElementById(id).focus();
  }

  function removeHaveChecked(item: DataNode) {
    const checkedKeys = state.checkedKeys.filter(option => {
      return option !== item.key;
    });
    setStateWrap({
      checkedKeys
    });
  }

  // 点击展开加载数据
  function onLoadData(treeNode: EventDataNode | any): Promise<void> {
    return new Promise(resolve => {
      queryStoreOrganizationListSub(treeNode.id, treeNode, resolve);
    });
  }
  return {
    state,
    handleOk,
    onChangeHaveChooseShop,
    handleCancel,
    getCurrentSelectInfo,
    onLoadData,
    onExpand,
    removeHaveChecked,
    onCheck
  };
}
