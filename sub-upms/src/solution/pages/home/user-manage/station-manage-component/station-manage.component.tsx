import * as React from 'react';
import style from './station-manage.component.less';
import { useStationManageStore } from './station-manage.component.store';
import { Input, Button, Select } from 'antd';
import {
  ITableComponent,
  TablePageTelComponent,
  ISelectLoadingComponent
} from '~/solution/components/component.module';
import { stationColumns } from './station-columns';
import EditStationComponent from './edit-station-component/edit-station.component';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export default function StationManageComponent() {
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  const {
    state,
    changeTablePageIndex,
    tableAction,
    popclose,
    addStation,
    getTableData,
    handleFormDataChange
  } = useStationManageStore();
  const { isLoading, searchForm, total, tableData } = state;
  function renderSelectItems() {
    return (
      <React.Fragment>
        <div className="push-search-item">
          <span className="label">所属机构：</span>
          <ISelectLoadingComponent
            reqUrl="queryOrganizationSelectList"
            placeholder="请选择所属机构"
            searchForm={{ systemId: gState.myInfo.systemId, hierarchyType: 0 }}
            getCurrentSelectInfo={(value, option) => handleFormDataChange(value, 'parentOrganizationCode', option)}
          ></ISelectLoadingComponent>
        </div>
        <div className="push-search-item">
          <span className="label">所属部门：</span>
          <ISelectLoadingComponent
            reqUrl="queryOrganizationSelectList"
            placeholder="请选择所属部门"
            searchForm={{
              systemId: gState.myInfo.systemId,
              hierarchyType: 1,
              parentCode: searchForm.parentOrganizationCode
            }}
            getCurrentSelectInfo={(value, option) => handleFormDataChange(value, 'code', option)}
          ></ISelectLoadingComponent>
        </div>
        <div className="push-search-item">
          <span className="label">岗位名称：</span>
          <Input
            allowClear
            placeholder="请输入岗位名称"
            value={searchForm.name}
            onChange={($event: React.ChangeEvent<HTMLInputElement>) =>
              handleFormDataChange($event.target.value, 'name')
            }
          />
        </div>
        <div className="push-search-item">
          <span className="label">状态：</span>
          <Select
            placeholder="请选择状态"
            value={searchForm.state}
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
        <Button type="primary" onClick={addStation}>
          添加岗位
        </Button>
      </div>
    );
  }
  function renderTable() {
    return (
      <ITableComponent
        columns={stationColumns(tableAction)}
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
        pageName={'岗位管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={renderTable()}
      ></TablePageTelComponent>
      {state.editStationVisible && (
        <EditStationComponent
          title={state.isEdit ? '编辑岗位' : '添加岗位'}
          visible={state.editStationVisible}
          close={popclose}
          info={state.editStationInfo}
          isEdit={state.isEdit}
        ></EditStationComponent>
      )}
    </React.Fragment>
  );
}
