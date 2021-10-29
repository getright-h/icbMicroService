import * as React from 'react';
import AreaStatTableComponent from './area-stat-table-component/area-stat-table.component';
import style from './data-screen.component.less';
import { useDataScreenStore } from './data-screen.component.store';
import { CustomPanelProps } from './data-screen.interface';
import DigitRoll from './digit-roll-component/digit-roll.component';
import FollowStatTableComponent from './follow-stat-table-component/follow-stat-table.component';
import OrgSelectComponent from './org-select-component/org-select.component';
import Select, { Option } from 'rc-select';
import { useMemo } from 'react';

export default function DataScreenComponent() {
  const {
    state,
    screenRef,
    containerRef,
    areaStatRef,
    totalCarRef,
    alarmStatRef,
    offlineStatRef,
    monitorStatRef,
    mileageStatRef,
    changeFullScreen,
    orgSelectChange,
    changeTimeRange,
    fetchAllData
  } = useDataScreenStore();

  const {
    isFull,
    fenceCount,
    fenceVehicleCount,
    alarmCount,
    alarmFollowCount,
    fenceAlarmTodayCount,
    organizationAlarmStatistic,
    vehicleStatus,
    timeRange,
    bindVehicleCount,
    deviceCount,
    vehicleCount
  } = state;

  // 机构搜索栏
  function OrgSearch() {
    return (
      <div className={style.orgSearch} style={{ visibility: state.isFull ? 'hidden' : 'visible' }}>
        <div className={style.orgSearchSelect}>
          <OrgSelectComponent
            onChange={orgSelectChange}
            dropdownStyle={{ transform: `scale(${state.scale})`, transformOrigin: 'top left' }}
          />
        </div>
      </div>
    );
  }
  const OrgSearchComponent = useMemo(() => <OrgSearch />, [state.isFull, state.scale]);

  // 统计总数-数字滚动
  const VehicleCountMemo = useMemo(() => {
    const len = vehicleCount.toString().length;
    const numL = len > 7 ? len : 7;
    return (
      <DigitRoll numLength={numL} num={vehicleCount}>
        辆
      </DigitRoll>
    );
  }, [vehicleCount]);
  const DeviceCountMemo = useMemo(() => {
    const len = deviceCount.toString().length;
    const numL = len > 7 ? len : 7;
    return (
      <DigitRoll numLength={numL} num={deviceCount}>
        台
      </DigitRoll>
    );
  }, [deviceCount]);
  const AlarmCountMemo = useMemo(() => {
    const len = alarmCount.toString().length;
    const numL = len > 7 ? len : 7;
    return (
      <DigitRoll numLength={numL} num={alarmCount}>
        条
      </DigitRoll>
    );
  }, [alarmCount]);
  const AlarmFollowCountMemo = useMemo(() => {
    const len = alarmFollowCount.toString().length;
    const numL = len > 7 ? len : 7;
    return (
      <DigitRoll numLength={numL} num={alarmFollowCount}>
        条
      </DigitRoll>
    );
  }, [alarmFollowCount]);
  function TotalStatistics() {
    return (
      <div className={style.totalStatistic}>
        <div className={style.totalStatisticItem}>
          <div>平台车辆总数</div>
          {VehicleCountMemo}
        </div>
        <div className={style.totalStatisticItem}>
          <div>平台设备总数</div>
          {DeviceCountMemo}
        </div>
        <div className={style.totalStatisticItem}>
          <div>平台报警总数</div>
          {AlarmCountMemo}
        </div>
        <div className={style.totalStatisticItem}>
          <div>报警跟进总数</div>
          {AlarmFollowCountMemo}
        </div>
      </div>
    );
  }

  function CustomPanel(props: CustomPanelProps) {
    return (
      <section className={style.panel}>
        <span className={style.panelLT}></span>
        <span className={style.panelRT}></span>
        <span className={style.panelLB}></span>
        <span className={style.panelRB}></span>
        <div className={style.panelHeader}>
          <span>{props.title}</span>
        </div>
        {props.children}
      </section>
    );
  }

  // 左侧
  const totalCarRefComponent = React.useMemo(() => {
    console.log('chart totalCar======');
    return (
      <CustomPanel title="平台车辆总览">
        <div className={style.chartWrap} ref={totalCarRef}></div>
      </CustomPanel>
    );
  }, [JSON.stringify(state.vehicleBinds[0]), state.scale]);

  const alarmStatRefComponent = React.useMemo(() => {
    console.log('chart alarmStat======');
    return <div className={style.chartWrap} ref={alarmStatRef}></div>;
  }, [JSON.stringify(state.alarmTypeStatistics[0]), state.scale]);

  const organizationStatComponent = React.useMemo(() => {
    console.log('table organizationAlarm======');
    return <FollowStatTableComponent propData={organizationAlarmStatistic} />;
  }, [state.organizationAlarmStatistic.alarmTotal, state.scale]);

  function MainLeft() {
    console.warn('render MainLeft');
    return (
      <div className={style.contentMainLeft}>
        {totalCarRefComponent}
        <CustomPanel title="报警数据统计">
          {alarmStatRefComponent}
          <div className={style.totalCarSelect}>
            <Select
              animation="slide-up"
              prefixCls="custom-select"
              value={timeRange['alarmType']}
              onChange={v => changeTimeRange('alarmType', v)}
              dropdownStyle={{ transform: `scale(${state.scale})`, transformOrigin: 'top left' }}
            >
              <Option value="all">全部</Option>
              <Option value="day">今日</Option>
              <Option value="week">本周</Option>
              <Option value="month">本月</Option>
            </Select>
          </div>
        </CustomPanel>
        {/* <CustomPanel title="报警跟进统计">
          <div className={style.followStatSelect}>
            <Select
              animation="slide-up"
              prefixCls="custom-select"
              value={timeRange['alarmFollow']}
              onChange={v => changeTimeRange('alarmFollow', v)}
              dropdownStyle={{ transform: `scale(${state.scale})`, transformOrigin: 'top left' }}
            >
              <Option value="all">全部</Option>
              <Option value="day">今日</Option>
              <Option value="week">本周</Option>
              <Option value="month">本月</Option>
            </Select>
          </div>
          {organizationStatComponent}
        </CustomPanel> */}
      </div>
    );
  }
  const areaStatRefC = React.useMemo(() => <div className={style.areaStatMiddle} ref={areaStatRef}></div>, [
    JSON.stringify(vehicleStatus)
  ]);
  function MainCenter() {
    const bindLength = bindVehicleCount.toString().length > 7 ? bindVehicleCount.toString().length : 7;
    const onlineLength =
      vehicleStatus.onlineCount.toString().length > 7 ? vehicleStatus.onlineCount.toString().length : 7;
    const offlineLength =
      vehicleStatus.offlineCount.toString().length > 7 ? vehicleStatus.offlineCount.toString().length : 7;
    return (
      <div className={style.contentMainCenter}>
        <section className={`${style.cPanel} ${style.areaStat}`}>
          <div className={style.areaStatTop}>
            <div>
              <span>绑定车辆</span>
              <DigitRoll numLength={bindLength} num={bindVehicleCount} bgColor="#FF852F" bgBorder="none"></DigitRoll>
            </div>
            <div>
              <span>在线车辆</span>
              <DigitRoll
                numLength={onlineLength}
                num={vehicleStatus.onlineCount}
                bgColor="#FF852F"
                bgBorder="none"
              ></DigitRoll>
            </div>
            <div>
              <span>离线车辆</span>
              <DigitRoll
                numLength={offlineLength}
                num={vehicleStatus.offlineCount}
                bgColor="#697295"
                bgBorder="none"
              ></DigitRoll>
            </div>
          </div>
          {areaStatRefC}
          <div className={style.areaStatBottom}>
            <AreaStatTableComponent propData={vehicleStatus.data} />
          </div>
        </section>
        <section className={`${style.cPanel} ${style.alarmStat}`}>
          <div className={style.alarmStatWrap}>
            <div className={style.alarmStatTitle}>
              <span>围栏报警</span>
            </div>
            <div className={`${style.alarmStatItems} ${style.alarmStatItemsPurple}`}>
              <div>
                <span>围栏数</span>
                <span>{fenceCount}</span>
              </div>
              <div>
                <span>监控车辆数</span>
                <span>{fenceVehicleCount}</span>
              </div>
              <div>
                <span>今日报警数</span>
                <span>{fenceAlarmTodayCount}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const offlineStatRefComponent = React.useMemo(() => {
    return (
      <CustomPanel title="离线车辆统计">
        <div className={style.chartWrap} ref={offlineStatRef}></div>
      </CustomPanel>
    );
  }, [JSON.stringify(state.offline)]);

  const monitorStatRefC = React.useMemo(() => {
    return (
      <CustomPanel title="监控组报警统计">
        <div className={style.chartWrap} ref={monitorStatRef}></div>;
        <div className={style.monitorStatSelect}>
          <Select
            animation="slide-up"
            prefixCls="custom-select"
            value={timeRange['groupAlarm']}
            onChange={v => changeTimeRange('groupAlarm', v)}
            dropdownStyle={{ transform: `scale(${state.scale})`, transformOrigin: 'top left' }}
          >
            <Option value="all">全部</Option>
            <Option value="day">今日</Option>
            <Option value="week">本周</Option>
            <Option value="month">本月</Option>
          </Select>
        </div>
      </CustomPanel>
    );
  }, [JSON.stringify(state.groupAlarmStatistic), timeRange['groupAlarm'], state.scale]);

  const mileageStatRefC = React.useMemo(() => {
    return (
      <CustomPanel title="车辆里程统计">
        <div className={style.chartWrap} ref={mileageStatRef}></div>
      </CustomPanel>
    );
  }, [JSON.stringify(state.mileage)]);
  function MainRight() {
    return (
      <div className={style.contentMainRight}>
        {offlineStatRefComponent}
        {monitorStatRefC}
        {mileageStatRefC}
      </div>
    );
  }
  return (
    <div className={`${style.screen} ${isFull ? style.full : ''}`} ref={screenRef}>
      <div
        className={style.container}
        ref={containerRef}
        style={{ transform: `scale(${state.scale})`, transformOrigin: 'top left' }}
      >
        <div className={style.header}>
          <div
            className={`${style.headerBtn} ${isFull ? style.headerBtnHide : ''}`}
            onClick={() => changeFullScreen()}
          ></div>
          <div
            className={style.headerBtn}
            style={{ visibility: state.isFull ? 'hidden' : 'visible' }}
            onClick={() => fetchAllData()}
          ></div>
        </div>

        <div className={style.content}>
          <div className={style.contentTop}>
            {OrgSearchComponent}
            {TotalStatistics()}
          </div>
          <div className={style.contentMain}>
            {MainLeft()}
            {/* {MainCenter()}
            {MainRight()} */}
          </div>
        </div>
      </div>
    </div>
  );
}
