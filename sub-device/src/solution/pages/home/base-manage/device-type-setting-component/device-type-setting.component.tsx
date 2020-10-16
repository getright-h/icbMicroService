import * as React from 'react';
import style from './device-type-setting.component.less';
import { useDeviceTypeSettingStore } from './device-type-setting.component.store';
import { devicetypeColumns } from './device-setting-column';
import { TablePageTelComponent, IHeaderTitleComponent, ITableComponent } from '~/framework/components/component.module';
import { Button, Input } from 'antd';
export default function DeviceTypeSettingComponent() {
  const { state } = useDeviceTypeSettingStore();
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    onChange,
    searchClick,
    searchValueChange,
    getMonitorGroupList
  } = useDeviceTypeSettingStore();
  const { isLoading, searchForm = {}, tableData, total } = state;
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">查找车辆:</span>
          <Input
            allowClear
            placeholder="请输入设备号/车架号"
            onChange={e => {
              onChange(e.target.value, 'keyword');
            }}
          />
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
          新增供应商
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
        creator: 156654651654,
        createTime: Math.random()
          .toString(16)
          .slice(4, 16),
        contract: i
      });
    }

    return (
      <ITableComponent
        columns={devicetypeColumns(callbackAction)}
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
      <IHeaderTitleComponent pageName={'供应商设置'} />

      <TablePageTelComponent
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      />
    </div>
  );
}
