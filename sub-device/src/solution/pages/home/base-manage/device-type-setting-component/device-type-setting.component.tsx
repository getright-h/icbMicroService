import * as React from 'react';
import style from './device-type-setting.component.less';
import { ModalType } from '../base-manage.const';
import { useDeviceTypeSettingStore } from './device-type-setting.component.store';
import { devicetypeColumns } from './device-setting-column';
import { TablePageTelComponent, IHeaderTitleComponent, ITableComponent } from '~/framework/components/component.module';
import { Button, Input } from 'antd';
import AddDeviceTypeModalComponent from './add-device-type-component/add-device-type.component';

export default function DeviceTypeSettingComponent() {
  const { state } = useDeviceTypeSettingStore();
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    onChange,
    searchClick,
    searchValueChange,
    getMonitorGroupList,
    handleCloseVisible,
    getTableList
  } = useDeviceTypeSettingStore();
  const { isLoading, searchForm = {}, tableData, total, addDeviceTypeVisible } = state;
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">查询设备型号:</span>
          <Input
            allowClear
            placeholder="选择设备型号"
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
          搜索
        </Button>
        <Button type="primary" onClick={() => callbackAction(ModalType.ADD)}>
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
      <IHeaderTitleComponent pageName={'设备型号设置'} />

      <TablePageTelComponent
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      />
      <AddDeviceTypeModalComponent visible={addDeviceTypeVisible} close={handleCloseVisible} fetchData={getTableList} />
    </div>
  );
}
