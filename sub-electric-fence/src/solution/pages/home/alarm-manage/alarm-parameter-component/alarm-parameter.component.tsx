import { Button, Col, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import { ITableComponent, TablePageTelComponent } from '~/solution/components/component.module';
import { AlarmParameterColumn } from './alarm-parameter.column';
import style from './alarm-parameter.component.less';
import { useAlarmParameterStore } from './alarm-parameter.component.store';
import TemplateAddComponent from './template-add-component/template-add.component';
import TemplateListComponent from './template-list-component/template-list.component';

export default function AlarmParameterComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm,
    handleModalCancel
  } = useAlarmParameterStore();
  const { isLoading, tableData, total, pageIndex, pageSize, tempAddVisible, tempListVisible } = state;

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="type" label="报警类型">
              <Input placeholder="请输入报警类型" />
            </Form.Item>
          </Col>
          <Col span={8}>
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
      <TemplateAddComponent visible={tempAddVisible} close={handleModalCancel} />
      <TemplateListComponent visible={tempListVisible} close={handleModalCancel} />
    </React.Fragment>
  );
}
