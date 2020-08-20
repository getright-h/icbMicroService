import * as React from 'react';
import style from './purchase-order.component.less';
import { TablePageTelComponent, TimePickerComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { purchaseOrderColumns } from './purchase-order.column';
import { usePurchaseOrderStore } from './purchase-order.component.store';

import { Button, Input, Select } from 'antd';
import { ModalType } from './purchase-order.interface';
import EditOrderComponent from './edit-order-component/edit-order.component';
import OrderDetailComponent from './order-detail-component/order-detail.component';

const { Option } = Select;

export default function PurchaseOrderComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    onChange
  } = usePurchaseOrderStore();
  const { isLoading, searchForm, tableData, total, detailVisible, editVisible } = state;
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">机构:</span>
          <Select placeholder="请选择"></Select>
        </div>
        <div className="push-search-item">
          <span className="label">采购单:</span>
          <Input
            allowClear
            placeholder="请输入采购单名称/采购单号"
            onChange={e => {
              onChange(e.target.value, 'keyword');
            }}
          />
        </div>
        <div className="push-search-item">
          <span className="label">采购时间:</span>
          <TimePickerComponent pickerType="dateRange" />
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
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => callbackAction(ModalType.CREATE)}>
          新增采购单
        </Button>
        <Button onClick={() => callbackAction(ModalType.EXPORT)}>导出采购单</Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={purchaseOrderColumns(callbackAction)}
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
        pageName={'采购单管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <EditOrderComponent visible={editVisible} close={handleModalCancel} />
      <OrderDetailComponent visible={detailVisible} close={handleModalCancel} />
    </React.Fragment>
  );
}
