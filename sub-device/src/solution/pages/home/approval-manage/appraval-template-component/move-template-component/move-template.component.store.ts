import { IMoveTemplateProps, IMoveTemplateState } from './move-template.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { DataNode } from 'rc-tree/lib/interface';
import { useEffect, useRef } from 'react';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ShowNotification } from '~/framework/util/common';

export function useMoveTemplateStore(props: IMoveTemplateProps) {
  const { state, setStateWrap } = useStateStore(new IMoveTemplateState());
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  const templateData = useRef([]);
  useEffect(() => {
    // 获取所有的模板
    getAllTemplate();
  }, []);

  function onChangeIsCopy(e: CheckboxChangeEvent) {
    setStateWrap({
      isCopy: e.target.checked
    });
  }

  function onCheckData(treeData: DataNode[], checkedKeys: string[]) {
    setStateWrap({
      groupIdList: checkedKeys
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

  function onChangeTemplate(checkedKeys: string[]) {
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
  const queryChildInfo = (item: any) => approvalManageService.queryApprovalGroupList(item);
  return {
    state,
    handleOk,
    onCheckData,
    onChangeIsCopy,
    handleCancel,
    onExpand,
    onCheck,
    onChangeTemplate,
    queryChildInfo
  };
}
