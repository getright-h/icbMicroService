import { Button, Col, Form, Input, Row, Select } from 'antd';
import * as React from 'react';
import { ITableComponent, TablePageTelComponent } from '~/solution/components/component.module';
import { AlarmType } from '~/solution/shared/constant/alarm.const';
import { AlarmParameterColumn } from './alarm-parameter.column';
import style from './alarm-parameter.component.less';
import { useAlarmParameterStore } from './alarm-parameter.component.store';
import TemplateAddComponent from './template-add-component/template-add.component';
import TemplateListComponent from './template-list-component/template-list.component';
const Option = Select.Option;

export default function AlarmParameterComponent() {
  const {
    state,
    $auth,
    searchForm,
    callbackAction,
    initSearchForm,
    handleModalCancel,
    getTableData
  } = useAlarmParameterStore();
  const { isLoading, tableData, total, tempAddVisible, tempListVisible, currentTemplate } = state;

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...layout} form={searchForm} style={{ width: '90%' }} initialValues={{ downMode: -1, code: '' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="code" label="报警类型">
              <Select placeholder="请选择报警类型">
                <Option value={''} key={'alarm-all'}>
                  全部
                </Option>
                {AlarmType.map(type => (
                  <Option value={type.value} key={`alarm-${type.value}`}>
                    {type.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="downMode" label="下发方式">
              <Select placeholder="请选择下发方式">
                <Option value={-1}>全部</Option>
                <Option value={2}>发送平台</Option>
                <Option value={1}>发送设备</Option>
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
        <Button type="primary" onClick={getTableData}>
          查询
        </Button>
        <Button onClick={initSearchForm}>清空</Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={AlarmParameterColumn(callbackAction, $auth)}
        isLoading={isLoading}
        pageIndex={1}
        pageSize={50}
        data={tableData}
        total={total}
        isPagination={false}
        changeTablePageIndex={null}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'参数管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      {tempAddVisible && (
        <TemplateAddComponent visible={tempAddVisible} close={handleModalCancel} info={currentTemplate} />
      )}
      {tempListVisible && (
        <TemplateListComponent visible={tempListVisible} close={handleModalCancel} info={currentTemplate} />
      )}
    </React.Fragment>
  );
}
