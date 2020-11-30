import { Button, Col, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import { ITableComponent, TablePageTelComponent } from '~/solution/components/component.module';
import { AlarmParameterColumn } from './directive-list.column';
import { useDirectiveListStore } from './directive-list.component.store';
import DirectivePatchModalComponent from '../wiget/directive-patch-model-component/directive-patch-moda.component';
import { ModalType } from './directive-list.interface';
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
  const { isLoading, tableData, total, pageIndex, pageSize, patchModalVisible } = state;

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="type" label="查询车辆">
              <Input placeholder="请输入车牌号" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="method" label="查询设备">
              <Select placeholder="请选择下发方式"></Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="method" label="监控类型">
              <Select placeholder="请选择下发方式"></Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="method" label="发送时间">
              <Select placeholder="请选择下发方式"></Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="method" label="监控组">
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
        <Button type="primary" onClick={() => callbackAction(ModalType.PATCH)}>
          下发指令
        </Button>
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
        pageName={'报警参数管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      <DirectivePatchModalComponent visible={patchModalVisible} close={handleModalCancel} />
    </React.Fragment>
  );
}
