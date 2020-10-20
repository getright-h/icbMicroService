import * as React from 'react';
import style from './approval-template-left.component.less';
import { useApprovalTemplateLeftStore } from './approval-template-left.component.store';

import { Button, Space } from 'antd';
import AddTemplateTypeComponent from './add-template-type-component/add-template-type.component';
import OrganizationControllerComponent from '~/solution/components/organization-controller-component/organization-controller.component';

export default function ApprovalTemplateLeftComponent() {
  const {
    state,
    approvalAction,
    onSelect,
    addTemplateType,
    closeAddTemplateTypeModal,
    organizationControllerRef,
    queryChildInfo,
    onExpand
  } = useApprovalTemplateLeftStore();
  const { treeSelectedKeys, addApprovalTypeVisible, editApprovalId, expandedKeys, isEditApprovalModal } = state;

  // component --- 渲染添加仓库的modal
  function RenderAddWarehouseModal() {
    const addWarehouseComponentProps = {
      addApprovalTypeVisible,
      isEdit: isEditApprovalModal,
      templateTypeId: editApprovalId,
      closeAddTemplateTypeModal
    };
    return <AddTemplateTypeComponent {...addWarehouseComponentProps}></AddTemplateTypeComponent>;
  }

  const prganizationControllerComponentProps = {
    approvalAction,
    onSelect,
    expandedKeys,
    treeSelectedKeys,
    onExpand,
    ref: organizationControllerRef,
    queryChildInfo
  };

  return (
    <div className={style.approvalListLeft}>
      <Button type="primary" style={{ width: '100%', marginBottom: '10px' }} onClick={addTemplateType}>
        新增模板类型 +
      </Button>
      <Button type="primary" style={{ width: '100%' }} onClick={addTemplateType}>
        查看全部
      </Button>
      <OrganizationControllerComponent {...prganizationControllerComponentProps} />

      <RenderAddWarehouseModal />
    </div>
  );
}
