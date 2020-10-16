import * as React from 'react';
import style from './supplier-setting.component.less';
import { useSupplierSettingStore } from './supplier-setting.component.store';
import { sppplierColumns } from './supplier-setting-column';
import { TablePageTelComponent, IHeaderTitleComponent, ITableComponent } from '~/framework/components/component.module';
import { Button, Input, Select } from 'antd';
export default function SupplierSettingComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    onChange,
    searchClick,
    searchValueChange,
    getMonitorGroupList
  } = useSupplierSettingStore();
  const { isLoading, searchForm = {}, tableData, total } = state;
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">查询设备型号:</span>
          <Select
            allowClear
            placeholder="请输入设备号/车架号"
            onChange={e => {
              onChange(e, 'keyword');
            }}
          >
            {' '}
          </Select>
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
        <Button type="primary" onClick={searchClick}>
          新增设备型号
        </Button>
      </div>
    );
  }
  function RenderTable() {
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        supplier: `owner ${i}`,
        phone: 156654651654,
        address: Math.random()
          .toString(16)
          .slice(4, 16),
        contract: i
      });
    }

    return (
      <ITableComponent
        columns={sppplierColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={data}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <div className={style.monitor}>
      <IHeaderTitleComponent pageName={'设备型号设置'} />

      <TablePageTelComponent
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      />
    </div>
  );
}
