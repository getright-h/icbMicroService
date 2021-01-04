import { Button, Tree } from 'antd';
import React from 'react';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import AddWarehouseComponent from '../add-warehouse-component/add-warehouse.component';
import style from './warehouse-list-left.component.less';
import { useWarehouseListLeftStore } from './warehouse-list-left.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';
import OrganizationControllerComponent from '~/solution/components/organization-controller-component/organization-controller.component';

export default function WarehouseListLeftComponent() {
  const {
    state,
    onSelect,
    addWarehouse,
    closeAddWarehouseModal,
    organizationControllerRef,
    onExpand,
    warehouseAction,
    queryChildInfo
  } = useWarehouseListLeftStore();
  const { treeSelectedKeys, addWarehouseVisible, editWarehouseId, expandedKeys, isEditWarehouseModal } = state;
  const addWarehouseComponentProps = React.useMemo(
    () => ({
      addWarehouseVisible,
      isEdit: isEditWarehouseModal,
      warehouseId: editWarehouseId,
      closeAddWarehouseModal
    }),
    [editWarehouseId, isEditWarehouseModal, addWarehouseVisible]
  );
  // component --- 渲染添加仓库的modal
  function RenderAddWarehouseModal() {
    return <AddWarehouseComponent {...addWarehouseComponentProps}></AddWarehouseComponent>;
  }

  const prganizationControllerComponentProps = {
    warehouseAction,
    onSelect,
    expandedKeys,
    treeSelectedKeys,
    onExpand,
    ref: organizationControllerRef,
    queryChildInfo
  };
  return (
    <div className={style.warehouseListLeft}>
      <Button type="primary" style={{ width: '100%' }} onClick={addWarehouse}>
        新增仓库 +{' '}
      </Button>
      <OrganizationControllerComponent {...prganizationControllerComponentProps} />
      {RenderAddWarehouseModal()}
    </div>
  );
}
