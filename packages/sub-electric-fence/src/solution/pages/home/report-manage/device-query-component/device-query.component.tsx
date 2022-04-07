import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import * as React from 'react';
import { TablePageTelComponent, TimePickerComponent } from '~/solution/components/component.module';
import style from './device-query.component.less';
import { useDeviceQueryStore } from './device-query.component.store';

export default function DeviceQueryComponent() {
  const { state, searchForm, searchClick, initSearchForm } = useDeviceQueryStore();
  const { isLoading } = state;

  function renderSelectItems() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form form={searchForm} {...layout} style={{ width: '90%' }} initialValues={{ state: -1 }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="deviceCode" label="查询设备" rules={[{ required: true, message: '请输入设备号' }]}>
              <Input placeholder="设备号" allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="时间范围" name="time" rules={[{ required: true, message: '请选择时间' }]}>
              <DatePicker.RangePicker />
            </Form.Item>
          </Col>
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
      </div>
    );
  }

  function renderMainContent() {
    const contentList = state.content?.split('\n');
    return (
      <div className={style.analyse}>
        <div className={style.analyseTitle}>设备内容</div>
        <div className={style.analyseContent}>
          {!!contentList?.length ? contentList.map((item, i) => <p key={i}>{item}</p>) : <span>暂无数据</span>}
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        pageName={'设备内容查询服务'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderMainContent()}
      ></TablePageTelComponent>
    </React.Fragment>
  );
}
