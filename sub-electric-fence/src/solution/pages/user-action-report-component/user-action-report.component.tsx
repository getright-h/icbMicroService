import * as React from 'react';
import style from './user-action-report.component.less';
import { useUserActionReportStore } from './user-action-report.component.store';
import { alarmStatisticsConst, stopMarkersConst, userInfoConst } from './user-action-report.interface';
import { IMapComponent } from '~/solution/components/component.module';
import { REPORT_UTIL } from '~/solution/shared/util/report-manage.util';

export default function UserActionReportComponent() {
  const { state, chartRef } = useUserActionReportStore();
  const { fontSize, actionData } = state;
  const {
    versionName,
    plateNo,
    status,
    statusTime,
    signal,
    signalText,
    mileage,
    longitude,
    latitude,
    pointList,
    pointPassList,
    residentList,
    alarmTypeList,
    currentAddressDetail
  } = actionData;

  // 车辆基本信息
  function carInfo() {
    return (
      <div className={style.carInfo}>
        <div className={style.plateNumberContent}>
          <span>{versionName}</span>
          <div className={style.plateNumber}>{plateNo}</div>
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
              <div className={style.userInfoValue}>{actionData[item.value]}</div>
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
          <span>
            {status} {Number(statusTime)}h
          </span>
        </div>
        <div className={style.carStateSignal}>
          <div></div>
          <span>信号强度</span>
          <span>
            {signal} {signalText}
          </span>
        </div>
        <div className={style.carStateMs}>
          <div></div>
          <span>今日里程</span>
          <span>{mileage}km</span>
        </div>
      </div>
    );
  }

  // 车辆定位
  function carLocation() {
    return (
      <div className={style.carLocation}>
        {itemHeader('车辆定位')}
        <div id="locationMap" className={style.mapContainer}></div>
        <div className={style.locationDetail}>
          <div></div>
          <span>{currentAddressDetail}</span>
        </div>
      </div>
    );
  }

  function itemHeader(title: string) {
    return (
      <div className={style.itemHeader}>
        <div className={style.headerBorder}></div>
        <span>{title}</span>
      </div>
    );
  }

  const driveLineProps = {
    id: 'mainContainer',
    needRule: false,
    needBaseController: false,
    needRunDrivingLine: false,
    drivingLineData: {
      pointList: pointList
    },
    needSearchAddress: false,
    height: '30rem'
  };

  // 车辆轨迹
  function carDriveLine() {
    return (
      <div className={style.carDriveLine}>
        {itemHeader('车辆轨迹')}
        <IMapComponent {...driveLineProps} />
        {pointPassList?.length > 1 ? (
          pointPassList?.map((item, index) => (
            <div className={`${style.driveLineDetail} ${!index ? style.driveLineAll : null}`} key={index}>
              <div className={style.driveInfo}>
                <div></div>
                <strong>行驶时间</strong>
                {REPORT_UTIL.formatStayTime(item.endTime - item.startTime)}
              </div>
              <div className={style.driveInfo}>
                <div></div>
                <strong>行驶里程</strong>
                {item.mileage}
              </div>
              <div className={style.locationInfo}>
                <div></div>
                <div>
                  <span>{item.startAddress}</span>
                  <span>{item.startTime}</span>
                </div>
              </div>
              <div className={style.locationInfo}>
                <div></div>
                <div>
                  <span>{item.endAddress}</span>
                  <span>{item.endTime}</span>
                </div>
              </div>
              <div className={style.corner}>{!index ? '全' : '分'}</div>
            </div>
          ))
        ) : (
          <div className={style.driveLineDetail}>暂无轨迹</div>
        )}
      </div>
    );
  }

  const alwaysStopProps = {
    id: 'alwaysStopContainer',
    needRule: false,
    needBaseController: false,
    needRunDrivingLine: false,
    permanentPlaceList: residentList,
    needSearchAddress: false,
    height: '30rem'
  };

  // 车辆常驻点
  function alwaysStopMarkers() {
    return (
      <div className={style.alwaysStopMarkers}>
        {itemHeader('常驻地点')}
        <IMapComponent {...alwaysStopProps} />
        <div className={style.stopMarkersDetail}>
          {residentList?.map((item, index) => (
            <div className={style.stopMarkerInfo} key={index}>
              <div>{index + 1}</div>
              <div>
                <span>总时长：{REPORT_UTIL.formatStayTime(item.time)}</span>
                <span>{item.address}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 车辆24h报警统计
  function alarmStatistics() {
    return (
      <div className={style.alarmStatistics}>
        {itemHeader('24h报警统计')}
        <div className={style.alarmStatisticsChart} ref={chartRef}></div>
        <div className={style.alarmStatisticsDetail}>
          {alarmStatisticsConst.map(item => (
            <div className={style.alarmStatisticsInfo} key={item.id}>
              <div></div>
              <div>
                <p>{item.type}</p>
                <p>{item.address}</p>
                <p>{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
