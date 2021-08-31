import * as React from 'react';
import style from './follow-stat-table.component.less';
import { useFollowStatTableStore } from './follow-stat-table.component.store';
import { IFollowStatTableProps } from './follow-stat-table.interface';
export default function FollowStatTableComponent(props: IFollowStatTableProps) {
  const { state, scrollRef } = useFollowStatTableStore(props);
  const { alarmStatistic, scrollData } = state;
  const { alarmTotal, followedTotal, followingTotal, unFollowTotal } = alarmStatistic;
  return (
    <div className={style.wrap}>
      <div className={style.followStat}>
        <ul className={style.followStatHeader}>
          <li className={style.cell}>机构名</li>
          <li className={style.cell}>报警数</li>
          <li className={style.cell}>已跟进</li>
          <li className={style.cell}>未跟进</li>
          <li className={style.cell}>跟进完成</li>
        </ul>
        <div className={style.followStatBody}>
          <ul className={style.followStatList} ref={scrollRef}>
            {!!scrollData.length ? (
              scrollData.map(item => (
                <li key={item.id} className={style.row}>
                  <span className={style.cell}>{item.organizationName}</span>
                  <span className={style.cell}>{item.total}</span>
                  <span className={style.cell}>{item.following}</span>
                  <span className={style.cell}>{item.unFollow}</span>
                  <span className={style.cell}>{item.followed}</span>
                </li>
              ))
            ) : (
              <div className={style.noData}>
                <span>NO DATA</span>
              </div>
            )}
          </ul>
        </div>
        <ul className={style.followStatFooter}>
          <li className={style.cell}>总计</li>
          <li className={style.cell}>{alarmTotal}</li>
          <li className={style.cell}>{followingTotal}</li>
          <li className={style.cell}>{unFollowTotal}</li>
          <li className={style.cell}>{followedTotal}</li>
        </ul>
      </div>
    </div>
  );
}