import * as React from 'react';
import style from './init-allocation.component.less';
import { TablePageTelComponent, TimePickerComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { initAllocationColumns } from './init-allocation.column';
import { useInitAllocationStore } from './init-allocation.component.store';

import { Button, Input, Select } from 'antd';
import { ModalType } from './init-allocation.interface';
import DeviceImportComponent from './device-import-component/device-import.component';
import RollbackApplyComponent from './rollback-apply-component/rollback-apply.component';

const { Option } = Select;

export default function InitAllocationComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    onChange
  } = useInitAllocationStore();
  const { isLoading, searchForm, tableData, total, importVisible, rollbackVisible } = state;
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">调拨单号:</span>
          <Input
            allowClear
            placeholder="请输入调拨单号"
            onChange={e => {
              onChange(e.target.value, 'keyword');
            }}
          />
        </div>
        <div className="push-search-item">
          <span className="label">目标仓库:</span>
          <Input
            allowClear
            placeholder="请输入仓库名"
            onChange={e => {
              onChange(e.target.value, 'keyword');
            }}
          />
        </div>
        <div className="push-search-item">
          <span className="label">调拨状态:</span>
          <Select
            defaultValue=""
            placeholder="请选择"
            onChange={value => {
              onChange(value, 'status');
            }}
          >
            <Option value="">全部</Option>
          </Select>
        </div>
        <div className="push-search-item">
          <span className="label">调拨时间:</span>
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
        <Button>清空</Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={initAllocationColumns(callbackAction)}
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
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <DeviceImportComponent visible={importVisible} close={handleModalCancel} />
      <RollbackApplyComponent visible={rollbackVisible} close={handleModalCancel} />
    </React.Fragment>
  );
}
