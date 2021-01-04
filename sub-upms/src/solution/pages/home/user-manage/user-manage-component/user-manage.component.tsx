import React from 'react';
import style from './user-manage.component.less';
import { useUserManageStore } from './user-manage.component.store';
import { Input, Button } from 'antd';
import { ITableComponent, TablePageTelComponent, IEditPasswordComponent } from '~/solution/components/component.module';
import { userColumns } from './user-colomns';
import UserLeftComponent from './user-left-component/user-left.component';
import AddUserComponent from './add-user-component/add-user.component';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function UserManageComponent() {
  const {
    state,
    getTableData,
    changeTablePageIndex,
    tableAction,
    getSelectTreeNode,
    handleFormDataChange,
    addUser,
    popClose
  } = useUserManageStore();
  const { isLoading, searchForm, total, tableData, popVisible, isEdit, isDetail, userId, passwordVisible } = state;
  const { gState }: IGlobalState = React.useContext(GlobalContext);

  function renderPageLeft() {
    return gState.myInfo.systemId && <UserLeftComponent getSelectTreeNode={getSelectTreeNode}></UserLeftComponent>;
  }
  function renderSelectItems() {
    return (
      <React.Fragment>
        <div className="push-search-item">
          <span className="label">用户名称：</span>
          <Input
            allowClear
            placeholder="请输入用户名称"
            onChange={($event: any) => handleFormDataChange($event, 'name')}
          />
        </div>
        <div className="push-search-item">
          <span className="label">用户电话：</span>
          <Input
            allowClear
            placeholder="请输入用户电话"
            onChange={($event: any) => handleFormDataChange($event, 'telephone')}
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
        <Button type="primary" onClick={() => addUser()}>
          添加用户
        </Button>
        {/* <Button>部门管理</Button>
        <Button>岗位管理</Button> */}
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
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }
  return (
    <React.Fragment>
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
      {popVisible && (
        <AddUserComponent visible={popVisible} isEdit={isEdit} isDetail={isDetail} userId={userId} close={popClose} />
      )}
      {passwordVisible && <IEditPasswordComponent visible={passwordVisible} userId={userId} close={popClose} />}
    </React.Fragment>
  );
}
