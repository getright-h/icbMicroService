import * as React from 'react';
import style from './user-action-report.component.less';
import { useUserActionReportStore } from './user-action-report.component.store';
import { POINT_NUMBER, tabHeaderConst, userInfoConst } from './user-action-report.interface';
import { IMapComponent } from '~/solution/components/component.module';
import { REPORT_UTIL } from '~/solution/shared/util/report-manage.util';
import ShareLinkModalComponent from './share-link-modal-component/share-link-modal.component';

export default function UserActionReportComponent() {
  const {
    state,
    chartRef,
    tabHeadersRef,
    containerRef,
    setCurrentPoint,
    printDOM,
    onShareClick,
    handleCancel,
    onStateChange,
    onValueSearch
  } = useUserActionReportStore();
  const { fontSize, actionData, loading, deviceCode, isModalVisible, currentPoint } = state;
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
      <div className={style.tabHeaders} ref={tabHeadersRef} style={{ fontSize: `${fontSize}px` }}>
        <ul>
          {tabHeaderConst.map(tab => (
            <li
              key={'tab-' + tab.key}
              className={currentPoint === tab.key ? style.active : null}
              onClick={() => setCurrentPoint(tab.key)}
            >
              <a>{tab.name}</a>
            </li>
          ))}
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
        <div className={style.otherFeature}>
          <button onClick={onShareClick}>
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
      <div className={style.baseInfo} id="baseInfo" data-x>
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
      <div className={style.carLocation} data-x>
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
      <div className={style.carDriveLine} id="carDriveLine" data-x>
        {itemHeader('车辆轨迹')}
        <IMapComponent {...driveLineProps} />
        {pointPassList?.length > 1 ? (
          pointPassList?.map((item: any, index: number) => (
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
      <div className={style.alwaysStopMarkers} id="alwaysStopMarkers" data-x>
        {itemHeader('常驻地点')}
        <IMapComponent {...alwaysStopProps} />
        <div className={style.stopMarkersDetail}>
          {residentList?.slice(0, 3).map((item: any, index: number) => (
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
    const trupeData = {
      alarmList: [
        {
          latitude: 30.58235740661621,
          longitude: 104.06546020507812,
          time: '2021-01-23 16:15:51'
        }
      ],
      alarmTypeText: '电子围栏'
    };

    const mocaData = [];

    for (let i = 0; i <= 52; i++) {
      mocaData.push(trupeData);
    }

    return (
      <div className={style.alarmStatistics} id="alarmStatistics" data-x>
        {itemHeader('24h报警统计')}
        <div className={style.alarmStatisticsChart} ref={chartRef}></div>
        <div className={style.alarmStatisticsDetail}>
          {mocaData?.map((item: any, index: number) => (
            <div className={style.alarmStatisticsInfo} key={index}>
              <div></div>
              <div>
                <p>{item.alarmTypeText}</p>
                {item.alarmList.map((itemChild: any, index: number) => {
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
    <div style={{ overflowY: 'auto', height: '100%' }} ref={containerRef}>
      <div
        className={style.userActionReportComponentLoading}
        style={{ visibility: !loading ? 'hidden' : 'visible' }}
      ></div>
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {renderSubHeader()}
        {/* {tabHeaders()} */}
        {functionalDomain()}
        <div id="print" className={style.userActionReportComponent} style={{ fontSize: `${fontSize}px` }}>
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
