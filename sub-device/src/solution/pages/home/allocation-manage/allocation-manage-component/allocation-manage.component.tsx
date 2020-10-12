import * as React from 'react';
import style from './allocation-manage.component.less';
import { TablePageTelComponent, ITableComponent, TimePickerComponent } from '~/framework/components/component.module';
import { allocationManageColumns } from './allocation-manage.column';
import { useAllocationManageStore } from './allocation-manage.component.store';

import { Button, Input, Select } from 'antd';
import { ModalType } from './allocation-manage.interface';
import { AllOT_STATE } from '~shared/constant/common.const';
import TransferRecordComponent from './transfer-record-component/transfer-record.component';

const { Option } = Select;

export default function AllocationManageComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    onChange
  } = useAllocationManageStore();
  const { isLoading, searchForm, tableData, total, visibleModal } = state;
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">输入调拨单号:</span>
          <Input
            allowClear
            placeholder="请输入调拨单号"
            onChange={e => {
              onChange(e.target.value, 'keyword');
            }}
          />
        </div>
        <div className="push-search-item">
          <span className="label">查找创建时间:</span>
          <TimePickerComponent pickerType={'dateRange'} />
        </div>
        <div className="push-search-item">
          <span className="label">调拨状态:</span>
          <Select
            defaultValue={''}
            placeholder="请选择"
            onChange={value => {
              onChange(value, 'status');
            }}
          >
            {AllOT_STATE.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </div>
      </>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick}>
          搜索
        </Button>
        <Button>清空</Button>
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <Button type="primary" onClick={() => callbackAction(ModalType.CREATE)}>
        申请调拨单
      </Button>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={allocationManageColumns(callbackAction)}
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
        pageName={'调拨单'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <TransferRecordComponent visible={visibleModal} close={handleModalCancel} />
    </React.Fragment>
  );
}
