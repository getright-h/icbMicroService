import React from 'react';
import style from './department-manage.component.less';
import { useDepartmentManageStore } from './department-manage.component.store';
import { Input, Select, Button } from 'antd';
import {
  ITableComponent,
  TablePageTelComponent,
  ISelectLoadingComponent
} from '~/solution/components/component.module';
import { departmentColumns } from './department-columns';
import EditDepartmentComponent from './edit-department-component/edit-department.component';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function DepartmentManageComponent() {
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  const {
    state,
    getTableData,
    changeTablePageIndex,
    tableAction,
    handleFormDataChange,
    addDepartment,
    popclose
  } = useDepartmentManageStore();
  const { isLoading, searchForm, total, tableData, editDepartmentVisible } = state;
  function renderSelectItems() {
    return (
      <React.Fragment>
        <div className="push-search-item">
          <span className="label">所属机构：</span>
          <ISelectLoadingComponent
            reqUrl="queryOrganizationSelectList"
            placeholder="请选择所属机构"
            searchForm={{ systemId: gState.myInfo.systemId, hierarchyType: 0 }}
            getCurrentSelectInfo={(value, option) => handleFormDataChange(value, 'code', option)}
          ></ISelectLoadingComponent>
        </div>
        <div className="push-search-item">
          <span className="label">部门名称：</span>
          <Input
            allowClear
            placeholder="请输入部门名称"
            onChange={($event: React.ChangeEvent<HTMLInputElement>) =>
              handleFormDataChange($event.target.value, 'name')
            }
          />
        </div>
        <div className="push-search-item">
          <span className="label">状态：</span>
          <Select
            allowClear
            placeholder="请选择状态"
            onChange={($event: number) => handleFormDataChange($event, 'state')}
          >
            <Select.Option value={-1}>全部</Select.Option>
            <Select.Option value={1}>启用</Select.Option>
            <Select.Option value={0}>禁用</Select.Option>
          </Select>
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
        <Button type="primary" onClick={addDepartment}>
          添加部门
        </Button>
      </div>
    );
  }
  function renderTable() {
    return (
      <ITableComponent
        columns={departmentColumns(tableAction)}
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
        pageName={'部门管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={renderTable()}
      ></TablePageTelComponent>
      {editDepartmentVisible && (
        <EditDepartmentComponent
          title={state.isEdit ? '编辑部门' : '添加部门'}
          visible={editDepartmentVisible}
          close={popclose}
          info={state.editDepartmentInfo}
          isEdit={state.isEdit}
        ></EditDepartmentComponent>
      )}
    </React.Fragment>
  );
}
