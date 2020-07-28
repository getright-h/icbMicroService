import * as React from 'react';
import style from './attention-detail.component.less';
import { Descriptions } from 'antd';
import { AttentionDetailInfo } from './attention-detail.interface';

export default function AttentionDetailComponent(props: AttentionDetailInfo) {
  const { baseData } = props;
  const { plateNumber, fenceName, ownerName, ownerMobile, vehicleId, statusText, vin, time, follows } = baseData;
  return (
    <div className={style.test}>
      <Descriptions title="基本信息">
        <Descriptions.Item label="车辆号">{plateNumber}</Descriptions.Item>
        <Descriptions.Item label="车主姓名">{ownerName}</Descriptions.Item>
        <Descriptions.Item label="车主电话">{ownerMobile}</Descriptions.Item>
        <Descriptions.Item label="车架号">{vehicleId}</Descriptions.Item>
        {/* <Descriptions.Item label="设备号"> {vin}</Descriptions.Item> */}
        <Descriptions.Item label="绑定围栏">{fenceName}</Descriptions.Item>
        <Descriptions.Item label="告警时间">{time}</Descriptions.Item>
        <Descriptions.Item label="状态">{statusText}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="告警信息">
        <Descriptions.Item label="驶出围栏位置">四川省成都市武侯区西部智谷D</Descriptions.Item>
      </Descriptions>
      <Descriptions title="跟进记录">
        {follows &&
          follows.map(follow => {
            return (
              <>
                <Descriptions.Item label="跟进人">{follow.name}</Descriptions.Item>
                <Descriptions.Item label="时间">{follow.time}</Descriptions.Item>
                <Descriptions.Item label="备注">{follow.remark}</Descriptions.Item>
              </>
            );
          })}
      </Descriptions>
    </div>
  );
}
