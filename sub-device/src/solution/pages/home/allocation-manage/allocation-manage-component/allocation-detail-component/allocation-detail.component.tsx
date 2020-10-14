import * as React from 'react';
import style from './allocation-detail.component.less';
import { useAllocationDetailStore } from './allocation-detail.component.store';
import { IHeaderTitleComponent } from '~/framework/components/component.module';
import { Space, Row, Col, Form, Button } from 'antd';
export default function AllocationDetailComponent() {
  const { state } = useAllocationDetailStore();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 }
  };

  return (
    <div className={style.alloctionDetailWapper}>
      <IHeaderTitleComponent pageName={'申请设备调拨单'} />
      <Form {...layout}>
        <div className={style.formPart}>
          <div className={style.formItems}>
            <div className={style.formLeft}>
              <Form.Item name="name" label="调拨单名称">
                100032154165
              </Form.Item>
              <Form.Item name="name" label="调拨模板"></Form.Item>
              <Form.Item name="name" label="流程节点(勾选多选项)">
                100个
              </Form.Item>
              <Form.Item name="name" label="调拨设备">
                2020-08-26 00:00:00
              </Form.Item>
              <Form.Item name="name" label="申请人"></Form.Item>
              <Form.Item name="name" label="申请时间"></Form.Item>
              <Form.Item name="name" label="创建机构"></Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
