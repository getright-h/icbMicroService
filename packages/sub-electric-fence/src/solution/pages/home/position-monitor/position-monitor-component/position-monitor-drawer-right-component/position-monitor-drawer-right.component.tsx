import * as React from 'react';
import { PositionMonitorContext } from '../position-monitor.component';
import style from './position-monitor-drawer-right.component.less';
import { usePositionMonitorDrawerRightStore } from './position-monitor-drawer-right.component.store';
import { Collapse, Drawer, Button } from 'antd';
import { setDataAction } from '../position-monitor-redux/position-monitor-action';
import { CloseCircleOutlined } from '@ant-design/icons';
import { DeviceList } from '../../../../../model/dto/position-monitor.dto';
import { VehicleInfoParamReture } from '~/solution/model/dto/position-monitor.dto';
const { Panel } = Collapse;
export const PositionMonitorDrawerRightComponent = () => {
  const { state, deleteChoosedCar, checkedDevice } = usePositionMonitorDrawerRightStore();
  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const { rightDrawervisible, checkedCarData, currentSelectCar } = reduxState;
  function DrawerContent() {
    return (
      <div className={style.drawerContent}>
        <div>
          <Button
            type="primary"
            className={style.searchAllCar}
            onClick={() => {
              setDataAction({ currentSelectCar: undefined }, dispatch);
            }}
          >
            查看所有车辆
          </Button>
          {checkedCarData.length ? (
            <Collapse
              // onChange={callback}
              expandIconPosition={'left'}
            >
              {checkedCarData.map(item => {
                return (
                  <Panel
                    header={RenderUserInfo(item)}
                    style={item.id == currentSelectCar?.id ? { background: '#f5f0ff' } : {}}
                    key={item.id}
                    extra={genExtra(item)}
                  >
                    <div className={style.panel}>
                      {item?.deviceList?.map((itemChild: DeviceList) => {
                        return (
                          <div
                            key={itemChild.deviceCode}
                            className={style.panelContent}
                            onClick={() => checkedDevice(item, itemChild)}
                            style={
                              item.id == currentSelectCar?.id && itemChild.isDefault
                                ? { background: 'rgb(245, 240, 255)' }
                                : {}
                            }
                          >
                            <span>
                              {itemChild.deviceCode}({itemChild.typeName})
                            </span>
                            <span>{itemChild.isOnline ? '在线' : '离线'}</span>
                          </div>
                        );
                      })}
                    </div>
                  </Panel>
                );
              })}
            </Collapse>
          ) : null}
        </div>
        <Button
          onClick={() => {
            setDataAction({ checkedCarData: [], currentSelectCar: undefined }, dispatch);
          }}
        >
          清空所选车辆
        </Button>
      </div>
    );
  }

  function RenderUserInfo(item: VehicleInfoParamReture) {
    return (
      <div
        className={style.cardContent}
        onClick={event => {
          event.stopPropagation();
          // 选中当前的car
          setDataAction({ currentSelectCar: item }, dispatch);
        }}
      >
        <div>
          <span>
            {item.ownerName} {item.plateNo}
          </span>
          <div>{item.ownerMobile}</div>
        </div>
        <div className={style.cardRigth}>{item.isRunning ? '运动' : '静止'}</div>
      </div>
    );
  }

  const genExtra = (item: any) => (
    <div style={{ display: 'inline' }}>
      <CloseCircleOutlined
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
          deleteChoosedCar(item);
        }}
      />
    </div>
  );
  return (
    <Drawer
      title={`已选中车辆  (${checkedCarData.length})`}
      placement="right"
      mask={false}
      closable
      onClose={() => setDataAction({ rightDrawervisible: false }, dispatch)}
      visible={rightDrawervisible}
      getContainer={false}
      style={{ position: 'absolute', zIndex: 99 }}
    >
      {DrawerContent()}
    </Drawer>
  );
};
