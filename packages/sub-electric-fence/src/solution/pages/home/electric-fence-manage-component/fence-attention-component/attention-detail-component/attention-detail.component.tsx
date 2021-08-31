import * as React from 'react';
import style from './attention-detail.component.less';
import { Descriptions } from 'antd';
import { AttentionDetailInfo } from './attention-detail.interface';
import { useAttentionDetailStore } from './attention-detail.component.store';
import { FileExcelFilled } from '@ant-design/icons';

export default function AttentionDetailComponent(props: AttentionDetailInfo) {
  const { baseData } = props;
  const { plateNumber, fenceName, ownerName, ownerMobile, vehicleId, statusText, alarmAddr, time, follows } = baseData;
  useAttentionDetailStore(props);
  return (
    <div>
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
      {alarmAddr && (
        <Descriptions title="告警信息">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={style.mapContent}>
              <div>驶出围栏位置 : {alarmAddr}</div>
              <div id="container" className={style.container}></div>
            </div>
          </div>
        </Descriptions>
      )}
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
