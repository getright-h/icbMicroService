import React from 'react';
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
    handleModalCancel
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
            <Form.Item name="name" label="车主姓名">
              <Input allowClear placeholder="请输入车主姓名"></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="mobile" label="车主电话">
              <Input allowClear placeholder="请输入车主电话"></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="certificateNo" label="车主证件">
              <Input allowClear placeholder="请输入车主证件号"></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="sex" label="车主性别">
              <Select placeholder="请选择车主性别">
                <Select.Option value={-1}>全部</Select.Option>
                <Select.Option value={0}>女</Select.Option>
                <Select.Option value={1}>男</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="follow" label="车主跟进等级">
              <Select placeholder="请选择跟进等级">
                <Select.Option value={-1}>全部</Select.Option>
                <Select.Option value={100}>所有方式跟进</Select.Option>
                <Select.Option value={1}>仅短信方式</Select.Option>
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
          新增车主
        </Button>
        {/* <Button onClick={() => callbackAction(ModalType.IMPORT)} disabled>
          批量导入
        </Button>
        <Button onClick={() => callbackAction(ModalType.EXPORT)} disabled>
          批量导出
        </Button> */}
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
        // rowSelection={rowSelection}
        // expandable={{
        //   expandedRowRender: ownerManageExpandedRow,
        //   expandIconColumnIndex: 1
        // }}
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
      {editVisible && <EditOwnerInfoComponent visible={editVisible} close={handleModalCancel} id={currentId} />}
      {detailVisible && <OwnerInfoDetailComponent visible={detailVisible} close={handleModalCancel} id={currentId} />}
    </React.Fragment>
  );
}
