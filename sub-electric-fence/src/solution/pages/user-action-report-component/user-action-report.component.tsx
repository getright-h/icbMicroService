import * as React from 'react';
import style from './user-action-report.component.less';
import { useUserActionReportStore } from './user-action-report.component.store';
import { userInfoConst } from './user-action-report.interface';

export default function UserActionReportComponent() {
  const { state } = useUserActionReportStore();
  const { fontSize } = state;

  // 车辆基本信息
  function carInfo() {
    return (
      <div className={style.carInfo}>
        <div className={style.plateNumberContent}>
          <span>别克 英朗XT</span>
          <div className={style.plateNumber}>川A245L7</div>
        </div>
      </div>
    );
  }

  // 车辆设备信息
  function userInfo() {
    return (
      <div className={style.userInfo}>
        {userInfoConst.map(item => {
          return (
            <div key={item.key} className={style.userInfoContent}>
              <div className={style.userInfoKey}>{item.key}</div>
              <div className={style.userInfoValue}>{item.value}</div>
            </div>
          );
        })}
      </div>
    );
  }

  // 车辆状态
  function carStates() {
    return (
      <div className={style.carStates}>
        <div className={style.carState}>
          <div></div>
          <span>车辆状态</span>
          <span>在线 5h</span>
        </div>
        <div className={style.carStateSignal}>
          <div></div>
          <span>信号强度</span>
          <span>弱 20</span>
        </div>
        <div className={style.carStateMs}>
          <div></div>
          <span>今日里程</span>
          <span>240km</span>
        </div>
      </div>
    );
  }

  // 车辆定位
  function carLocation() {
    return (
      <div className={style.carLocation}>
        {itemHeader('车辆轨迹')}
        <div>地图</div>
      </div>
    );
  }

  function itemHeader(title: string) {
    return (
      <div>
        <div className={style.headerBorder}></div>
        <span>{title}</span>
      </div>
    );
  }

  // 车辆轨迹
  function carDriveLine() {
    return <div className={style.carDriveLine}>车辆轨迹</div>;
  }

  // 车辆常驻点
  function alwaysStopMarkers() {
    return <div className={style.alwaysStopMarkers}>车辆常驻点</div>;
  }

  // 车辆24h报警统计
  function alarmStatistics() {
    return <div className={style.alarmStatistics}>车辆24h报警统计</div>;
  }
  function renderSubHeader() {
    return (
      <div className={style.contentTitle}>
        <h1>用户行为报表</h1>
      </div>
    );
  }

  return (
    <>
      {renderSubHeader()}
      <div className={style.userActionReportComponent} style={{ fontSize: `${fontSize}px` }}>
        {carInfo()}
        {userInfo()}
        {carStates()}
        {carLocation()}
        {carDriveLine()}
        {alwaysStopMarkers()}
        {alarmStatistics()}
      </div>
    </>
  );
}
