import * as React from 'react';
import { TablePageTelComponent, TimePickerComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { receiveAllocationColumns } from './receive-allocation.column';
import { useReceiveAllocationStore } from './receive-allocation.component.store';
import { ALLOW_FLOW } from '~shared/constant/common.const';
import { Button, Input, Select } from 'antd';
import RejectAllocationComponent from './reject-allocation-component/reject-allocation.component';
const { Option } = Select;

export default function ReceiveAllocationComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    onChange,
    getTableData,
    allocationOperate
  } = useReceiveAllocationStore();
  const { isLoading, searchForm, tableData, total, currentData, rejectVisibleModal, currentActionType } = state;
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
            defaultValue={-1}
            placeholder="请选择"
            onChange={value => {
              onChange(value, 'state');
            }}
          >
            {ALLOW_FLOW.map((item: any, index: number) => (
              <Option key={index} value={item.value}>
                {item.title}
              </Option>
            ))}
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
        columns={receiveAllocationColumns(callbackAction)}
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
    <React.Fragment>
      <TablePageTelComponent
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <RejectAllocationComponent
        allocationOperate={allocationOperate}
        visible={rejectVisibleModal}
        data={currentData}
        getTableData={getTableData}
        close={handleModalCancel}
        currentActionType={currentActionType}
      />
    </React.Fragment>
  );
}
