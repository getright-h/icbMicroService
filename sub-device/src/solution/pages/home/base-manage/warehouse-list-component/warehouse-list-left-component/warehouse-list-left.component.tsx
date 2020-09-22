import { Button, Tree } from 'antd';
import * as React from 'react';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import AddWarehouseComponent from '../add-warehouse-component/add-warehouse.component';
import style from './warehouse-list-left.component.less';
import { useWarehouseListLeftStore } from './warehouse-list-left.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function WarehouseListLeftComponent() {
  const { state, getCurrentSelectInfo, onLoadData, onSelect, addWarehouse } = useWarehouseListLeftStore();
  const { gState } = React.useContext(GlobalContext);
  const { treeData } = state;
  return (
    <div className={style.warehouseListLeft}>
      <Button type="primary" onClick={addWarehouse}>
        新增仓库 +{' '}
      </Button>
      <div className={style.searchWarehouse}>
        <ISelectLoadingComponent
          placeholder="请输入机构名称"
          width={200}
          showSearch
          searchForm={{
            systemId: gState.myInfo.systemId
          }}
          reqUrl="queryStoreOrganization"
          getCurrentSelectInfo={value => getCurrentSelectInfo<string>(value, 'id')}
        />
      </div>
      <Tree loadData={onLoadData} showIcon onSelect={onSelect} treeData={treeData} />
      <AddWarehouseComponent></AddWarehouseComponent>
    </div>
  );
}
