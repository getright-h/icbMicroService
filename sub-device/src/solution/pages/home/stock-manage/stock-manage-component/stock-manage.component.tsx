import * as React from 'react';
import style from './stock-manage.component.less';
import { useStockManageStore } from './stock-manage.component.store';
import {
  TablePageTelComponent,
  ITableComponent,
  ISelectLoadingComponent
} from '~/framework/components/component.module';
import { stockManageColumns } from './stock-manage.column';
import { Button, Input, Select, Form, Row, Col } from 'antd';
import StockManageLeftComponent from './stock-manage-left-component/stock-manage-left.component';
import { ModalType } from './stock-manage.interface';
import DeviceStockInComponent from './device-stock-in-component/device-stock-in.component';
import BulkImportComponent from './bulk-import-component/bulk-import.component';
import DeviceEditComponent from './device-edit-component/device-edit.component';
import { useReducer, createContext } from 'react';
import { stockListInitialState, StockListReducer } from './stock-list-redux/stock-list-reducer';

export const StockListManageContext = createContext({
  reduxState: stockListInitialState,
  dispatch: undefined
});

export default function StockManageComponent() {
  const [stockListState, dispatch] = useReducer(StockListReducer, stockListInitialState);
  const {
    state,
    searchForm,
    changeTablePageIndex,
    callbackAction,
    onSelectRows,
    searchClick,
    initSearchform,
    modalCancel
  } = useStockManageStore(stockListState);
  const { currentSelectNode } = stockListState;
  const {
    isLoading,
    tableData,
    total,
    stockInVisible,
    bulkImportVisible,
    deviceEditVisible,
    currentId,
    pageIndex,
    pageSize,
    totalStock
  } = state;

  function stockMainInfo() {
    return (
      <>
        <h3 style={{ color: '#7958fa' }}>
          当前仓库：{!currentSelectNode ? '未选择' : `${currentSelectNode.organizationName}-${currentSelectNode.name}`}
        </h3>
        <h3>库存：{totalStock} 件</h3>
      </>
    );
  }
  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="deviceValue" label="搜索设备">
              <Input allowClear placeholder="设备号 / SIM卡号"></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="typeId" label="设备型号">
              <ISelectLoadingComponent
                reqUrl="queryDeviceTypeList"
                placeholder="选择设备型号"
                getCurrentSelectInfo={(value: string, option: any) => {
                  searchForm.setFieldsValue({ typeId: value });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="storePositionId" label="仓位">
              <ISelectLoadingComponent
                reqUrl="queryStorePositionList"
                placeholder="选择仓位"
                disabled={!currentSelectNode}
                searchForm={{ storeId: currentSelectNode ? currentSelectNode.key : '' }}
                getCurrentSelectInfo={(value: string, option: any) => {
                  searchForm.setFieldsValue({ storePositionId: value });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="state" label="设备状态">
              <Select placeholder="请选择设备状态">
                <Select.Option value={-1}>全部</Select.Option>
                <Select.Option value={1}>正常</Select.Option>
                <Select.Option value={2}>故障</Select.Option>
                <Select.Option value={3}>损坏</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="duration" label="入库时长">
              <Input placeholder="停留天数" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="isAlarm" label="仓位超时报警">
              <Select placeholder="请选择是否超时报警">
                <Select.Option value={-1}>全部</Select.Option>
                <Select.Option value={1}>是</Select.Option>
                <Select.Option value={0}>否</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="purchaseId" label="采购单">
              <ISelectLoadingComponent
                reqUrl="queryPurchaseSelectList"
                placeholder="选择采购单"
                getCurrentSelectInfo={(value: string, option: any) => {
                  searchForm.setFieldsValue({ purchaseId: value });
                }}
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
        <Button type="primary" onClick={searchClick} disabled={!currentSelectNode}>
          查询
        </Button>
        <Button onClick={initSearchform}>清空</Button>
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <div className="other-search-button-item">
        <Button
          type="primary"
          onClick={() => {
            callbackAction(ModalType.ADD);
          }}
          disabled={!currentSelectNode}
        >
          设备入库
        </Button>
        <Button
          onClick={() => {
            callbackAction(ModalType.IMPORT);
          }}
          disabled={!currentSelectNode}
        >
          批量导入
        </Button>
        <Button
          onClick={() => {
            callbackAction(ModalType.EXPORT);
          }}
          disabled={!currentSelectNode}
        >
          批量导出
        </Button>
      </div>
    );
  }
  const rowSelection = {
    // selectedRowKeys,
    onChange: onSelectRows
  };
  function renderTable() {
    return (
      <ITableComponent
        columns={stockManageColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(pageIndex: number, pageSize: number) => changeTablePageIndex(pageIndex, pageSize)}
        rowSelection={rowSelection}
        rowKey="materialId"
      ></ITableComponent>
    );
  }
  return (
    <StockListManageContext.Provider value={{ reduxState: stockListState, dispatch }}>
      <TablePageTelComponent
        leftFlex={1}
        rightFlex={4}
        PageLeftComponent={StockManageLeftComponent}
        pageName={'全部设备管理'}
        selectTags={stockMainInfo()}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={renderTable()}
      ></TablePageTelComponent>
      <DeviceStockInComponent visible={stockInVisible} close={modalCancel} />
      <BulkImportComponent visible={bulkImportVisible} close={modalCancel} />
      <DeviceEditComponent id={currentId} visible={deviceEditVisible} close={modalCancel} />
    </StockListManageContext.Provider>
  );
}
