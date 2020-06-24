import * as React from 'react';
import style from './organization-manage.component.less';
import { TablePageTelComponent, ITableComponent } from '~/solution/components/component.module';
import { useOrganizationManageStore } from './organization-manage.component.store';
import { Input, Button, Tree } from 'antd';
import { organizationColumns } from './organization-columns';
import { RouteComponentProps } from 'react-router-dom';
import OrganizationLeftComponent from './organization-left-component/organization-left.component';

export default function OrganizationManageComponent(props: RouteComponentProps) {
  const {
    state,
    changeTablePageIndex,
    addButtonClick,
    tableAction,
    getSelectTreeNode,
    handleFormDataChange,
    getTableData
  } = useOrganizationManageStore();
  const { isLoading, searchForm, total, tableData } = state;
  function renderPageLeft() {
    return (
      <>
        <h3>组织机构管理</h3>
        <OrganizationLeftComponent getSelectTreeNode={getSelectTreeNode}></OrganizationLeftComponent>
      </>
    );
  }
  function renderSelectItems() {
    return (
      <React.Fragment>
        <div className="push-search-item">
          <span className="label">机构名：</span>
          <Input
            allowClear
            placeholder="请输入机构名"
            value={searchForm.name}
            onChange={($event: any) => handleFormDataChange($event, 'name')}
          />
        </div>
      </React.Fragment>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="push-search-button-item">
        <Button type="primary" onClick={() => getTableData(true)} loading={isLoading}>
          查询
        </Button>
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => addButtonClick(props)}>
          添加
        </Button>
        <Button type="primary" disabled>
          导出
        </Button>
      </div>
    );
  }
  function renderTable() {
    return (
      <ITableComponent
        columns={organizationColumns(tableAction)}
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
      pageName={'机构管理'}
      pageLeft={renderPageLeft()}
      selectItems={renderSelectItems()}
      searchButton={renderSearchButtons()}
      otherSearchBtns={renderOtherButtons()}
      table={renderTable()}
    ></TablePageTelComponent>
  );
}
