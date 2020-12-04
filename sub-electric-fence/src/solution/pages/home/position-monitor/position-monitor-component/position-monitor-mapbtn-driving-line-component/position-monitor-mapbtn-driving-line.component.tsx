import * as React from 'react';
import style from './position-monitor-mapbtn-driving-line.component.less';
import { usePositionMonitorMapbtnDrivingLineStore } from './position-monitor-mapbtn-driving-line.component.store';
import { Drawer, Select, Button, Slider } from 'antd';
import { IPositionMonitorMapbtnDrivingProps, SELECTDATECONST } from './position-monitor-mapbtn-driving-line.interface';
import { IMapComponent, TimePickerComponent, ITableComponent } from '~/solution/components/component.module';
import { BackwardOutlined, ForwardOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { positionMonitorMapBtnDrivingColumns } from './position-monitor-mapbtn-driving-line.column';
const { Option } = Select;
export default React.memo((props: IPositionMonitorMapbtnDrivingProps) => {
  const {
    state,
    changeTablePageIndex,
    onShowTableClick,
    changeDateTimeRange,
    getDateTimeInfo,
    confirmRun
  } = usePositionMonitorMapbtnDrivingLineStore();
  const { refreshTime, dateTimeRangeControllerValue, drivingLineData, stopMarkers } = state;
  const { isLoading, searchForm, tableData, total, showTable, timeInfo } = state;
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
            <Select placeholder="搜索设备">
              <Option value="jack">Jack</Option>
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
            <Slider defaultValue={30} disabled tooltipVisible />
            <div className={style.controllerButton}>
              <BackwardOutlined className={style.iconColor} />
              <PlayCircleOutlined className={style.iconColor} />
              {/* <PauseCircleOutlined className={style.iconColor} />{' '} */}
              <ForwardOutlined className={style.iconColor} />
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
    const props = {
      id: 'drivingContainer',
      needSearchAddress: false,
      needISelectCarLoadingComponent: false,
      height: '93vh',
      drivingLineData,
      stopMarkers
    };
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
