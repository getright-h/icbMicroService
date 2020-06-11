import * as React from 'react';
import style from './station-manage.component.less';
import { useStationManageStore } from './station-manage.component.store';
import { Input, Button, Select } from 'antd';
import { ITableComponent, TablePageTelComponent } from '~/solution/components/component.module';
import { stationColumns } from './station-columns';

export default function StationManageComponent() {
  const { state, changeTablePageIndex } = useStationManageStore();
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
          <span className="label">所属部门：</span>
          {/* <DrapChooseLoadingComponent
            placeholder="请选择所属部门"
            reqUrl=""
            defaultValue={searchForm.distributorName || undefined}
            type={1}
            getCurrentSelectInfo={(v: any) => serviceProviderChange(v, 'distributorName')}
          ></DrapChooseLoadingComponent> */}
          <Input />
        </div>
        <div className="push-search-item">
          <span className="label">岗位名称：</span>
          <Input
            allowClear
            placeholder="请输入岗位名称"
            // value={searchForm.keyWord}
            // onChange={($event: any) => handleFormDataChange($event, 'keyWord')}
          />
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
        <Button type="primary">添加岗位</Button>
      </div>
    );
  }
  function renderTable() {
    return (
      <ITableComponent
        columns={stationColumns}
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
      pageName={'岗位管理'}
      selectItems={renderSelectItems()}
      searchButton={renderSearchButtons()}
      otherSearchBtns={renderOtherButtons()}
      table={renderTable()}
    ></TablePageTelComponent>
  );
}
