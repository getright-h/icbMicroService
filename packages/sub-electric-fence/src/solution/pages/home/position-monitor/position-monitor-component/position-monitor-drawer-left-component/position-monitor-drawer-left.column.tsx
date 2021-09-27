import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';

import style from './position-monitor-drawer-left.component.less';
export function positionMonitorDrawerLeftColumns(): ColumnsType<any> {
  return [
    {
      title: '',
      dataIndex: 'name',
      render: (text, record, index) => {
        const { ownerName, ownerMobile, plateNo, deviceList } = record;
        return (
          <div className={style.cardContent}>
            <div>
              <span>
                {ownerName} {plateNo}
              </span>
              <div> {ownerMobile} </div>
            </div>
            {!deviceList.length && <div className={style.warn}>暂未绑定设备</div>}
          </div>
        );
      }
    }
  ];
}
