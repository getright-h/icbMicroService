import * as React from 'react';
import style from './in-out-stock.component.less';
import { useInOutStockStore } from './in-out-stock.component.store';
import { Input, Button, Select } from 'antd';
import { TablePageTelComponent, ITableComponent, TimePickerComponent } from '~/framework/components/component.module';
import { inOutStockColumns } from './in-out-stock.column';
import StockRecordComponent from './stock-record-component/stock-record.component';
import StockDeviceComponent from './stock-device-component/stock-device.component';

export default function InOutStockComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleSearchFormChange,
    modalClose
  } = useInOutStockStore();
  const { isLoading, searchForm, tableData, total, deviceVisible, recordVisible, currentId } = state;

  function renderStockInfo() {
    return (
      <div className={style.mainInfo}>
        <h3>总库存：</h3>
        <h3>入库数量：</h3>
        <h3>出库数量：</h3>
      </div>
    );
  }

  function renderSelectItems() {
    return (
      <React.Fragment>
        <div className="push-search-item">
          <span className="label">仓位名：</span>
          <Input
            allowClear
            placeholder="请输入仓位名"
            onChange={e => {
              handleSearchFormChange(e.target.value, 'keyword');
            }}
          />
        </div>
        <div className="push-search-item">
          <span className="label">时间：</span>
          <TimePickerComponent pickerType="dateRange" />
        </div>
        <div className="push-search-item">
          <span className="label">方式：</span>
          <Select allowClear placeholder="请选择操作类型">
            <Select.Option value={1}>出库</Select.Option>
            <Select.Option value={0}>入库</Select.Option>
          </Select>
        </div>
      </React.Fragment>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick}>
          查询
        </Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={inOutStockColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.page}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'出入库记录'}
        selectTags={renderStockInfo()}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <StockRecordComponent visible={recordVisible} close={modalClose} id={currentId} />
      <StockDeviceComponent visible={deviceVisible} close={modalClose} id={currentId} />
    </React.Fragment>
  );
}
