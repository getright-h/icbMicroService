import * as React from 'react';
import AreaStatTableComponent from './area-stat-table-component/area-stat-table.component';
import style from './data-screen.component.less';
import { useDataScreenStore } from './data-screen.component.store';
import { CustomPanelProps } from './data-screen.interface';
import DigitRoll from './digit-roll-component/digit-roll.component';
import FollowStatTableComponent from './follow-stat-table-component/follow-stat-table.component';
import OrgSelectComponent from './org-select-component/org-select.component';
import Select, { Option } from 'rc-select';

export default function DataScreenComponent() {
  const {
    state,
    areaStatRef,
    totalCarRef,
    alarmStatRef,
    offlineStatRef,
    monitorStatRef,
    mileageStatRef,
    changeFullScreen
  } = useDataScreenStore();
  const { isFull } = state;

  function OrgSearch() {
    return (
      <div className={style.orgSearch}>
        <div className={style.orgSearchSelect}>
          <OrgSelectComponent />
        </div>
      </div>
    );
  }

  function TotalStatistics() {
    return (
      <div className={style.totalStatistic}>
        <div className={style.totalStatisticItem}>
          <div>平台车辆总数</div>
          <DigitRoll numLength={7} num={state.num}>
            辆
          </DigitRoll>
        </div>
        <div className={style.totalStatisticItem}>
          <div>平台设备总数</div>
          <DigitRoll numLength={7} num={state.num}>
            台
          </DigitRoll>
        </div>
        <div className={style.totalStatisticItem}>
          <div>平台报警总数</div>
          <DigitRoll numLength={7} num={state.num}>
            条
          </DigitRoll>
        </div>
        <div className={style.totalStatisticItem}>
          <div>报警跟进总数</div>
          <DigitRoll numLength={7} num={state.num}>
            条
          </DigitRoll>
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
  function MainLeft() {
    return (
      <div className={style.contentMainLeft}>
        <CustomPanel title="平台车辆总览">
          <div className={style.chartWrap} ref={totalCarRef}></div>
        </CustomPanel>
        <CustomPanel title="报警数据统计">
          <div className={style.chartWrap} ref={alarmStatRef}></div>
          <div className={style.totalCarSelect}>
            <Select
              animation="slide-up"
              prefixCls="custom-select"
              defaultValue="1"
              // onChange={onChange}
            >
              <Option value="1">今日</Option>
              <Option value="2">本周</Option>
              <Option value="3">本月</Option>
            </Select>
          </div>
        </CustomPanel>
        <CustomPanel title="报警跟进统计">
          <div className={style.followStatSelect}>
            <Select
              animation="slide-up"
              prefixCls="custom-select"
              defaultValue="1"
              // onChange={onChange}
            >
              <Option value="1">今日</Option>
              <Option value="2">本周</Option>
              <Option value="3">本月</Option>
            </Select>
          </div>
          <FollowStatTableComponent />
        </CustomPanel>
      </div>
    );
  }
  function MainCenter() {
    return (
      <div className={style.contentMainCenter}>
        <section className={`${style.cPanel} ${style.areaStat}`}>
          <div className={style.areaStatTop}>
            <div>
              <span>绑定车辆</span>
              <DigitRoll numLength={5} num={state.num} bgColor="#FF852F" bgBorder="none"></DigitRoll>
            </div>
            <div>
              <span>在线车辆</span>
              <DigitRoll numLength={5} num={state.num} bgColor="#FF852F" bgBorder="none"></DigitRoll>
            </div>
            <div>
              <span>离线车辆</span>
              <DigitRoll numLength={5} num={state.num} bgColor="#697295" bgBorder="none"></DigitRoll>
            </div>
          </div>
          <div className={style.areaStatMiddle} ref={areaStatRef}></div>
          <div className={style.areaStatBottom}>
            <AreaStatTableComponent />
          </div>
        </section>
        <section className={`${style.cPanel} ${style.alarmStat}`}>
          <div className={style.alarmStatWrap}>
            <div className={style.alarmStatTitle}>
              <span>围栏报警</span>
            </div>
            <div className={`${style.alarmStatItems} ${style.alarmStatItemsPurple}`}>
              {[0, 1, 2].map((o, i) => (
                <div key={`b1-${i}`}>
                  <span>围栏数</span>
                  <span>100</span>
                </div>
              ))}
            </div>
          </div>
          <div className={style.alarmStatWrap}>
            <div className={style.alarmStatTitle}>
              <span>二押点报警</span>
            </div>
            <div className={`${style.alarmStatItems} ${style.alarmStatItemsOrange}`}>
              {[0, 1, 2].map((o, i) => (
                <div key={`b2-${i}`}>
                  <span>围栏数</span>
                  <span>100</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
  function MainRight() {
    return (
      <div className={style.contentMainRight}>
        <CustomPanel title="离线车辆统计">
          <div className={style.chartWrap} ref={offlineStatRef}></div>
        </CustomPanel>
        <CustomPanel title="监控组报警统计">
          <div className={style.chartWrap} ref={monitorStatRef}></div>
          <div className={style.monitorStatSelect}>
            <Select
              animation="slide-up"
              prefixCls="custom-select"
              defaultValue="1"
              // onChange={onChange}
            >
              <Option value="1">今日</Option>
              <Option value="2">本周</Option>
              <Option value="3">本月</Option>
            </Select>
          </div>
        </CustomPanel>
        <CustomPanel title="车辆里程统计">
          <div className={style.chartWrap} ref={mileageStatRef}></div>
        </CustomPanel>
      </div>
    );
  }
  return (
    <div className={`${style.screen} ${isFull ? style.full : ''}`}>
      <div className={style.container}>
        <div className={style.header}>
          <div
            className={`${style.headerBtn} ${isFull ? style.headerBtnHide : ''}`}
            onClick={() => changeFullScreen()}
          ></div>
          <div className={`${style.headerBtn} ${isFull ? style.headerBtnHide : ''}`}></div>
        </div>

        <div className={style.content}>
          <div className={style.contentTop}>
            {OrgSearch()}
            {TotalStatistics()}
          </div>
          <div className={style.contentMain}>
            {MainLeft()}
            {MainCenter()}
            {MainRight()}
          </div>
        </div>
      </div>
    </div>
  );
}
