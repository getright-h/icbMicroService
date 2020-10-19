import * as React from 'react';
import style from './approval-template-left.component.less';
import { useApprovalTemplateLeftStore } from './approval-template-left.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { Button, Tree } from 'antd';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import AddTemplateTypeComponent from './add-template-type-component/add-template-type.component';

export default function ApprovalTemplateLeftComponent() {
  const {
    state,
    getCurrentSelectInfo,
    onLoadData,
    onSelect,
    addTemplateType,
    closeAddTemplateTypeModal,
    onExpand
  } = useApprovalTemplateLeftStore();
  const { gState } = React.useContext(GlobalContext);
  const {
    treeData,
    treeSelectedKeys,
    addApprovalTypeVisible,
    editApprovalId,
    expandedKeys,
    isEditApprovalModal
  } = state;

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

  return (
    <div className={style.approvalListLeft}>
      <Button type="primary" style={{ width: '100%' }} onClick={addTemplateType}>
        新增模板类型 +{' '}
      </Button>
      <div className={style.searchApproval}>
        <ISelectLoadingComponent
          placeholder="请输入机构名称"
          width={'100%'}
          showSearch
          searchForm={{
            systemId: gState.myInfo.systemId
          }}
          reqUrl="queryStoreOrganization"
          getCurrentSelectInfo={value => getCurrentSelectInfo<string>(value, 'id')}
        />
      </div>
      <Tree
        loadData={onLoadData}
        onSelect={onSelect}
        expandedKeys={expandedKeys}
        selectedKeys={treeSelectedKeys}
        onExpand={onExpand}
        blockNode
        treeData={treeData}
      />
      <RenderAddWarehouseModal />
    </div>
  );
}
