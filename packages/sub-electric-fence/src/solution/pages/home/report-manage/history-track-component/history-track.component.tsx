import { Button, Col, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import {
  InputExportFilenameComponent,
  ITableComponent,
  TablePageTelComponent,
  TimePickerComponent
} from '~/solution/components/component.module';
import { HistoryTrackColumn } from './history-track.column';
import style from './history-track.component.less';
import { useHistoryTrackStore } from './history-track.component.store';

export default function HistoryTrackComponent() {
  const {
    state,
    searchForm,
    // callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    getCurrentInfo,
    handleExport,
    handleExportVisible
  } = useHistoryTrackStore();
  const { isLoading, tableData, total, pageIndex, pageSize, timeInfo } = state;

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form form={searchForm} {...layout} style={{ width: '90%' }} initialValues={{ state: -1 }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="deviceCode" label="查询设备" rules={[{ required: true }]}>
              <Input placeholder="设备号" allowClear={true} onChange={e => getCurrentInfo(e, 'device')} />
            </Form.Item>
          </Col>
          {/* <Col span={5}>
            <Form.Item name="state" label="设备状态">
              <Select placeholder="请选择设备状态">
                <Select.Option value={-1}>全部</Select.Option>
                <Select.Option value={1}>在线</Select.Option>
                <Select.Option value={2}>离线</Select.Option>
                <Select.Option value={3}>拆除</Select.Option>
              </Select>
            </Form.Item>
          </Col> */}
          <Col span={11}>
            <Form.Item label="时间范围" name="time">
              <TimePickerComponent
                timeInfo={timeInfo}
                pickerType="dateTimeRange"
                getDateTimeInfo={(time: any, other: any) => getCurrentInfo(time, 'time')}
              />
            </Form.Item>
          </Col>
          {/* <Col span={8}>
            <Form.Item name="strValue" label="查询车辆">
              <Input placeholder="车牌号/车架号" allowClear={true} />
            </Form.Item>
          </Col> */}
        </Row>
      </Form>
    );
  }

  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick} loading={isLoading}>
          查询
        </Button>
        <Button onClick={initSearchForm}>清空</Button>
        <Button type="primary" disabled={!state.canExport} onClick={() => handleExportVisible(true)}>
          导出
        </Button>
      </div>
    );
  }

  function RenderTable() {
    return (
      <ITableComponent
        columns={HistoryTrackColumn()}
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
        pageName={'历史轨迹数据'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <InputExportFilenameComponent
        visible={state.exportVisible}
        getValues={v => handleExport(v.name)}
        close={() => handleExportVisible(false)}
      />
    </React.Fragment>
  );
}
