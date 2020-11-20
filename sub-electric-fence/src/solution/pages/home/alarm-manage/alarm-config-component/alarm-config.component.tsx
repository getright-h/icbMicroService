import { Button, Col, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ITableComponent, TablePageTelComponent } from '~/solution/components/component.module';
import { AlarmConfigColumn } from './alarm-config.column';
import style from './alarm-config.component.less';
import { useAlarmConfigStore } from './alarm-config.component.store';

export default function AlarmConfigComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm
  } = useAlarmConfigStore();
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
            <Form.Item name="name" label="报警模板">
              <Input placeholder="请输入模板名称" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="supervisor" label="监管人">
              <Select placeholder="请选择监管人"></Select>
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

  function renderOtherSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary">
          <Link to="">报警配置</Link>
        </Button>
      </div>
    );
  }

  function RenderTable() {
    return (
      <ITableComponent
        columns={AlarmConfigColumn(callbackAction)}
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
        pageName={'报警配置管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
    </React.Fragment>
  );
}
