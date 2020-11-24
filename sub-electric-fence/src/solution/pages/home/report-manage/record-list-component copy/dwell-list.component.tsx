import { Button, Col, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import { ITableComponent, TablePageTelComponent } from '../statistical-list-component/statistical-list-component copy/node_modules/~/solution/components/component.module';
import { DwellColumn } from './dwell-list.column';
import { useDwellListStore } from './dwell-list.component.store';

export default function DirectiveListComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm
  } = useDwellListStore();
  const { isLoading, tableData, total, pageIndex, pageSize } = state;

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
        columns={DwellColumn(callbackAction)}
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
    </React.Fragment>
  );
}
