import React from 'react';
import style from './allocation-template.component.less';
import { useAllocationTemplateStore } from './allocation-template.component.store';
import { Button, Input } from 'antd';
import {
  TablePageTelComponent,
  ISelectLoadingComponent,
  TimePickerComponent,
  ITableComponent
} from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { allocationTemplateColumns } from './allocation-template.column';

export default function AllocationTemplateComponent() {
  const {
    state,
    addAllocationTemplate,
    getTableData,
    getSelectOrganazationInfo,
    callbackAction,
    handleFormDataChange,
    changeTablePageIndex,
    getDateTimeInfo
  } = useAllocationTemplateStore();
  const { isLoading, editOrganizationName, searchForm, total, tableData } = state;
  const { gState } = React.useContext(GlobalContext);

  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => getTableData()} loading={isLoading}>
          查询
        </Button>
        <Button type="primary" onClick={() => addAllocationTemplate()}>
          新增调拨模板
        </Button>
      </div>
    );
  }

  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">查找流程：</span>
          <Input
            allowClear
            placeholder="请输入查找流程"
            value={searchForm.name}
            onChange={($event: any) => handleFormDataChange($event, 'name')}
          />
        </div>
        <div className="push-search-item">
          <span className="label">创建机构：</span>
          {ISelectLoadingComponent({
            placeholder: '请选择机构',
            showSearch: true,
            searchKey: editOrganizationName,
            searchForm: {
              systemId: gState.myInfo.systemId
            },
            reqUrl: 'queryStoreOrganization',
            getCurrentSelectInfo: getSelectOrganazationInfo
          })}
        </div>
        <div className="push-search-item">
          <span className="label">创建时间：</span>
          <TimePickerComponent pickerType="dateRange" getDateTimeInfo={getDateTimeInfo} />
        </div>
      </>
    );
  }

  // component --- 渲染table
  function renderTable() {
    return (
      <ITableComponent
        columns={allocationTemplateColumns(callbackAction)}
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
    <TablePageTelComponent
      leftFlex={1}
      rightFlex={5}
      pageName={'调拨模板设置'}
      searchButton={renderSearchButtons()}
      selectItems={renderSelectItems()}
      table={renderTable()}
    ></TablePageTelComponent>
  );
}
