import {
  IOrganizationControllerState,
  TREE_MAP,
  IOrganizationControllerProps
} from './organization-controller.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useContext, useImperativeHandle, useRef } from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';
import {
  __initContent__,
  dealWithTreeData,
  updateTreeData,
  deleteTreeDataByKey,
  alterTreeDataByKey,
  addTreeDataByOrgId,
  setSingleCheck
} from '~/framework/util/common/treeFunction';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';
import { EventDataNode, DataNode } from 'rc-tree/lib/interface';
import { forkJoin } from 'rxjs';

export function useOrganizationControllerStore(props: IOrganizationControllerProps, ref: any) {
  const { state, setStateWrap, getState } = useStateStore(new IOrganizationControllerState());
  const warehouseListService: WarehouseListService = new WarehouseListService();
  const { warehouseAction, onExpand, queryChildInfo, currentOrganazation, allCanSelect } = props;
  const formInfo = useRef({ index: 1, size: 10 });
  const { gState }: IGlobalState = useContext(GlobalContext);
  __initContent__(warehouseAction);
  useEffect(() => {
    queryOrganizationTypeListByTypeId();
  }, [currentOrganazation]);

  // 根据根据系统id查找机构类型
  function queryOrganizationTypeListByTypeId(id?: string) {
    setStateWrap({ loading: true });
    warehouseListService
      .queryStoreOrganization({ typeId: gState.myInfo.typeId, id, ...formInfo.current })
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
          props.organizationChecked,
          props.disableNodeObj
        );
        setStateWrap({
          loading: false,
          treeData: [...getState().treeData, ...treeData]
        });
      });
  }

  // 加载更多
  function getMoreOrganization() {
    formInfo.current = { ...formInfo.current, index: formInfo.current.index + 1 };
    queryOrganizationTypeListByTypeId();
  }

  // 点击展开加载数据
  function onLoadData(treeNode: EventDataNode | any): Promise<void> {
    console.log(treeNode);
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
    forkJoin(warehouseListService.queryStoreOrganizationListSub({ parentId }), queryChildInfoSubscription).subscribe(
      (res: any) => {
        const queryChildInfoData: DataNode[] = queryChildInfo
          ? dealWithTreeData(res[1], TREE_MAP, true, warehouseAction, allCanSelect, undefined, props.disableNodeObj)
          : [];

        treeNode.children = [
          ...queryChildInfoData,
          ...dealWithTreeData(
            res[0],
            TREE_MAP,
            false,
            undefined,
            allCanSelect,
            props.organizationChecked,
            props.disableNodeObj
          )
        ];
        const treeData = updateTreeData(state.treeData, treeNode.key, treeNode.children);

        props.checkable && props.getCheckedInfo(treeData);
        setStateWrap({
          treeData
        });
        resolve();
      }
    );
  }

  // 搜索得到想要的key获取当前仓库
  function getCurrentSelectInfo<T>(value: T, key: string) {
    setStateWrap({
      loadStoreOrganizationParams: {
        ...state.loadStoreOrganizationParams,
        [key]: value
      },
      treeData: []
    });

    if (getState().loadStoreOrganizationParams.id) {
      searchCurrentSelectInfo(getState().loadStoreOrganizationParams);
    } else {
      formInfo.current.index = 1;
      queryOrganizationTypeListByTypeId();
    }
  }

  // 获取当前选择的监控组
  function getCurrentGroup<T>(value: T, key: string) {
    if (!value) {
      return;
    }
    const { info }: any = value;
    getCurrentSelectInfo(info.organizationId, 'id');
  }
  // 选择当前的机构信息，这边进行搜索
  function searchCurrentSelectInfo(params: { typeId: string; id: string; index: number; size: number }) {
    setStateWrap({
      loading: true
    });
    warehouseListService.queryStoreOrganization(params).subscribe(res => {
      const treeData = dealWithTreeData<QueryStoreOrganizationReturn>(
        res,
        TREE_MAP,
        false,
        warehouseAction,
        allCanSelect,
        props.organizationChecked
      );
      setStateWrap({
        loading: false,
        treeData: [...treeData]
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

  // 修改tree
  function alertCurrentTreeData(id: string, title: string) {
    const treeData = alterTreeDataByKey(state.treeData, id, title);
    setStateWrap({
      treeData: treeData
    });
  }

  // 增加节点
  function appendNewNodeToCurrentTreeData(data: object) {
    const treeData = addTreeDataByOrgId(state.treeData, data);
    setStateWrap({
      treeData: treeData
    });
  }
  // 设置单选
  function setSingleCheckTreeData(id: string) {
    const treeData = setSingleCheck(state.treeData, id);
    setStateWrap({
      treeData: treeData
    });
  }

  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    alertCurrentTreeData,
    deleteCurrentTreeData,
    queryOrganizationTypeListByTypeId,
    searchCurrentSelectInfo,
    appendNewNodeToCurrentTreeData,
    setSingleCheckTreeData
  }));

  return { state, onLoadData, getCurrentSelectInfo, onCheck, getCurrentGroup, getMoreOrganization };
}
