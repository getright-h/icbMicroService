import * as React from 'react';
import style from './attention-detail.component.less';
import { Descriptions } from 'antd';

export default function AttentionDetailComponent() {
  return (
    <div className={style.test}>
      <Descriptions title="基本信息">
        <Descriptions.Item label="车辆号">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="车主姓名">1810000000</Descriptions.Item>
        <Descriptions.Item label="车主电话">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="车架号">empty</Descriptions.Item>
        <Descriptions.Item label="设备号"> Wantang Road, Xihu District</Descriptions.Item>
        <Descriptions.Item label="绑定围栏">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="告警信息">1810000000</Descriptions.Item>
        <Descriptions.Item label="告警时间">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="状态">empty</Descriptions.Item>
      </Descriptions>
      <Descriptions title="告警信息">
        <Descriptions.Item label="驶出围栏位置">四川省成都市武侯区西部智谷D</Descriptions.Item>
      </Descriptions>
      <Descriptions title="跟进记录">
        <Descriptions.Item label="2019-12-01"> XXX跟进</Descriptions.Item>
        <Descriptions.Item label="备注">车辆已回</Descriptions.Item>
      </Descriptions>
    </div>
  );
}
