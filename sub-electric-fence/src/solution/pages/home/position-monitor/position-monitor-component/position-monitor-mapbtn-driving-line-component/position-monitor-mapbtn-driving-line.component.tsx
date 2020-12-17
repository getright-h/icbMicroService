import * as React from 'react';
import style from './position-monitor-mapbtn-driving-line.component.less';
import { usePositionMonitorMapbtnDrivingLineStore } from './position-monitor-mapbtn-driving-line.component.store';
import { Drawer, Select, Button, Slider } from 'antd';
import { IPositionMonitorMapbtnDrivingProps, SELECTDATECONST } from './position-monitor-mapbtn-driving-line.interface';
import { IMapComponent, TimePickerComponent, ITableComponent } from '~/solution/components/component.module';
import { BackwardOutlined, ForwardOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { positionMonitorMapBtnDrivingColumns } from './position-monitor-mapbtn-driving-line.column';
import { PositionMonitorContext } from '../position-monitor.component';
const { Option } = Select;
export default React.memo((props: IPositionMonitorMapbtnDrivingProps) => {
  const { reduxState } = React.useContext(PositionMonitorContext);
  const {
    state,
    changeTablePageIndex,
    onShowTableClick,
    changeDateTimeRange,
    getDateTimeInfo,
    confirmRun,
    onSwitchOFFONClick,
    onSpeedChangeClick,
    setEndRunning,
    runCurrentPoint,
    changeSliderProgress,
    getDeviceCode
  } = usePositionMonitorMapbtnDrivingLineStore(reduxState);
  const { currentDoActionCarInfo } = reduxState;
  const { refreshTime, dateTimeRangeControllerValue, drivingLineData, stopMarkers, currentPoint } = state;
  const { isLoading, searchForm, tableData, total, showTable, timeInfo, isRunning, carSpeedBase, deviceCode } = state;
  const { pointList } = drivingLineData;
  const { closeMapDrivingPage, mapbtnDrivingVisible } = props;
  function Title() {
    return (
      <div>
        车辆轨迹
        <span>{refreshTime}</span>
      </div>
    );
  }

  const tableParams = React.useMemo(
    () => ({
      columns: positionMonitorMapBtnDrivingColumns(),
      isLoading,
      pageIndex: searchForm.index,
      pageSize: searchForm.size,
      data: tableData,
      pagination: false,
      total: total,
      changeTablePageIndex: (index: number, pageSize: number) => changeTablePageIndex()
    }),
    [searchForm.index, searchForm.size, isLoading, tableData, total]
  );

  function RenderSelect() {
    return (
      <div>
        <div className={style.controllerContent}>
          <div className={style.selectContent}>
            <span> 设备号: </span>
            <Select placeholder="搜索设备" value={deviceCode} onChange={getDeviceCode}>
              {currentDoActionCarInfo?.markerInfo?.deviceList.map(device => {
                return (
                  <Option key={device.deviceCode} value={device.deviceCode}>
                    {device.typeName}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className={style.selectContent}>
            <span> 选择时间: </span>
            <TimePickerComponent timeInfo={timeInfo} getDateTimeInfo={getDateTimeInfo} pickerType="dateRange" />
            <Select
              placeholder="搜索快捷日期"
              value={dateTimeRangeControllerValue}
              style={{ marginLeft: '10px', width: '150px' }}
              onChange={changeDateTimeRange}
              allowClear
            >
              {SELECTDATECONST.map(item => {
                return (
                  <Option value={item.day} key={item.day}>
                    {item.title}
                  </Option>
                );
              })}
            </Select>
          </div>
          <Button onClick={confirmRun}>确认回放</Button>
        </div>
        <div className={style.controllerLine}>
          <div className={style.controllerLineContent}>
            <Slider
              value={currentPoint}
              marks={
                pointList
                  ? {
                      0: pointList[0] || 0,
                      [pointList.length - 1]: pointList[pointList.length - 1] || 0
                    }
                  : {}
              }
              max={pointList?.length - 1}
              min={0}
              onChange={changeSliderProgress}
              tipFormatter={value => pointList[value]}
              tooltipVisible={!!pointList[0]}
            />
            <div className={style.controllerButton}>
              <BackwardOutlined className={style.iconColor} onClick={() => onSpeedChangeClick(false)} />
              {isRunning ? (
                <PlayCircleOutlined className={style.iconColor} onClick={() => onSwitchOFFONClick(false)} />
              ) : (
                <PauseCircleOutlined className={style.iconColor} onClick={() => onSwitchOFFONClick(true)} />
              )}
              <ForwardOutlined className={style.iconColor} onClick={() => onSpeedChangeClick(true)} />
            </div>
          </div>
          <div className={style.controllerLineButton} onClick={onShowTableClick}>
            <Button>{showTable ? '关闭' : '展开'}轨迹列表</Button>
          </div>
        </div>
        <div className={style.tableContent} style={!showTable ? { visibility: 'hidden' } : {}}>
          {RenderTable()}
        </div>
      </div>
    );
  }

  function RenderTable() {
    return <ITableComponent {...tableParams} />;
  }

  function DrawerContent() {
    const props = React.useMemo(
      () => ({
        id: 'drivingContainer',
        needSearchAddress: false,
        needISelectCarLoadingComponent: false,
        height: '93vh',
        drivingLineData,
        stopMarkers,
        isRunning,
        carSpeed: carSpeedBase,
        setEndRunning,
        runCurrentPoint,
        currentPoint
      }),
      [carSpeedBase, isRunning, stopMarkers, drivingLineData, currentPoint]
    );
    return (
      <div>
        {RenderSelect()}
        <IMapComponent {...props} />
      </div>
    );
  }
  return (
    <Drawer
      title={<Title />}
      placement="bottom"
      mask={false}
      closable
      onClose={closeMapDrivingPage}
      visible={mapbtnDrivingVisible}
      getContainer={false}
      width={'100vw'}
      height={'100vh'}
    >
      {DrawerContent()}
    </Drawer>
  );
});