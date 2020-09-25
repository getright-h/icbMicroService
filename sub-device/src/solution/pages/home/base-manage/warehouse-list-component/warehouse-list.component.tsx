import * as React from 'react';
import style from './warehouse-list.component.less';
import { WarehouseListReducer, warehouseListInitialState } from './warehouse-list-redux/warehouse-list-reducer';
import { TablePageTelComponent, ITableComponent } from '~/framework/components/component.module';
import WarehouseListLeftComponent from './warehouse-list-left-component/warehouse-list-left.component';
import { useWarehouseListStore } from './warehouse-list.component.store';
import { wareHouseListColumns } from './warehouse-list.columns';
import { Button, Input } from 'antd';
import { setModalvisible } from './warehouse-list-redux/warehouse-list-action';
import AddShippingSpaceComponent from './add-shipping-space-component/add-shipping-space.component';
export const WarehouseListManageContext = React.createContext({
  reduxState: warehouseListInitialState,
  dispatch: undefined
});
export default function WarehouseListComponent() {
  // warehouseListState 当前hooks state 将需要进行组件交流的数据放到 redux 中。
  const [warehouseListState, dispatch] = React.useReducer(WarehouseListReducer, warehouseListInitialState);

  const { state, changeTablePageIndex, callbackAction, handleFormDataChange, getTableData } = useWarehouseListStore(
    warehouseListState
  );
  const { currentSelectNode } = warehouseListState;
  const { isLoading, searchForm, tableData, total, totalAlarm, totalNumber } = state;

  function addShippingSpace() {
    setModalvisible({ modal: 'addShippingSpaceVisible', value: true }, dispatch);
  }
  function renderSelectItems() {
    return (
      <div className="push-search-item">
        <span className="label">仓位名：</span>
        <Input
          disabled={!currentSelectNode}
          allowClear
          placeholder="请输入仓位名"
          value={searchForm.name}
          onChange={($event: any) => handleFormDataChange($event, 'name')}
        />
      </div>
    );
  }

  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" disabled={!currentSelectNode} onClick={() => getTableData()} loading={isLoading}>
          查询
        </Button>
        <Button type="primary" disabled={!currentSelectNode} onClick={() => addShippingSpace()} loading={isLoading}>
          添加仓位
        </Button>
      </div>
    );
  }

  function renderOtherButtons() {
    return (
      <div className={style.totalShow}>
        库存总数: {!currentSelectNode ? '**' : totalNumber}
        <span>({totalAlarm})</span>
      </div>
    );
  }

  function renderTable() {
    return (
      <ITableComponent
        columns={wareHouseListColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <WarehouseListManageContext.Provider value={{ reduxState: warehouseListState, dispatch }}>
      <TablePageTelComponent
        leftFlex={1}
        rightFlex={5}
        pageName={'仓库管理'}
        PageLeftComponent={WarehouseListLeftComponent}
        searchButton={renderSearchButtons()}
        selectItems={renderSelectItems()}
        otherSearchBtns={renderOtherButtons()}
        table={renderTable()}
      ></TablePageTelComponent>
      <AddShippingSpaceComponent />
    </WarehouseListManageContext.Provider>
  );
}
