import * as React from 'react';
import style from './allocation-detail.component.less';
import { useAllocationDetailStore } from './allocation-detail.component.store';
import { IHeaderTitleComponent } from '~/framework/components/component.module';
import { Space, Row, Col } from 'antd';
export default function AllocationDetailComponent() {
  const { state } = useAllocationDetailStore();
  return (
    <div className={style.alloctionDetailWapper}>
      <IHeaderTitleComponent pageName={'申请设备调拨单'} />
      <div className={style.alloctionDetail}>
        <Row gutter={[16, 60]}>
          <Col span={8}>
            <Space size={20}>
              <span> 调拨单名称: </span>
            </Space>
          </Col>
        </Row>
        <Row gutter={[16, 60]}>
          <Col span={8}>
            <Space size={20}>
              <span> 调拨模板: </span>
            </Space>
          </Col>
        </Row>
        <Row gutter={[16, 60]}>
          <Col span={8}>
            <Space size={20}>
              <span> 流程节点(勾选多选项): </span>
            </Space>
          </Col>
        </Row>
        <Row gutter={[16, 60]}>
          <div>
            <p>调拨设备: </p>
            <p>申请人: </p>
            <p>申请时间: </p>
            <p>创建机构: </p>
          </div>
        </Row>
      </div>
    </div>
  );
}
