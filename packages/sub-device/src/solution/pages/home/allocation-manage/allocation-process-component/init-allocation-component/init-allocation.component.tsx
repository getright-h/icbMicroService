import * as React from 'react';

import { TablePageTelComponent, TimePickerComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { initAllocationColumns } from './init-allocation.column';
import { useInitAllocationStore } from './init-allocation.component.store';
import { ALLOW_FLOW } from '~shared/constant/common.const';
import { Button, Input, Select, Form, Row, Col } from 'antd';
import DeviceImportComponent from './device-import-component/device-import.component';
import RollbackApplyComponent from './rollback-apply-component/rollback-apply.component';

const { Option } = Select;

export default function InitAllocationComponent() {
  const {
    state,
    form,
    $auth,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    getTableData,
    onChange,
    allocationOperate,
    searchClean
  } = useInitAllocationStore();

  const { isLoading, searchForm, tableData, total, importVisible, rollbackVisible, currentData } = state;
  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={form} initialValues={{}}>
        <Row gutter={24}>
          <Col span={8}>
            {' '}
            <Form.Item label="调拨单号" name="allotCode">
              <Input
                allowClear
                placeholder="请输入调拨单号"
                onChange={e => {
                  onChange(e.target.value, 'allotCode');
                }}
              />
            </Form.Item>{' '}
          </Col>
          <Col span={8}>
            {' '}
            <Form.Item label="目标仓库">
              <Input
                allowClear
                placeholder="请输入仓库名"
                onChange={e => {
                  onChange(e.target.value, 'storeName');
                }}
              />
            </Form.Item>{' '}
          </Col>
          <Col span={8}>
            {' '}
            <Form.Item label="调拨状态">
              <Select
                defaultValue={-1}
                placeholder="请选择"
                onChange={value => {
                  onChange(value, 'state');
                }}
              >
                {ALLOW_FLOW.map((item: any, index: number) => (
                  <Option key={index} value={item.value}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>{' '}
          </Col>
          <Col span={8}>
            <Form.Item label="调拨时间">
              <TimePickerComponent
                pickerType="dateRange"
                getDateTimeInfo={(time: any, other: any) => onChange(time, 'time')}
              />
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
        <Button onClick={searchClean}>清空</Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        multRowkey={['allotId', 'id']}
        columns={initAllocationColumns(callbackAction, $auth)}
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
    <React.Fragment>
      <TablePageTelComponent
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      {/* <DeviceImportComponent visible={importVisible} close={handleModalCancel} /> */}
      {importVisible && (
        <DeviceImportComponent
          visible={importVisible}
          close={handleModalCancel}
          data={currentData}
          getTableData={getTableData}
        />
      )}
      {rollbackVisible && (
        <RollbackApplyComponent
          allocationOperate={allocationOperate}
          visible={rollbackVisible}
          close={handleModalCancel}
          data={currentData}
          getTableData={getTableData}
        />
      )}
    </React.Fragment>
  );
}
