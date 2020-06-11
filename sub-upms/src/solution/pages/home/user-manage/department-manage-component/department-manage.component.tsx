import * as React from 'react';
import style from './department-manage.component.less';
import { useDepartmentManageStore } from './department-manage.component.store';
import { Input, Select, Button } from 'antd';
import { ITableComponent, TablePageTelComponent } from '~/solution/components/component.module';
import { departmentColumns } from './department-columns';

export default function DepartmentManageComponent() {
  const { state, changeTablePageIndex } = useDepartmentManageStore();
  const { isLoading, searchForm, total, tableData } = state;
  function renderSelectItems() {
    return (
      <React.Fragment>
        <div className="push-search-item">
          <span className="label">所属机构：</span>
          {/* <DrapChooseLoadingComponent
            placeholder="请选择所属机构"
            reqUrl=""
            defaultValue={searchForm.distributorName || undefined}
            type={1}
            getCurrentSelectInfo={(v: any) => serviceProviderChange(v, 'distributorName')}
          ></DrapChooseLoadingComponent> */}
          <Input />
        </div>
        <div className="push-search-item">
          <span className="label">部门名称：</span>
          <Input
            allowClear
            placeholder="请输入部门名称"
            // value={searchForm.keyWord}
            // onChange={($event: any) => handleFormDataChange($event, 'keyWord')}
          />
        </div>
        <div className="push-search-item">
          <span className="label">上级机构：</span>
          {/* <DrapChooseLoadingComponent
            placeholder="请选择上级机构"
            reqUrl=""
            defaultValue={searchForm.distributorName || undefined}
            type={1}
            getCurrentSelectInfo={(v: any) => serviceProviderChange(v, 'distributorName')}
          ></DrapChooseLoadingComponent> */}
          <Input />
        </div>
        <div className="push-search-item">
          <span className="label">状态：</span>
          <Select
            allowClear
            placeholder="请选择状态"
            // value={searchForm.keyWord}
            // onChange={($event: any) => handleFormDataChange($event, 'keyWord')}
          >
            <Select.Option value="1">启用</Select.Option>
            <Select.Option value="0">禁用</Select.Option>
          </Select>
        </div>
      </React.Fragment>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="push-search-button-item">
        <Button
          type="primary"
          // onClick={searchClick} loading={searchLoading}
        >
          查询
        </Button>
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary">添加部门</Button>
      </div>
    );
  }
  function renderTable() {
    return (
      <ITableComponent
        columns={departmentColumns}
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
      pageName={'部门管理'}
      selectItems={renderSelectItems()}
      searchButton={renderSearchButtons()}
      otherSearchBtns={renderOtherButtons()}
      table={renderTable()}
    ></TablePageTelComponent>
  );
}
