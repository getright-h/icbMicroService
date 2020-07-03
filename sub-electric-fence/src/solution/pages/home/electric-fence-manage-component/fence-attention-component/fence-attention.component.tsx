import * as React from 'react';
import style from './fence-attention.component.less';
import { Button, Input, Modal, Form, Select, DatePicker } from 'antd';
import { TablePageTelComponent } from '~/solution/components/base/table-page-tel-component/table-page-tel.component';

import { ITableComponent, TimePickerComponent } from '~/solution/components/component.module';
import { stationColumns } from './fence-attention-component.column';
import { useFenceAttentionStore } from './fence-attention.component.store';

const { RangePicker } = DatePicker;

const { Option } = Select;

export default function FenceAttentionComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    getDateTimeInfo,
    handleModalCancel,
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
          <Input placeholder="请输入围栏名" />
        </div>
        <div className="push-search-item">
          <span className="label">车辆所属:</span>
          <Input placeholder="请输入机构名/车队名" />
        </div>
        <div className="push-search-item">
          <span className="label">车辆信息:</span>
          <Input placeholder="车主电话/车主姓名/车牌号" />
        </div>
        <div className="push-search-item">
          <span className="label">状态:</span>
          <Select defaultValue="lucy">
            <Option value="jack">已处理</Option>
            <Option value="lucy">未处理</Option>
          </Select>
        </div>
        <div className="push-search-item">
          <span className="label">告警时间:</span>
          <TimePickerComponent pickerType="dateRange" getDateTimeInfo={getDateTimeInfo}></TimePickerComponent>
        </div>
      </>
    );
  }
  function renderSearchButtons() {
    return (
      <div>
        <Button type="primary" onClick={searchClick} loading={searchLoading}>
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
        style={{ top: 20 }}
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
