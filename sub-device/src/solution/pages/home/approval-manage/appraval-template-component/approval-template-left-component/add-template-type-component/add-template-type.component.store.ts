import { IAddTemplateTypeProps, IAddTemplateTypeState } from './add-template-type.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { getCheckedList } from '~/framework/util/common/treeFunction';
import { DataNode } from 'rc-tree/lib/interface';
import _ from 'lodash';
import { ApprovalManageService } from '../../../../../../model/services/approval-manage.service';
import { message } from 'antd';
import { useEffect } from 'react';

export function useAddTemplateTypeStore(props: IAddTemplateTypeProps) {
  const { state, setStateWrap, getState } = useStateStore(new IAddTemplateTypeState());
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  const { name, checkedKeys, type, parentOrganizationId } = state;

  useEffect(() => {
    props.groupId && getGroupDetail();
  }, [props.groupId]);

  function getGroupDetail() {
    approvalManageService.queryApprovalGroupDetail({ id: props.groupId }).subscribe(res => {
      console.log(res);

      // name: string;
      // type: number;
      // expandedKeys: string[] = [];
      // parentOrganizationId: string;
      // checkedKeys: string[] = [];
      // confirmLoading = false;
      // checkedObject: DataNode[] = [];
    });
  }
  // 确定创建
  function handleOk() {
    if (!name) {
      message.warning('请输入模板名');
      return;
    }
    if (!(checkedKeys && checkedKeys.length)) {
      message.warning('请选择机构');
      return;
    }
    setStateWrap({
      confirmLoading: true
    });
    // 添加模板类型
    addTemplateType();
  }

  function onCheck(treeData: DataNode[], checkedKeys: any = state.checkedKeys) {
    const checkedObject = getCheckedList(treeData, checkedKeys);
    setStateWrap({
      checkedKeys,
      checkedObject
    });
  }

  async function addTemplateType() {
    approvalManageService
      .insertApprovalGroup({ name, organizationList: checkedKeys, type, parentOrganizationId })
      .subscribe(() => {
        setStateWrap({
          confirmLoading: false
        });
        // 是否刷新左边栏
        props.closeAddTemplateTypeModal(!props.isEdit);
      });
  }

  function changeTemplateName(value: any, key: string) {
    console.log(value, key);

    if (key == 'name') {
      setStateWrap({
        [key]: value
      });
      return;
    } else if (getState().parentOrganizationId !== value && key == 'parentOrganizationId') {
      setStateWrap({
        [key]: value
      });
      // 构建当前的机构树
    }
  }

  // 关闭当前的modal
  function handleCancel() {
    props.closeAddTemplateTypeModal();
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

  return {
    state,
    handleOk,
    onChangeHaveChooseShop,
    handleCancel,
    onExpand,
    changeTemplateName,
    removeHaveChecked,
    onCheck
  };
}
