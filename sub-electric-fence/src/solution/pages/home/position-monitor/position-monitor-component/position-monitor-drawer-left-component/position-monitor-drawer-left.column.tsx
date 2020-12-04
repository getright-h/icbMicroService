import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';

import style from './position-monitor-drawer-left.component.less';
export function positionMonitorDrawerLeftColumns(): ColumnsType<any> {
  return [
    {
      title: '',
      dataIndex: 'name',
      render: (text, record, index) => {
        return (
          <div className={style.cardContent}>
            <div>
              <span>吴小二 川A12233</span>
              <div> 18300603343 </div>
            </div>
          </div>
        );
      }
    }
  ];
}
