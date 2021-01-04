import { ColumnsType } from 'antd/lib/table';
import React from 'react';

import style from './position-monitor-drawer-left.component.less';
export function positionMonitorDrawerLeftColumns(): ColumnsType<any> {
  return [
    {
      title: '',
      dataIndex: 'name',
      render: (text, record, index) => {
        const { ownerName, ownerMobile, plateNo } = record;
        return (
          <div className={style.cardContent}>
            <div>
              <span>
                {ownerName} {plateNo}
              </span>
              <div> {ownerMobile} </div>
            </div>
          </div>
        );
      }
    }
  ];
}
