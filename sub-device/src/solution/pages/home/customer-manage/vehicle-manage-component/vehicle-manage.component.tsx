import * as React from 'react';
import style from './vehicle-manage.component.less';
import { TablePageTelComponent, TimePickerComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { vehicleManageColumns, vehicleManageExpandedRow } from './vehicle-manage.column';
import { useVehicleManageStore } from './vehicle-manage.component.store';

import { Button, Col, Form, Input, Row, Select } from 'antd';
import { ModalType } from './vehicle-manage.interface';
import UnbindDeviceComponent from './unbind-device-component/unbind-device.component';

const { Option } = Select;

export default function VehicleManageComponent() {
  const {
    state,
    searchForm,
    initSearchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    onSelectRows
  } = useVehicleManageStore();
  const { isLoading, tableData, total, pageIndex, pageSize, isUnbindDevice } = state;
  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="keyword" label="查询车辆">
              <Input allowClear placeholder="车牌号/车架号" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="owner" label="查询车主">
              <Input allowClear placeholder="手机号" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="device" label="查询设备">
              <Input allowClear placeholder="设备号/SIM卡" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="timeInfo" label="采购时间">
              <TimePickerComponent pickerType="dateRange" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="distributor" label="所属经销商">
              <Select></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="financial" label="所属金融机构">
              <Select></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="count" label="单个车辆设备数">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick}>
          查询
        </Button>
        <Button onClick={initSearchForm}>清空</Button>
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => callbackAction(ModalType.CREATE)}>
          新建
        </Button>
        <Button onClick={() => callbackAction(ModalType.IMPORT)}>批量导入</Button>
        <Button onClick={() => callbackAction(ModalType.EXPORT)}>批量导出</Button>
      </div>
    );
  }
  function RenderTable() {
    const rowSelection = {
      // selectedRowKeys,
      onChange: onSelectRows
    };
    return (
      <ITableComponent
        columns={vehicleManageColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        data={tableData}
        total={total}
        isPagination={true}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: vehicleManageExpandedRow,
          expandIconColumnIndex: 1
        }}
        changeTablePageIndex={(pageIndex: number, pageSize: number) => changeTablePageIndex(pageIndex, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'车辆管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <UnbindDeviceComponent visible={isUnbindDevice} close={handleModalCancel} />
    </React.Fragment>
  );
}
