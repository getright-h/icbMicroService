import * as React from 'react';
import style from './user-manage.component.less';
import { useUserManageStore } from './user-manage.component.store';
import { Input, Button } from 'antd';
import { ITableComponent, TablePageTelComponent } from '~/solution/components/component.module';
import { userColumns } from './user-colomns';
import OrganizationLeftComponent from '../../organization-manage-component/organization-left-component/organization-left.component';

export default function UserManageComponent() {
  const { state, changeTablePageIndex, tableAction, getSelectTreeNode } = useUserManageStore();
  const { isLoading, searchForm, total, tableData } = state;
  function renderPageLeft() {
    return <OrganizationLeftComponent getSelectTreeNode={getSelectTreeNode}></OrganizationLeftComponent>;
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
        <Button type="primary">添加用户</Button>
        <Button>部门管理</Button>
        <Button>岗位管理</Button>
      </div>
    );
  }
  function renderTable() {
    return (
      <ITableComponent
        columns={userColumns(tableAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number) => changeTablePageIndex(index)}
      ></ITableComponent>
    );
  }
  return (
    <TablePageTelComponent
      leftFlex={1}
      rightFlex={5}
      pageName={'用户管理'}
      pageLeft={renderPageLeft()}
      selectItems={renderSelectItems()}
      searchButton={renderSearchButtons()}
      otherSearchBtns={renderOtherButtons()}
      table={renderTable()}
    ></TablePageTelComponent>
  );
}
