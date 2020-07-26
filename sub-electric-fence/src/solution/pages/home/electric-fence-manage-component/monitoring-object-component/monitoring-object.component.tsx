import * as React from 'react';
import {
  TablePageTelComponent,
  ITableComponent,
  TimePickerComponent,
  ISelectLoadingComponent
} from '~/solution/components/component.module';
import { stationColumns } from './monitoring-object.component.column';
import { useMonitoringObjectStore } from './monitoring-object.component.store';
import { Input, Button, Modal } from 'antd';
import { ModalType } from './monitoring-object.interface';

export default function MonitoringObjectComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    getDateTimeInfo,
    getFormSearchInfo,
    openModal
  } = useMonitoringObjectStore();
  const { isLoading, searchForm, tableData, total } = state;

  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">围栏名称：</span>
          <ISelectLoadingComponent
            getCurrentSelectInfo={value => getFormSearchInfo('fenceId', value)}
            placeholder="请输入围栏名"
            reqUrl="fenceList"
          ></ISelectLoadingComponent>
        </div>
        <div className="push-search-item">
          <span className="label">车辆所属：</span>
          <ISelectLoadingComponent
            getCurrentSelectInfo={value => getFormSearchInfo('fenceDdlBelong', value)}
            placeholder="请输入机构名/车队名"
            reqUrl="fenceDdlBelong"
          ></ISelectLoadingComponent>
        </div>
        <div className="push-search-item">
          <span className="label">车辆信息：</span>
          <ISelectLoadingComponent
            getCurrentSelectInfo={value => getFormSearchInfo('vehicleId', value)}
            placeholder="车主电话/车主姓名/车牌号"
            reqUrl="fenceDdlVehicleInfo"
          ></ISelectLoadingComponent>
        </div>
        <div className="push-search-item">
          <span className="label">绑定日期：</span>
          <TimePickerComponent
            pickerType="dateRange"
            timeInfo={[searchForm.begin, searchForm.end]}
            getDateTimeInfo={getDateTimeInfo}
          ></TimePickerComponent>
        </div>
      </>
    );
  }

  function renderSearchButtons() {
    return (
      <div className="push-search-button-item">
        <Button type="primary" onClick={searchClick}>
          查询
        </Button>
      </div>
    );
  }

  function renderOtherButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => openModal(ModalType.BINDCAR)}>
          绑定车辆
        </Button>
        <Button type="primary" onClick={() => openModal(ModalType.FENCETYPE)}>
          围栏模式
        </Button>
      </div>
    );
  }

  function RenderTable() {
    return (
      <ITableComponent
        columns={stationColumns(callbackAction)}
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
    <>
      <TablePageTelComponent
        pageName={'监控对象'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
    </>
  );
}
