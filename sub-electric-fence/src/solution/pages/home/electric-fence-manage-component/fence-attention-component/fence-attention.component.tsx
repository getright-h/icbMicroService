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
    confirmModalLoading,
    modalContainer
  } = state;

  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <div className="label">围栏名</div>
          <Input placeholder="请输入围栏名" />
        </div>
        <div className="push-search-item">
          <div className="label">车辆所属</div>
          <Input placeholder="请输入机构名或者车队名" />
        </div>
        <div className="push-search-item">
          <div className="label">车辆信息</div>
          <Input placeholder="车主电话/车主姓名/车牌号" />
        </div>
        <div className="push-search-item">
          <div className="label">状态</div>
          <Select defaultValue="lucy">
            <Option value="jack">已处理</Option>
            <Option value="lucy">未处理</Option>
          </Select>
        </div>
        <div className="push-search-item">
          <div className="label">告警时间</div>
          <TimePickerComponent pickerType="dateRange" getDateTimeInfo={getDateTimeInfo}></TimePickerComponent>

          {/* <RangePicker
            dateRender={current => {
              const style = {};

              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {current.date()}
                </div>
              );
            }}
          /> */}
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
  function renderFenceAttentionTable() {
    return (
      <div className={style.test}>
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
      </div>
    );
  }
  function ModalDetail() {
    return (
      <Modal
        title={modalTitle}
        visible={visibleModal}
        width={1000}
        onOk={handleModalOk}
        confirmLoading={confirmModalLoading}
        onCancel={handleModalCancel}
      >
        {modalContainer}
      </Modal>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'围栏告警'}
        leftFlex={0}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderFenceAttentionTable()}
      ></TablePageTelComponent>
      <ModalDetail />
    </React.Fragment>
  );
}
