import React from 'react';
import style from './in-out-stock.component.less';
import { useInOutStockStore } from './in-out-stock.component.store';
import { Input, Button, Select, Row, Form, Col } from 'antd';
import { TablePageTelComponent, ITableComponent, TimePickerComponent } from '~/framework/components/component.module';
import { inOutStockColumns } from './in-out-stock.column';
import StockRecordComponent from './stock-record-component/stock-record.component';
import StockDeviceComponent from './stock-device-component/stock-device.component';

export default function InOutStockComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    modalClose,
    initSearchform,
    getDateTimeInfo
  } = useInOutStockStore();
  const {
    isLoading,
    tableData,
    total,
    deviceVisible,
    recordVisible,
    currentId,
    pageIndex,
    pageSize,
    statistics
  } = state;

  function renderStockInfo() {
    return (
      <div className={style.mainInfo}>
        <h3>总库存：{statistics.totalNumber}</h3>
        <h3>入库数量：{statistics.inNumber}</h3>
        <h3>出库数量：{statistics.outNumber}</h3>
      </div>
    );
  }

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }} initialValues={{ type: -1 }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="storeName" label="仓库名">
              <Input allowClear placeholder="请输入仓库名" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="timeInfo" label="时间">
              <TimePickerComponent pickerType="dateRange" getDateTimeInfo={getDateTimeInfo} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="type" label="方式">
              <Select allowClear placeholder="请选择操作类型">
                <Select.Option value={-1}>全部</Select.Option>
                <Select.Option value={2}>出库</Select.Option>
                <Select.Option value={1}>入库</Select.Option>
              </Select>
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
        <Button onClick={initSearchform}>清空</Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={inOutStockColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(pageIndex: number, pageSize: number) => changeTablePageIndex(pageIndex, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'出入库记录'}
        selectTags={statistics && renderStockInfo()}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <StockRecordComponent visible={recordVisible} close={modalClose} id={currentId} />
      <StockDeviceComponent visible={deviceVisible} close={modalClose} id={currentId} />
    </React.Fragment>
  );
}
