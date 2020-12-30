import { Form, Table } from 'antd';
import * as React from 'react';
import { IHeaderTitleComponent } from '~components/component.module';
import style from './statistical-detail.component.less';

import { useDirectiveListStore } from './statistical-detail.component.store';

export default function DirectiveListComponent() {
  const {
    state,
    searchForm,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    initSearchForm
  } = useDirectiveListStore();
  const detail = {};
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 }
  };
  const data = [
    {
      code: '2010/13/21/9:50',
      address: '西部智谷'
    },
    {
      code: '2010/13/21/9:50',
      address: '西部智谷'
    }
  ];
  const columns = [
    {
      title: '报警时间',
      dataIndex: 'code'
    },
    {
      title: '报警地址',
      dataIndex: 'address'
    }
  ];
  return (
    <div className={style.mainForm}>
      <IHeaderTitleComponent pageName={'报警统计'} />
      <Form {...layout}>
        <div className={style.formPart}>
          <div className={style.formItems}>
            <div className={style.formLeft}>
              <Form.Item label="车主姓名"></Form.Item>
              <Form.Item label="车牌号"></Form.Item>
              <Form.Item label="设备号"></Form.Item>
              <Form.Item label="报警类型"></Form.Item>
              <Form.Item label="所属机构"></Form.Item>
              <Form.Item label="所属监控组"></Form.Item>
              <Form.Item name="remark" label="报警信息">
                <Table
                  showHeader
                  pagination={false}
                  bordered
                  columns={columns}
                  rowKey={record => record.dataIndex}
                  dataSource={data}
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
