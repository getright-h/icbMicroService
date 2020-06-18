import * as React from 'react';
import style from './organization-manage.component.less';
import { TablePageTelComponent, ITableComponent } from '~/solution/components/component.module';
import { useOrganizationManageStore } from './organization-manage.component.store';
import { Input, Button } from 'antd';
import { organizationColumns } from './organization-columns';
import { RouteComponentProps } from 'react-router-dom';
import OrganizationLeftComponent from './organization-left-component/organization-left.component';

export default function OrganizationManageComponent(props: RouteComponentProps) {
  const { state, changeTablePageIndex, addButtonClick, tableAction, getSelectTreeNode } = useOrganizationManageStore();
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
          <span className="label">机构类型：</span>
          {/* <DrapChooseLoadingComponent
            placeholder="请选择机构类型"
            reqUrl=""
            defaultValue={searchForm.distributorName || undefined}
            type={1}
            getCurrentSelectInfo={(v: any) => serviceProviderChange(v, 'distributorName')}
          ></DrapChooseLoadingComponent> */}
          <Input />
        </div>
        <div className="push-search-item">
          <span className="label">机构名：</span>
          <Input
            allowClear
            placeholder="请输入机构名"
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
        <Button type="primary" onClick={() => addButtonClick(props)}>
          添加
        </Button>
        <Button type="primary">导出</Button>
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
