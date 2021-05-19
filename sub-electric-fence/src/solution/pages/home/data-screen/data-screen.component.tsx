import * as React from 'react';
import style from './data-screen.component.less';
import { useDataScreenStore } from './data-screen.component.store';
import { CustomPanelProps } from './data-screen.interface';

export default function DataScreenComponent() {
  const { state } = useDataScreenStore();

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
        <CustomPanel title="平台车辆总览">1</CustomPanel>
        <CustomPanel title="报警数据统计">2</CustomPanel>
        <CustomPanel title="报警跟进统计">3</CustomPanel>
      </div>
    );
  }
  function MainCenter() {
    return (
      <div className={style.contentMainCenter}>
        <section className={style.cPanel}></section>
        <section className={style.cPanel}></section>
      </div>
    );
  }
  function MainRight() {
    return (
      <div className={style.contentMainRight}>
        <CustomPanel title="离线车辆统计">1</CustomPanel>
        <CustomPanel title="监控组报警统计">2</CustomPanel>
        <CustomPanel title="车辆里程统计">3</CustomPanel>
      </div>
    );
  }
  return (
    <div className={`${style.screen} ${style.full}`}>
      <div className={style.container}>
        <div className={style.header}></div>

        <div className={style.content}>
          <div className={style.contentTop}></div>
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
