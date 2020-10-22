import * as React from 'react';
import style from './owner-manage.component.less';
import { TablePageTelComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { ownerManageExpandedRow, ownerManageColumns } from './owner-manage.column';
import { useOwnerManageStore } from './owner-manage.component.store';

import { Button, Col, Form, Input, Row, Select } from 'antd';
import { ModalType } from './owner-manage.interface';
import EditOwnerInfoComponent from './edit-owner-info-component/edit-owner-info.component';
import OwnerInfoDetailComponent from './owner-info-detail-component/owner-info-detail.component';

const { Option } = Select;

export default function OwnerManageComponent() {
  const {
    state,
    searchForm,
    initSearchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    onSelectRows,
    handleModalCancel,
    openModal
  } = useOwnerManageStore();
  const { isLoading, tableData, total, pageIndex, pageSize, editVisible, detailVisible, currentId } = state;
  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="keyword" label="查询车主">
              <Input allowClear placeholder="车主名/电话号/证件号"></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="gender" label="车主性别">
              <Select placeholder="请选择车主性别">
                <Select.Option value={-1}>全部</Select.Option>
                <Select.Option value={1}>男</Select.Option>
                <Select.Option value={2}>女</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="level" label="车主跟进等级">
              <Select placeholder="请选择跟进等级">
                <Select.Option value={-1}>全部</Select.Option>
                <Select.Option value={1}>A</Select.Option>
                <Select.Option value={2}>B</Select.Option>
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
        columns={ownerManageColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        data={tableData}
        total={total}
        isPagination={true}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: ownerManageExpandedRow,
          expandIconColumnIndex: 1
        }}
        changeTablePageIndex={(pageIndex: number, pageSize: number) => changeTablePageIndex(pageIndex, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'车主管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <EditOwnerInfoComponent visible={editVisible} close={handleModalCancel} id={currentId} />
      <OwnerInfoDetailComponent visible={detailVisible} close={handleModalCancel} id={currentId} />
    </React.Fragment>
  );
}
