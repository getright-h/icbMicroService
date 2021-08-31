import * as React from 'react';
import style from './warehouse-list.component.less';
import { WarehouseListReducer, warehouseListInitialState } from './warehouse-list-redux/warehouse-list-reducer';
import { TablePageTelComponent, ITableComponent } from '~/framework/components/component.module';
import WarehouseListLeftComponent from './warehouse-list-left-component/warehouse-list-left.component';
import { useWarehouseListStore } from './warehouse-list.component.store';
import { wareHouseListColumns } from './warehouse-list.columns';
import { Button, Input, Row, Col, Form } from 'antd';
import AddShippingSpaceComponent from './add-shipping-space-component/add-shipping-space.component';
export const WarehouseListManageContext = React.createContext({
  reduxState: warehouseListInitialState,
  dispatch: undefined
});
export default function WarehouseListComponent() {
  // warehouseListState 当前hooks state 将需要进行组件交流的数据放到 redux 中。
  const [warehouseListState, dispatch] = React.useReducer(WarehouseListReducer, warehouseListInitialState);

  const {
    state,
    $auth,
    changeTablePageIndex,
    callbackAction,
    handleFormDataChange,
    getTableData,
    closeShippingSpaceModal,
    addShippingSpace
  } = useWarehouseListStore(warehouseListState);
  const { currentSelectNode } = warehouseListState;
  const {
    isLoading,
    searchForm,
    tableData,
    total,
    totalAlarm,
    totalNumber,
    addShippingSpaceVisible,
    isEditShippingSpaceModal,
    editShippingSpaceId
  } = state;

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="仓位名">
              <Input
                disabled={!currentSelectNode}
                allowClear
                placeholder="请输入仓位名"
                value={searchForm.name}
                onChange={($event: any) => handleFormDataChange($event, 'name')}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" disabled={!currentSelectNode} onClick={() => getTableData()} loading={isLoading}>
          查询
        </Button>
      </div>
    );
  }

  function renderOtherButtons() {
    return (
      <div className="other-search-button-item">
        <Button
          type="primary"
          disabled={!currentSelectNode || !$auth['addPosition']}
          onClick={() => addShippingSpace()}
          loading={isLoading}
        >
          添加仓位
        </Button>
        <Button type="primary" ghost style={{ cursor: 'auto' }}>
          {' '}
          库存总数: {!currentSelectNode ? '**' : totalNumber}
        </Button>
        {/* <div className={style.totalShow}> */}
        {/* 库存总数: {!currentSelectNode ? '**' : totalNumber} */}
        {/* <span>({totalAlarm})</span> */}
        {/* </div> */}
      </div>
      // <div className={style.totalShow}>
      //   库存总数: {!currentSelectNode ? '**' : totalNumber}
      //   {/* <span>({totalAlarm})</span> */}
      // </div>
    );
  }
  // component --- 渲染table
  function renderTable() {
    return (
      <ITableComponent
        columns={wareHouseListColumns(callbackAction, $auth)}
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

  // component --- 渲染添加仓位的modal
  function RenderShippingSpaceModal() {
    const addShippingSpaceProps = {
      addShippingSpaceVisible,
      isEdit: isEditShippingSpaceModal,
      shippingSpaceId: editShippingSpaceId,
      closeShippingSpaceModal
    };
    return <AddShippingSpaceComponent {...addShippingSpaceProps}></AddShippingSpaceComponent>;
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
      <RenderShippingSpaceModal />
    </WarehouseListManageContext.Provider>
  );
}
