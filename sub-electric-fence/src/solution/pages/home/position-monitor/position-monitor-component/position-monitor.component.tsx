import * as React from 'react';
import style from './position-monitor.component.less';
import { PositionMonitorLeftComponent } from './position-monitor-left-component/position-monitor-left.component';
import { PositionMonitorRightComponent } from './position-monitor-right-component/position-monitor-right.component';
import { positionMonitorInitialState, PositionMonitorReducer } from './position-monitor-redux/position-monitor-reducer';
import { setDataAction } from './position-monitor-redux/position-monitor-action';
import { AlertOutlined, CarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { PositionMonitorDrawerLeftComponent } from './position-monitor-drawer-left-component/position-monitor-drawer-left.component';
import { Badge, Spin, Button } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { PositionMonitorDrawerRightComponent } from './position-monitor-drawer-right-component/position-monitor-drawer-right.component';
import { usePositionMonitorStore } from './position-monitor.component.store';
import PositionMonitorRefreshHeaderComponent from './position-monitor-refresh-header-component/position-monitor-refresh-header.component';
import AlarmAttentionModalComponent from './alarm-attention-modal-component/alarm-attention-modal.component';
export const PositionMonitorContext = React.createContext({
  reduxState: positionMonitorInitialState,
  dispatch: undefined
});
export default function PositionMonitorComponent() {
  const [positionMonitorData, dispatch] = React.useReducer(PositionMonitorReducer, positionMonitorInitialState);
  const { refreshContentInfo, state, handleCancel, stopRefresh } = usePositionMonitorStore(
    dispatch,
    positionMonitorData
  );
  const {
    leftContentVisible,
    leftDrawerVisible,
    checkedCarData,
    totalAlermManage,
    addCarLoading
  } = positionMonitorData;
  const { isModalVisible, stopTime } = state;
  const RenderMainContent = () => {
    return (
      <div className={style.positionMonitor}>
        {leftContentVisible && (
          <div className={style.positionMonitorLeft}>
            <PositionMonitorLeftComponent />
            <PositionMonitorDrawerLeftComponent />
          </div>
        )}
        <div className={style.positionMonitorRight}>
          <PositionMonitorRightComponent stopRefresh={stopRefresh} />
          <PositionMonitorDrawerRightComponent />
          {console.log('isModalVisible', isModalVisible)}
          {isModalVisible && (
            <AlarmAttentionModalComponent isModalVisible={isModalVisible} handleCancel={() => handleCancel(false)} />
          )}
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
        <div className={style.attention} onClick={() => handleCancel(true)}>
          <Badge count={totalAlermManage} offset={[0, 12]}>
            <Avatar size={80} icon={<AlertOutlined className={style.iconStyleAlert} />} />
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <PositionMonitorContext.Provider value={{ reduxState: positionMonitorData, dispatch }}>
      <PositionMonitorRefreshHeaderComponent refreshContentInfo={refreshContentInfo} stopTime={stopTime} />
      {
        <Spin tip="Loading..." spinning={addCarLoading}>
          {RenderMainContent()}
        </Spin>
      }
    </PositionMonitorContext.Provider>
  );
}
