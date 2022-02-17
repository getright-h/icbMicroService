import * as React from 'react';
import VirtureListComponent from '~/framework/components/virture-list-component/virture-list.component';
import style from './area-stat-table.component.less';
import { useAreaStatTableStore } from './area-stat-table.component.store';
import { IAreaStatTableProps } from './area-stat-table.interface';

export default function AreaStatTableComponent(props: IAreaStatTableProps) {
  const { state } = useAreaStatTableStore(props);
  const { scrollData } = state;
  return (
    <div className={style.areaStat}>
      <ul className={style.areaStatHeader}>
        <li className={style.cell}>区域名</li>
        <li className={style.cell}>在线数</li>
        <li className={style.cell}>离线数</li>
      </ul>
      <div className={style.areaStatBody}>
        <ul className={style.areaStatList}>
          {!!scrollData.length ? (
            <VirtureListComponent
              data={scrollData}
              options={{ itemHeight: 28, minLength: 3 }}
              style={{ height: 3 * 28 }}
            >
              {(item: any, index: number) => (
                <li key={`area-${index}`}>
                  <span className={style.cell}>{item.province}</span>
                  <span className={style.cell}>{item.onlineCount}</span>
                  <span className={style.cell}>{item.offlineCount}</span>
                </li>
              )}
            </VirtureListComponent>
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
