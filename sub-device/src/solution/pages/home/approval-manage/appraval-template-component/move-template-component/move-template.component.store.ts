import { IMoveTemplateProps, IMoveTemplateState, TREE_MAP } from './move-template.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { DataNode, EventDataNode } from 'rc-tree/lib/interface';
import { useEffect, useContext, useRef } from 'react';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { dealWithTreeData, updateTreeData } from '~/framework/util/common/treeFunction';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ShowNotification } from '~/framework/util/common';

export function useMoveTemplateStore(props: IMoveTemplateProps) {
  const { state, setStateWrap } = useStateStore(new IMoveTemplateState());
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  const warehouseListService: WarehouseListService = useService(WarehouseListService);
  const { gState }: IGlobalState = useContext(GlobalContext);
  const templateData = useRef([]);
  useEffect(() => {
    // 获取所有的模板
    getAllTemplate();
    queryOrganizationTypeListByTypeId();
  }, []);

  function onChangeIsCopy(e: CheckboxChangeEvent) {
    setStateWrap({
      isCopy: e.target.checked
    });
  }

  // 根据根据系统id查找机构类型
  function queryOrganizationTypeListByTypeId(id?: string) {
    warehouseListService.queryStoreOrganization({ typeId: gState.myInfo.typeId, id }).subscribe(res => {
      const treeData = dealWithTreeData<QueryStoreOrganizationReturn>(res, TREE_MAP, false, undefined);
      setStateWrap({
        treeData,
        organazationList: res
      });
    });
  }

  function onCheckData(checkedKeys: string[], data) {
    setStateWrap({
      groupIdList: checkedKeys
    });
  }

  // 点击展开加载数据
  function onLoadData(treeNode: EventDataNode | any) {
    //根据 集团信息获取
    return new Promise<void>(resolve => {
      queryStoreOrganizationListSub(treeNode.id, treeNode, resolve);
    });
  }

  function queryStoreOrganizationListSub(parentId: string, treeNode: EventDataNode | any, resolve: Function) {
    approvalManageService.queryApprovalGroupList({ organizationId: parentId }).subscribe(res => {
      const queryChildInfoData: DataNode[] = dealWithTreeData(
        res,
        {
          title: 'name',
          key: 'id'
        },
        true,
        undefined,
        undefined,
        undefined,
        {
          currentDisableId: String(props?.node?.node?.key)
        }
      );

      treeNode.children = queryChildInfoData;
      const treeData = updateTreeData(state.treeData, treeNode.key, treeNode.children);

      setStateWrap({
        treeData
      });
      resolve();
    });
  }

  function getAllTemplate() {
    // 获取所有的模板
    approvalManageService.queryApprovalFormListByGroupId({ groupId: props.groupId }).subscribe(res => {
      setStateWrap({
        allTemplate: res
      });
    });
  }

  function onChangeTemplate(checkedKeys: string[], node: any) {
    const { allTemplate } = state;
    const checked: any[] = [];

    checkedKeys.forEach((key: string) => {
      allTemplate.forEach(({ id, groupRelationTemplateId }) => {
        if (id == key) {
          checked.push({
            groupRelationTemplateId,
            id
          });
        }
      });
    });
    templateData.current = checked.filter(item => !!item);
    setStateWrap({
      formTemplateIdList: checkedKeys
    });
  }

  function handleOk() {
    setStateWrap({
      confirmLoading: true
    });
    // 传true表示这个时候需要刷新列表
    const { groupIdList, isCopy } = state;
    approvalManageService
      .moveApprovalFormTemplate({ formTemplateIdList: templateData.current, groupIdList, isCopy })
      .subscribe(
        () => {
          props.closeMoveTemplateModal(true);
          setStateWrap({
            confirmLoading: false
          });
          ShowNotification.success('移动成功！');
        },
        () => {
          setStateWrap({
            confirmLoading: false
          });
        }
      );
  }

  function handleCancel() {
    props.closeMoveTemplateModal();
  }

  function onExpand(expandedKeys: string[]) {
    setStateWrap({
      expandedKeys
    });
  }

  function onCheck(treeData: DataNode[], checkedKeys: any = state.checkedKeys) {
    setStateWrap({
      checkedKeys
    });
  }
  return {
    state,
    handleOk,
    onCheckData,
    onChangeIsCopy,
    handleCancel,
    onExpand,
    onCheck,
    onChangeTemplate,
    onLoadData
  };
}
