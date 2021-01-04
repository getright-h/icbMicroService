import React from 'react';
import style from './fence-attention.component.less';
import { Button, Input, Modal, Select } from 'antd';
import { TablePageTelComponent } from '~/solution/components/base/table-page-tel-component/table-page-tel.component';

import { ITableComponent, TimePickerComponent, ISelectLoadingComponent } from '~/solution/components/component.module';
import { stationColumns } from './fence-attention-component.column';
import { useFenceAttentionStore } from './fence-attention.component.store';

const { Option } = Select;

export default function FenceAttentionComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    getDateTimeInfo,
    handleModalCancel,
    getFormInfo,
    handleModalOk
  } = useFenceAttentionStore();
  const {
    isLoading,
    searchForm,
    tableData,
    total,
    searchLoading,
    visibleModal,
    modalTitle,
    modalWidth,
    confirmModalLoading,
    modalContainer
  } = state;

  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">围栏名:</span>
          <ISelectLoadingComponent
            getCurrentSelectInfo={value => getFormInfo('fenceId', value)}
            placeholder="请输入围栏名"
            reqUrl="fenceList"
          ></ISelectLoadingComponent>
          {/* <Input placeholder="请输入围栏名" /> */}
        </div>
        <div className="push-search-item">
          <span className="label">车辆所属:</span>
          <ISelectLoadingComponent
            getCurrentSelectInfo={value => getFormInfo('fenceDdlBelong', value)}
            placeholder="请输入机构名/车队名"
            reqUrl="fenceDdlBelong"
          ></ISelectLoadingComponent>
        </div>
        <div className="push-search-item">
          <span className="label">车辆信息:</span>
          <ISelectLoadingComponent
            getCurrentSelectInfo={value => getFormInfo('vehicleId', value)}
            placeholder="车主电话/车主姓名/车牌号"
            reqUrl="fenceDdlVehicleInfo"
          ></ISelectLoadingComponent>
        </div>
        <div className="push-search-item">
          <span className="label">状态:</span>
          <Select placeholder="请选择" onChange={value => getFormInfo('status', value)}>
            <Option value="10">已处理</Option>
            <Option value="0">未处理</Option>
          </Select>
        </div>
        <div className="push-search-item">
          <span className="label">告警时间:</span>
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
      <div>
        <Button type="primary" onClick={() => changeTablePageIndex(1)} loading={searchLoading}>
          查询
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
  function ModalDetail() {
    return (
      <Modal
        title={modalTitle}
        visible={visibleModal}
        width={modalWidth}
        onOk={handleModalOk}
        confirmLoading={confirmModalLoading}
        onCancel={handleModalCancel}
      >
        {modalContainer}
      </Modal>
    );
  }

  return (
    <>
      <TablePageTelComponent
        pageName={'围栏告警'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <ModalDetail />
    </>
  );
}
