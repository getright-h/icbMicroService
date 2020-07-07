import * as React from 'react';
import style from './monitoring-object.component.less';
import { TablePageTelComponent, ITableComponent, TimePickerComponent } from '~/solution/components/component.module';
import { stationColumns } from './monitoring-object.component.column';
import { useMonitoringObjectStore } from './monitoring-object.component.store';
import { Input, Button, Modal } from 'antd';
import CreateBindCarComponent from './create-bind-car-component/create-bind-car.component';
import { ModalType } from './monitoring-object.interface';

export default function MonitoringObjectComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    handleModalCancel,
    handleModalOk,
    searchClick,
    getDateTimeInfo,
    openModal
  } = useMonitoringObjectStore();
  const {
    isLoading,
    searchForm,
    tableData,
    total,
    visibleModal,
    modalTitle,
    confirmModalLoading,
    modalContainer
  } = state;

  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">围栏名称：</span>
          <Input placeholder="请输入围栏名查询" />
        </div>
        <div className="push-search-item">
          <span className="label">车辆所属：</span>
          <Input placeholder="请输入机构名/车辆名" />
        </div>
        <div className="push-search-item">
          <span className="label">车辆信息：</span>
          <Input placeholder="车主电话/姓名" />
        </div>
        <div className="push-search-item">
          <span className="label">绑定日期：</span>
          <TimePickerComponent pickerType="dateRange" getDateTimeInfo={getDateTimeInfo}></TimePickerComponent>
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

  function ModalDetail() {
    return (
      <Modal
        title={modalTitle}
        visible={visibleModal}
        width={700}
        onOk={handleModalOk}
        confirmLoading={confirmModalLoading}
        style={{ top: 20 }}
        onCancel={handleModalCancel}
      >
        {modalContainer}
      </Modal>
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
        pageName={'围栏管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <ModalDetail />
    </>
  );
}
