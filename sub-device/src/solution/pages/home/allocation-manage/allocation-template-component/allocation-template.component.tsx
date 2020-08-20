import * as React from 'react';
import style from './allocation-template.component.less';
import { TablePageTelComponent, TimePickerComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { allocationTemplateColumns } from './allocation-template.column';
import { useAllocationTemplateStore } from './allocation-template.component.store';

import { Button, Input, Select } from 'antd';
import { ModalType } from './allocation-template.interface';

const { Option } = Select;

export default function AllocationTemplateComponent() {
  const { state, callbackAction, changeTablePageIndex, searchClick, onChange } = useAllocationTemplateStore();
  const { isLoading, searchForm, tableData, total } = state;
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">流程名称:</span>
          <Input
            allowClear
            placeholder="请输入流程名称"
            onChange={e => {
              onChange(e.target.value, 'keyword');
            }}
          />
        </div>
        <div className="push-search-item">
          <span className="label">创建机构:</span>
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
          <span className="label">创建时间:</span>
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
        <Button type="primary">清空</Button>
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <Button type="primary" onClick={() => callbackAction(ModalType.CREATE)}>
        新建调拨流程
      </Button>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={allocationTemplateColumns(callbackAction)}
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
    <TablePageTelComponent
      pageName={'设备调拨模板'}
      selectItems={renderSelectItems()}
      searchButton={renderSearchButtons()}
      otherSearchBtns={renderOtherButtons()}
      table={<RenderTable />}
    ></TablePageTelComponent>
  );
}
