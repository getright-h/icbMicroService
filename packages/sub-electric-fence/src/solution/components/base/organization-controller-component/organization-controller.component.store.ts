import {
  IOrganizationControllerState,
  TREE_MAP,
  IOrganizationControllerProps
} from './organization-controller.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useImperativeHandle, useRef, Key, useContext } from 'react';
import {
  dealWithTreeData,
  updateTreeData,
  deleteTreeDataByKey,
  formatTreeDataByParentId,
  addLoadMoreNode
} from '~/framework/util/common/treeFunction';
import { EventDataNode, DataNode } from 'rc-tree/lib/interface';
import { forkJoin } from 'rxjs';
import { OrganizationManageService } from '~/solution/model/services/organization-manage.service';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/organization-manage.dto';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export function useOrganizationControllerStore(props: IOrganizationControllerProps, ref: any) {
  const { state, setStateWrap, getState } = useStateStore(new IOrganizationControllerState());
  const organizationManageService: OrganizationManageService = new OrganizationManageService();
  const { warehouseAction, onExpand, queryChildInfo, currentOrganazation, allCanSelect } = props;
  const { gState }: IGlobalState = useContext(GlobalContext);
  const formInfo = useRef({ index: 1, size: 10 });
  useEffect(() => {
    queryOrganizationTypeListByTypeId();
  }, [currentOrganazation]);

  // 根据根据系统id查找机构类型
  function queryOrganizationTypeListByTypeId(id?: string) {
    setStateWrap({
      loading: true
    });
    organizationManageService.queryGpsOrganization(getState().loadStoreOrganizationParams).subscribe(res => {
      if (!res.dataList) res.dataList = [];
      // 如果只要求显示一个currentOrganazation 才执行这行过滤数据的代码
      if (currentOrganazation) {
        res.dataList = res.dataList.filter(item => {
          return item.id == currentOrganazation;
        });
      }
      const treeData = dealWithTreeData<QueryStoreOrganizationReturn>(
        res.dataList,
        TREE_MAP,
        undefined,
        warehouseAction,
        allCanSelect,
        props.organizationChecked
      );
      setStateWrap({
        loading: false,
        treeData,
        total: res.total
      });
    });
  }

  // 页码页尺寸改变
  function onPageSizeChange(index: number, size: number) {
    setStateWrap({
      loadStoreOrganizationParams: {
        ...state.loadStoreOrganizationParams,
        index,
        size
      }
    });
    queryOrganizationTypeListByTypeId(getState().loadStoreOrganizationParams.id);
  }

  // 加载更过
  function getMoreOrganization() {
    formInfo.current = { ...formInfo.current, index: formInfo.current.index + 1 };
    queryOrganizationTypeListByTypeId();
  }

  function onLoad(
    loadedKeys: Key[],
    info: {
      event: 'load';
      node: EventDataNode;
    }
  ) {
    console.log(loadedKeys);

    setStateWrap({ loadedKeys: [...getState().loadedKeys, ...loadedKeys] });
  }

  // 点击展开加载数据
  function onLoadData(treeNode: EventDataNode | any): Promise<void> {
    return new Promise(resolve => {
      if (treeNode?.children?.length) {
        resolve();
      } else {
        queryStoreOrganizationListSub(treeNode.id, treeNode, resolve);
      }
    });
  }

  function onCheck(checkedKeys: any) {
    props.getCheckedInfo(state.treeData, checkedKeys);
  }

  function onLoadMoreSub(treeNode: EventDataNode | any) {
    return new Promise<void>(resolve => {
      loadMoreSubOrganization(treeNode.nextParams, treeNode.parentNode, resolve);
    });
  }

  /**
   *
   * 根据父级Id查询子级机构
   * @param {string} id 父级id
   */
  function queryStoreOrganizationListSub(parentId: string, treeNode: EventDataNode | any, resolve: Function) {
    const params = {
      parentId,
      index: 1,
      size: 10
    };
    const queryChildInfoSubscription = queryChildInfo
      ? queryChildInfo({ organizationId: parentId })
      : Promise.resolve();
    forkJoin(organizationManageService.queryGpsOrganizationListSub(params), queryChildInfoSubscription).subscribe(
      (res: any) => {
        const queryChildInfoData: DataNode[] = queryChildInfo
          ? dealWithTreeData(res[1], TREE_MAP, true, warehouseAction, allCanSelect)
          : [];

        let loadMoreNode;
        if (res[0].index * 10 < res[0].total) {
          loadMoreNode = addLoadMoreNode(params, treeNode);
        }
        treeNode.children = [
          ...queryChildInfoData,
          ...dealWithTreeData(res[0].dataList, TREE_MAP, undefined, undefined, allCanSelect, props.organizationChecked)
        ];
        loadMoreNode && treeNode.children.push(loadMoreNode);
        const treeData = updateTreeData(state.treeData, treeNode.key, treeNode.children);
        props.checkable && props.getCheckedInfo(treeData);
        setStateWrap({
          treeData
        });
        resolve();
      }
    );
  }

  function loadMoreSubOrganization(nextParams: any, treeNode: EventDataNode | any, resolve: Function) {
    organizationManageService.queryGpsOrganizationListSub(nextParams).subscribe((res: any) => {
      treeNode.children.pop();
      let loadMoreNode;
      if (res.index * 10 < res.total) {
        loadMoreNode = addLoadMoreNode(nextParams, treeNode);
      }
      treeNode.children = [
        ...treeNode.children,
        ...dealWithTreeData(res.dataList, TREE_MAP, undefined, undefined, allCanSelect, props.organizationChecked)
      ];
      loadMoreNode && treeNode.children.push(loadMoreNode);
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
        [key]: value,
        index: 1
      },
      treeData: [],
      loadedKeys: []
    });
    onExpand && onExpand([]);
    if (getState().loadStoreOrganizationParams.id) {
      searchCurrentSelectInfo(getState().loadStoreOrganizationParams);
    } else {
      queryOrganizationTypeListByTypeId();
    }
  }

  // 获取当前选择的监控组
  function getCurrentGroup<T>(value: T, key: string) {
    if (!value) {
      getCurrentSelectInfo('', 'id');
      return;
    }
    const { info = {} }: any = value;
    getCurrentSelectInfo(info?.organizationId, 'id');
  }
  // 选择当前的机构信息，这边进行搜索
  function searchCurrentSelectInfo(params: { typeId: string; id: string; index: number; size: number }) {
    setStateWrap({
      loading: true
    });
    organizationManageService.queryGpsOrganization(params).subscribe(res => {
      let treeData = dealWithTreeData<QueryStoreOrganizationReturn>(
        res.dataList,
        TREE_MAP,
        false,
        warehouseAction,
        allCanSelect,
        props.organizationChecked
      );
      treeData = formatTreeDataByParentId(treeData);
      setStateWrap({
        loading: false,
        treeData,
        total: res.total
      });
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

  return {
    state,
    formInfo,
    onLoadData,
    onLoad,
    getCurrentSelectInfo,
    onCheck,
    getCurrentGroup,
    getMoreOrganization,
    onPageSizeChange,
    onLoadMoreSub
  };
}
