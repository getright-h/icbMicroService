import * as React from 'react';
import style from './stock-manage.component.less';
import { useStockManageStore } from './stock-manage.component.store';
import { TablePageTelComponent, ITableComponent } from '~/framework/components/component.module';
import { stockManageColumns } from './stock-manage.column';
import { Button, Input, Select } from 'antd';
import StockManageLeftComponent from './stock-manage-left-component/stock-manage-left.component';
import { ModalType } from './stock-manage.interface';
import DeviceStockInComponent from './device-stock-in-component/device-stock-in.component';
import BulkImportComponent from './bulk-import-component/bulk-import.component';
import DeviceEditComponent from './device-edit-component/device-edit.component';

export default function StockManageComponent() {
  const {
    state,
    changeTablePageIndex,
    callbackAction,
    onSelectRows,
    searchClick,
    handleSearchFormChange,
    clearSearchform,
    modalCancel
  } = useStockManageStore();
  const { isLoading, searchForm, tableData, total, stockInVisible, bulkImportVisible, deviceEditVisible } = state;

  function renderPageLeft() {
    return <StockManageLeftComponent />;
  }
  function stockMainInfo() {
    return (
      <>
        <h3>库存：X 件</h3>
      </>
    );
  }
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">搜索设备：</span>
          <Select
            allowClear
            placeholder="设备号 / SIM卡号"
            onChange={value => {
              handleSearchFormChange(value, 'keyword');
            }}
          ></Select>
        </div>
        <div className="push-search-item">
          <span className="label">设备型号：</span>
          <Select
            allowClear
            placeholder="请选择设备型号"
            onChange={value => {
              handleSearchFormChange(value, 'keyword');
            }}
          ></Select>
        </div>
        <div className="push-search-item">
          <span className="label">仓位：</span>
          <Select
            allowClear
            placeholder="请选择仓位"
            onChange={value => {
              handleSearchFormChange(value, 'keyword');
            }}
          ></Select>
        </div>
        <div className="push-search-item">
          <span className="label">设备状态：</span>
          <Select
            allowClear
            placeholder="请选择设备状态"
            onChange={value => {
              handleSearchFormChange(value, 'keyword');
            }}
          ></Select>
        </div>
        <div className="push-search-item">
          <span className="label">入库时长：</span>
          <Input
            allowClear
            placeholder="停留天数"
            onChange={e => {
              handleSearchFormChange(e.target.value, 'keyword');
            }}
          />
        </div>
        <div className="push-search-item">
          <span className="label">仓位超时报警：</span>
          <Select
            allowClear
            placeholder="请选择"
            onChange={value => {
              handleSearchFormChange(value, 'keyword');
            }}
          >
            <Select.Option value={1}>是</Select.Option>
            <Select.Option value={0}>否</Select.Option>
          </Select>
        </div>
        <div className="push-search-item">
          <span className="label">采购单：</span>
          <Select
            allowClear
            placeholder="请输入采购单号"
            onChange={value => {
              handleSearchFormChange(value, 'keyword');
            }}
          ></Select>
        </div>
      </>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick}>
          查询
        </Button>
        <Button type="primary" onClick={clearSearchform}>
          清空
        </Button>
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
        >
          设备入库
        </Button>
        <Button
          onClick={() => {
            callbackAction(ModalType.IMPORT);
          }}
        >
          批量导入
        </Button>
        <Button
          onClick={() => {
            callbackAction(ModalType.EXPORT);
          }}
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
  function RenderTable() {
    return (
      <ITableComponent
        columns={stockManageColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.page}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
        rowSelection={rowSelection}
      ></ITableComponent>
    );
  }
  return (
    <React.Fragment>
      <TablePageTelComponent
        leftFlex={1}
        rightFlex={4}
        pageLeft={renderPageLeft()}
        pageName={'全部设备管理'}
        selectTags={stockMainInfo()}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <DeviceStockInComponent visible={stockInVisible} close={modalCancel} />
      <BulkImportComponent visible={bulkImportVisible} close={modalCancel} />
      <DeviceEditComponent visible={deviceEditVisible} close={modalCancel} />
    </React.Fragment>
  );
}
