import * as React from 'react';
import style from './user-action-report.component.less';
import { useUserActionReportStore } from './user-action-report.component.store';
import { POINT_NUMBER, userInfoConst } from './user-action-report.interface';
import { IMapComponent } from '~/solution/components/component.module';
import { REPORT_UTIL } from '~/solution/shared/util/report-manage.util';
import ShareLinkModalComponent from './share-link-modal-component/share-link-modal.component';

export default function UserActionReportComponent() {
  const {
    state,
    chartRef,
    setCurrentPoint,
    printDOM,
    onShareClick,
    handleCancel,
    onStateChange,
    onValueSearch
  } = useUserActionReportStore();
  const { fontSize, actionData, loading, deviceCode, isModalVisible } = state;
  const {
    versionName,
    plateNo,
    status,
    statusTime,
    signal,
    signalText,
    mileage,
    pointList,
    pointPassList,
    residentList,
    alarmTypeList,
    currentAddressDetail
  } = actionData;

  function tabHeaders() {
    return (
      <div className={style.tabHeaders} style={{ fontSize: `${fontSize}px` }}>
        <ul>
          <li className={style.active} onClick={() => setCurrentPoint(POINT_NUMBER.baseInfo)}>
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
          <input placeholder="请输入车牌号/车架号" value={deviceCode} onChange={onStateChange} />
          <button onClick={onValueSearch}>
            <span></span>搜索
          </button>
        </div>
        <div className={style.otherFeature} onClick={onShareClick}>
          <button>
            <span></span>分享
          </button>
          <button onClick={printDOM}>
            <span></span>打印
          </button>
        </div>
      </div>
    );
  }

  function baseInfo() {
    return (
      <div className={style.baseInfo} id="baseInfo">
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
      <div className={style.carLocation} id="carLocation">
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
      <div className={style.carDriveLine} id="carDriveLine">
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
      <div className={style.alwaysStopMarkers} id="alwaysStopMarkers">
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
      <div className={style.alarmStatistics} id="alarmStatistics">
        {itemHeader('24h报警统计')}
        <div className={style.alarmStatisticsChart} ref={chartRef}></div>
        <div className={style.alarmStatisticsDetail}>
          {alarmTypeList?.map(item => (
            <div className={style.alarmStatisticsInfo} key={item.alarmTypeText}>
              <div></div>
              <div>
                <p>{item.alarmTypeText}</p>
                {item.alarmList.map(itemChild => {
                  return (
                    <>
                      <p>{itemChild.address}</p>
                      <p>{itemChild.time}</p>
                    </>
                  );
                })}
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
    <div>
      <div
        className={style.userActionReportComponentLoading}
        style={{ visibility: !loading ? 'hidden' : 'visible' }}
      ></div>
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {renderSubHeader()}
        {tabHeaders()}
        {functionalDomain()}
        <div className={style.userActionReportComponent} style={{ fontSize: `${fontSize}px` }}>
          {baseInfo()}
          {carLocation()}
          {carDriveLine()}
          {alwaysStopMarkers()}
          {alarmStatistics()}
        </div>
      </div>
      <ShareLinkModalComponent handleCancel={handleCancel} isModalVisible={isModalVisible} />
    </div>
  );
}
