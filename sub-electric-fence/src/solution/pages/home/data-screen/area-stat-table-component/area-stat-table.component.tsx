import * as React from 'react';
import style from './area-stat-table.component.less';
import { useAreaStatTableStore } from './area-stat-table.component.store';
import { IAreaStatTableProps } from './area-stat-table.interface';

export default function AreaStatTableComponent(props: IAreaStatTableProps) {
  const { state, scrollRef } = useAreaStatTableStore(props);
  const { scrollData } = state;
  return (
    <div className={style.areaStat}>
      <ul className={style.areaStatHeader}>
        <li className={style.cell}>区域名</li>
        <li className={style.cell}>在线数</li>
        <li className={style.cell}>离线数</li>
      </ul>
      <div className={style.areaStatBody}>
        <ul className={style.areaStatList} ref={scrollRef}>
          {!!scrollData.length ? (
            scrollData.map((item, i) => (
              <li key={`area-${i}`} className={style.row}>
                <span className={style.cell}>{item.province}</span>
                <span className={style.cell}>{item.onlineCount}</span>
                <span className={style.cell}>{item.offlineCount}</span>
              </li>
            ))
          ) : (
            <div className={style.noData}>
              <span>NO DATA</span>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
