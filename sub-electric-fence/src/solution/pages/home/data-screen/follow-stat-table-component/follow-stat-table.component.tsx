import * as React from 'react';
import style from './follow-stat-table.component.less';
import { useFollowStatTableStore } from './follow-stat-table.component.store';
import { followStatColumns, tempData } from './follow-stat.column';

export default function FollowStatTableComponent() {
  const { state, scrollRef } = useFollowStatTableStore();
  const scrollData = tempData.concat(tempData.concat(tempData));
  return (
    <div className={style.wrap}>
      <div className={style.followStat}>
        <ul className={style.followStatHeader}>
          {followStatColumns.map(col => (
            <li className={style.cell} key={col.title}>
              {col.title}
            </li>
          ))}
        </ul>
        <div className={style.followStatBody}>
          <ul className={style.followStatList} ref={scrollRef}>
            {scrollData.map(item => (
              <li key={item.id} className={style.row}>
                {followStatColumns.map(col => (
                  <span className={style.cell} key={item.id + col.key}>
                    {item[col.key]}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
        <ul className={style.followStatFooter}>
          <li className={style.cell}>总计</li>
          <li className={style.cell}>0</li>
          <li className={style.cell}>0</li>
          <li className={style.cell}>0</li>
          <li className={style.cell}>0</li>
        </ul>
      </div>
    </div>
  );
}
