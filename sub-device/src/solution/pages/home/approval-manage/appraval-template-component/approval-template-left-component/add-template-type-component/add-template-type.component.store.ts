import { IAddTemplateTypeProps, IAddTemplateTypeState } from './add-template-type.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { getCheckedList } from '~/framework/util/common/treeFunction';
import { DataNode } from 'rc-tree/lib/interface';
import _ from 'lodash';
import { ApprovalManageService } from '../../../../../../model/services/approval-manage.service';
import { ChangeEvent } from 'react';
import { message } from 'antd';

export function useAddTemplateTypeStore(props: IAddTemplateTypeProps) {
  const { state, setStateWrap } = useStateStore(new IAddTemplateTypeState());
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  const { name, checkedKeys } = state;
  // 确定创建
  function handleOk() {
    console.log(name);

    if (!name) {
      message.warning('请输入模板类型');
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
    approvalManageService.insertApprovalGroup({ name, organizationList: checkedKeys }).subscribe(() => {
      setStateWrap({
        confirmLoading: false
      });
      // 是否刷新左边栏
      props.closeAddTemplateTypeModal(!props.isEdit);
    });
  }

  function changeTemplateName(value: string) {
    setStateWrap({
      name: value
    });
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
