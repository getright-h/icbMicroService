import * as React from 'react';
import style from './monitor-manage.component.less';
import { TablePageTelComponent } from '~/framework/components/component.module';
import { useMonitorManageStore } from './monitor-manage.component.store';
import { IHeaderTitleComponent, ITableComponent } from '~framework/components/component.module';
import { monitorColumns } from './monitor-manage-column';
import { Form, Button, Input } from 'antd';

export default function MonitorManageComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    onChange,
    searchClick,
    searchValueChange,
    getMonitorGroupList
  } = useMonitorManageStore();
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
      </div>
    );
  }
  function RenderTable() {
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `owner ${i}`,
        phone: 156654651654,
        deviceCode: Math.random()
          .toString(16)
          .slice(4, 16),
        totalNUmber: i
      });
    }

    return (
      <ITableComponent
        columns={monitorColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={data}
        total={total}
        isPagination={true}
        rowSelection={[]}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  function renderPageLeft() {
    const { Search } = Input;
    return (
      <div className={style.monitorGroup}>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="输入监控组名称"
          onChange={searchValueChange}
          onSearch={getMonitorGroupList}
          enterButton
        />
      </div>
    );
  }
  return (
    <div className={style.monitor}>
      <IHeaderTitleComponent pageName={'监控组管理'}>
        <div className={style.btnArea}>
          <Button>添加监控组</Button>
          <div>
            <Button>添加监控车辆</Button>
            <Button style={{ marginLeft: 20 }}>批量转组</Button>
          </div>
        </div>
      </IHeaderTitleComponent>
      <TablePageTelComponent
        selectItems={renderSelectItems()}
        pageLeft={renderPageLeft}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      />
    </div>
  );
}
