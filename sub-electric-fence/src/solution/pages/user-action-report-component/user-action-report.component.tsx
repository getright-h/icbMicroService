import * as React from 'react';
import style from './user-action-report.component.less';
import { useUserActionReportStore } from './user-action-report.component.store';
import { alarmStatisticsConst, driveLineConst, stopMarkersConst, userInfoConst } from './user-action-report.interface';

export default function UserActionReportComponent() {
  const { state, chartRef } = useUserActionReportStore();
  const { fontSize } = state;

  function tabHeaders() {
    return (
      <div className={style.tabHeaders} style={{ fontSize: `${fontSize}px` }}>
        <ul>
          <li className={style.active}>
            <a href="#baseInfo">车辆信息</a>
          </li>
          <li>
            <a href="#carLocation">车辆定位</a>
          </li>
          <li>
            <a href="#carDriveLine">车辆轨迹</a>
          </li>
          <li>
            <a href="#alwaysStopMarkers">常驻地点</a>
          </li>
          <li>
            <a href="#alarmStatistics">24h报警统计</a>
          </li>
        </ul>
      </div>
    );
  }

  function functionalDomain() {
    return (
      <div className={style.functionalDomain}>
        <div className={style.searchFeature}>
          <input placeholder="请输入车牌号/车架号" />
          <button>
            <span></span>搜索
          </button>
        </div>
        <div className={style.otherFeature}>
          <button>
            <span></span>分享
          </button>
          <button>
            <span></span>打印
          </button>
        </div>
      </div>
    );
  }

  function baseInfo() {
    return (
      <div className={style.baseInfo}>
        {itemHeader('车辆信息')}
        <div className={style.baseDetail}>
          {carInfo()}
          {userInfo()}
          {carStates()}
        </div>
      </div>
    );
  }

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
        {itemHeader('车辆定位')}
        <div id="locationMap" className={style.mapContainer}></div>
        <div className={style.locationDetail}>
          <div></div>
          <span>四川省成都市高新区成汉南路南苑B区</span>
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

  // 车辆轨迹
  function carDriveLine() {
    return (
      <div className={style.carDriveLine}>
        {itemHeader('车辆轨迹')}
        <div id="driveLineMap" className={style.mapContainer}></div>
        {driveLineConst.map(item => (
          <div className={`${style.driveLineDetail} ${item.isAll ? style.driveLineAll : null}`} key={item.id}>
            <div className={style.driveInfo}>
              <div></div>
              <strong>行驶时间</strong>
              {item.duration}
            </div>
            <div className={style.driveInfo}>
              <div></div>
              <strong>行驶里程</strong>
              {item.mileage}
            </div>
            <div className={style.locationInfo}>
              <div></div>
              <div>
                <span>{item.startInfo.address}</span>
                <span>{item.startInfo.time}</span>
              </div>
            </div>
            <div className={style.locationInfo}>
              <div></div>
              <div>
                <span>{item.endInfo.address}</span>
                <span>{item.endInfo.time}</span>
              </div>
            </div>
            <div className={style.corner}>{item.isAll ? '全' : '分'}</div>
          </div>
        ))}
      </div>
    );
  }

  // 车辆常驻点
  function alwaysStopMarkers() {
    return (
      <div className={style.alwaysStopMarkers}>
        {itemHeader('常驻地点')}
        <div id="stopMarkersMap" className={style.mapContainer}></div>
        <div className={style.stopMarkersDetail}>
          {stopMarkersConst.map((item, index) => (
            <div className={style.stopMarkerInfo} key={item.id}>
              <div>{index + 1}</div>
              <div>
                <span>总时长：{item.duration}</span>
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
      {tabHeaders()}
      <div className={style.userActionReportComponent} style={{ fontSize: `${fontSize}px` }}>
        {functionalDomain()}
        {baseInfo()}
        {/* {carInfo()}
        {userInfo()}
        {carStates()} */}
        {carLocation()}
        {carDriveLine()}
        {alwaysStopMarkers()}
        {alarmStatistics()}
      </div>
    </>
  );
}
