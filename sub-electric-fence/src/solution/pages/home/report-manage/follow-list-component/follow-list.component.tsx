import { Button, Col, Form, Input, Row, Select, Modal, Timeline } from 'antd';
import React from 'react';
import { ITableComponent, TablePageTelComponent } from '~/solution/components/component.module';
import { AlarmParameterColumn } from './follow-list.column';
import { useDirectiveListStore } from './follow-list.component.store';
import SloveModalComponent from './slove-modal-component/slove-modal.component';
export default function DirectiveListComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    handleModalCancel
  } = useDirectiveListStore();
  const { isLoading, tableData, total, pageIndex, pageSize, recordModalVisible, sloveModalVisible } = state;

  function showRecordModal() {
    Modal.success({
      title: '跟进记录',
      content: (
        <Timeline style={{ marginTop: '30px' }}>
          <p>跟进详情: </p>
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
      ),
      onOk: () => handleModalCancel()
    });
  }
  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="type" label="报警类型">
              <Input placeholder="请输入报警类型" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="method" label="下发方式">
              <Select placeholder="请选择下发方式"></Select>
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
  function RenderTable() {
    return (
      <ITableComponent
        columns={AlarmParameterColumn(callbackAction)}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        data={[{ name: 1 }]}
        total={total}
        isPagination={true}
        changeTablePageIndex={(pageIndex: number, pageSize: number) => changeTablePageIndex(pageIndex, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'报警跟进表'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <SloveModalComponent visible={state.sloveModalVisible} close={handleModalCancel} />
      {recordModalVisible && !sloveModalVisible && showRecordModal()}
    </React.Fragment>
  );
}
