import * as React from 'react';
import style from './approval-template-left.component.less';
import { useApprovalTemplateLeftStore } from './approval-template-left.component.store';
import OrganizationControllerComponent from '~/solution/components/organization-controller-component/organization-controller.component';
import { Button, Tree } from 'antd';
import AddTemplateTypeComponent from './add-template-type-component/add-template-type.component';
import { AppravalTemplateManageContext } from '../appraval-template.component';

export default function ApprovalTemplateLeftComponent() {
  const {
    state,
    organizationControllerRef,
    $auth,
    onLoadData,
    onSelect,
    addTemplateType,
    closeAddTemplateTypeModal,
    onExpand,
    onChooseAll,
    groupAction,
    queryChildInfo
  } = useApprovalTemplateLeftStore();
  const {
    treeSelectedKeys,
    treeData,
    groupId,
    addApprovalTypeVisible,
    expandedKeys,
    isEditApprovalModal,
    organazationList
  } = state;
  const { reduxState } = React.useContext(AppravalTemplateManageContext);

  const organizationControllerProps = {
    onSelect,
    expandedKeys,
    treeSelectedKeys,
    onExpand,
    warehouseAction: groupAction,
    queryChildInfo
  };

  // component --- 渲染添加仓库的modal
  function RenderAddWarehouseModal() {
    const addWarehouseComponentProps = {
      addApprovalTypeVisible,
      isEdit: isEditApprovalModal,
      closeAddTemplateTypeModal,
      organazationList,
      groupId,
      ref: organizationControllerRef
    };
    return <AddTemplateTypeComponent {...addWarehouseComponentProps}></AddTemplateTypeComponent>;
  }

  return (
    <div className={style.approvalListLeft}>
      <Button
        type="primary"
        style={{ width: '100%', marginBottom: '10px' }}
        onClick={addTemplateType}
        disabled={!$auth['addApprovalGroup']}
      >
        新增模板类型 +
      </Button>
      <a
        style={{ padding: '0 14px' }}
        onClick={onChooseAll}
        className={`${reduxState.currentSelectNode.isAll && style.chooseShowAll}`}
      >
        查看全部
      </a>
      {/* <div style={{ textAlign: 'center' }}>
        <Tree
          loadedKeys={expandedKeys}
          loadData={onLoadData}
          onSelect={onSelect}
          expandedKeys={expandedKeys}
          selectedKeys={treeSelectedKeys}
          onExpand={onExpand}
          blockNode
          treeData={treeData}
        />
      </div> */}
      <OrganizationControllerComponent {...organizationControllerProps} />

      {addApprovalTypeVisible && <RenderAddWarehouseModal />}
    </div>
  );
}
