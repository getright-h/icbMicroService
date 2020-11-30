import {
  IOrganizationControllerState,
  TREE_MAP,
  IOrganizationControllerProps
} from './organization-controller.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useContext, useImperativeHandle } from 'react';
import { dealWithTreeData, updateTreeData, deleteTreeDataByKey } from '~/framework/util/common/treeFunction';
import { EventDataNode, DataNode } from 'rc-tree/lib/interface';
import { forkJoin } from 'rxjs';
import { OrganizationManageService } from '~/solution/model/services/organization-manage.service';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/organization-manage.dto';

export function useOrganizationControllerStore(props: IOrganizationControllerProps, ref: any) {
  const { state, setStateWrap, getState } = useStateStore(new IOrganizationControllerState());
  const organizationManageService: OrganizationManageService = new OrganizationManageService();
  const { warehouseAction, onExpand, queryChildInfo, currentOrganazation, allCanSelect } = props;
  console.log('props', props);

  useEffect(() => {
    queryOrganizationTypeListByTypeId();
  }, [currentOrganazation]);

  // 根据根据系统id查找机构类型
  function queryOrganizationTypeListByTypeId(id?: string) {
    organizationManageService
      .queryStoreOrganization({ typeId: 'c59c75eec2d3cc075cca08d84386bcb9', id })
      .subscribe(res => {
        // 如果只要求显示一个currentOrganazation 才执行这行过滤数据的代码
        if (currentOrganazation) {
          res = res.filter(item => {
            return item.id == currentOrganazation;
          });
        }
        const treeData = dealWithTreeData<QueryStoreOrganizationReturn>(
          res,
          TREE_MAP,
          false,
          warehouseAction,
          allCanSelect,
          props.organizationChecked
        );
        setStateWrap({
          treeData
        });
      });
  }

  // 点击展开加载数据
  function onLoadData(treeNode: EventDataNode | any): Promise<void> {
    return new Promise(resolve => {
      queryStoreOrganizationListSub(treeNode.id, treeNode, resolve);
    });
  }

  function onCheck(checkedKeys: any) {
    props.getCheckedInfo(state.treeData, checkedKeys);
  }

  /**
   *
   * 根据父级Id查询子级机构
   * @param {string} id 父级id
   */
  function queryStoreOrganizationListSub(parentId: string, treeNode: EventDataNode | any, resolve: Function) {
    const queryChildInfoSubscription = queryChildInfo
      ? queryChildInfo({ organizationId: parentId })
      : Promise.resolve();
    forkJoin(
      organizationManageService.queryStoreOrganizationListSub({ parentId }),
      queryChildInfoSubscription
    ).subscribe((res: any) => {
      const queryChildInfoData: DataNode[] = queryChildInfo
        ? dealWithTreeData(res[1], TREE_MAP, true, warehouseAction, allCanSelect)
        : [];

      treeNode.children = [
        ...queryChildInfoData,
        ...dealWithTreeData(res[0], TREE_MAP, false, undefined, allCanSelect, props.organizationChecked)
      ];
      const treeData = updateTreeData(state.treeData, treeNode.key, treeNode.children);

      props.checkable && props.getCheckedInfo(treeData);
      setStateWrap({
        treeData
      });
      resolve();
    });
  }

  // 搜索得到想要的key获取当前仓库
  function getCurrentSelectInfo<T>(value: T, key: string) {
    setStateWrap({
      loadStoreOrganizationParams: {
        ...state.loadStoreOrganizationParams,
        [key]: value
      }
    });
    console.log(value);

    searchCurrentSelectInfo(getState().loadStoreOrganizationParams);
  }

  // 获取当前选择的监控组
  function getCurrentGroup<T>(value: T, key: string) {
    const { info }: any = value;
    getCurrentSelectInfo(info.organizationId, 'id');
  }
  // 选择当前的机构信息，这边进行搜索
  function searchCurrentSelectInfo(params: { typeId: string; id: string }) {
    organizationManageService.queryStoreOrganization(params).subscribe(res => {
      const expandedKeys: string[] = [];
      res.forEach(item => {
        expandedKeys.push(item.id);
      });

      onExpand(expandedKeys);
    });
  }

  // 在当前的tree上操作并显示相应的效果
  function deleteCurrentTreeData(id: string) {
    const treeData = deleteTreeDataByKey(state.treeData, id);
    setStateWrap({
      treeData: treeData
    });
  }

  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    deleteCurrentTreeData,
    queryOrganizationTypeListByTypeId
  }));

  return { state, onLoadData, getCurrentSelectInfo, onCheck, getCurrentGroup };
}
