import { Button, Tree } from 'antd';
import * as React from 'react';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import AddWarehouseComponent from '../add-warehouse-component/add-warehouse.component';
import style from './warehouse-list-left.component.less';
import { useWarehouseListLeftStore } from './warehouse-list-left.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function WarehouseListLeftComponent() {
  const {
    state,
    getCurrentSelectInfo,
    onLoadData,
    onSelect,
    addWarehouse,
    closeAddWarehouseModal,
    onExpand
  } = useWarehouseListLeftStore();
  const { gState } = React.useContext(GlobalContext);
  const {
    treeData,
    treeSelectedKeys,
    addWarehouseVisible,
    editWarehouseId,
    expandedKeys,
    isEditWarehouseModal
  } = state;

  // component --- 渲染添加仓库的modal
  function RenderAddWarehouseModal() {
    const addWarehouseComponentProps = {
      addWarehouseVisible,
      isEdit: isEditWarehouseModal,
      warehouseId: editWarehouseId,
      closeAddWarehouseModal
    };
    return <AddWarehouseComponent {...addWarehouseComponentProps}></AddWarehouseComponent>;
  }

  return (
    <div className={style.warehouseListLeft}>
      <Button type="primary" style={{ width: '100%' }} onClick={addWarehouse}>
        新增仓库 +{' '}
      </Button>
      <div className={style.searchWarehouse}>
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
