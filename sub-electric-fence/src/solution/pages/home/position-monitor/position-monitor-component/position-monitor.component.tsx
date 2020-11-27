import * as React from 'react';
import style from './position-monitor.component.less';
import PositionMonitorLeftComponent from './position-monitor-left-component/position-monitor-left.component';
import PositionMonitorRightComponent from './position-monitor-right-component/position-monitor-right.component';
import { positionMonitorInitialState, PositionMonitorReducer } from './position-monitor-redux/position-monitor-reducer';
import { setDataAction } from './position-monitor-redux/position-monitor-action';
import { AlertOutlined, CarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import PositionMonitorDrawerLeftComponent from './position-monitor-drawer-left-component/position-monitor-drawer-left.component';
import { Badge } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import PositionMonitorDrawerRightComponent from './position-monitor-drawer-right-component/position-monitor-drawer-right.component';
export const PositionMonitorContext = React.createContext({
  reduxState: positionMonitorInitialState,
  dispatch: undefined
});
export default function PositionMonitorComponent() {
  const [positionMonitorData, dispatch] = React.useReducer(PositionMonitorReducer, positionMonitorInitialState);
  const { leftContentVisible, leftDrawerVisible, checkedCarData } = positionMonitorData;

  const RenderPositionMonitorLeftComponent = React.useCallback(PositionMonitorLeftComponent, []);
  const RenderPositionMonitorRightComponent = React.useCallback(PositionMonitorRightComponent, []);
  function renderSubHeader() {
    return (
      <div className={style.contentTitle}>
        <h1>定位监控</h1>
      </div>
    );
  }
  return (
    <PositionMonitorContext.Provider value={{ reduxState: positionMonitorData, dispatch }}>
      {renderSubHeader()}
      <div className={style.positionMonitor}>
        {leftContentVisible && (
          <div className={style.positionMonitorLeft}>
            <RenderPositionMonitorLeftComponent />
            <PositionMonitorDrawerLeftComponent />
          </div>
        )}
        <div className={style.positionMonitorRight}>
          <RenderPositionMonitorRightComponent />
          <PositionMonitorDrawerRightComponent />
        </div>
        {!leftDrawerVisible && (
          <div
            className={style.closeButton}
            style={{ left: !leftContentVisible ? '0' : '235px' }}
            onClick={() => setDataAction({ leftContentVisible: !leftContentVisible }, dispatch)}
          >
            {!leftContentVisible && <span>展开机构列表</span>}
            {leftContentVisible ? (
              <LeftOutlined style={{ fontSize: '20px' }} />
            ) : (
              <RightOutlined style={{ fontSize: '20px' }} />
            )}
          </div>
        )}
        <div className={style.checkedCarInfo} onClick={() => setDataAction({ rightDrawervisible: true }, dispatch)}>
          <Badge count={checkedCarData.length} overflowCount={99} offset={[0, 12]}>
            <Avatar shape="circle" size={80} icon={<CarOutlined className={style.iconStyle} />} />
          </Badge>
        </div>
        <div className={style.attention}>
          <Badge count={1000} overflowCount={99} offset={[0, 12]}>
            <Avatar size={80} icon={<AlertOutlined className={style.iconStyleAlert} />} />
          </Badge>
        </div>
      </div>
    </PositionMonitorContext.Provider>
  );
}
