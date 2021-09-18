import * as React from 'react';
import style from './position-monitor-area-search-car.component.less';
import { usePositionMonitorAreaSearchCarStore } from './position-monitor-area-search-car.component.store';
import { Drawer, Button } from 'antd';
import { IMapComponent, ITableComponent } from '~/solution/components/component.module';
import { IPositionMonitorAreaSearchCarProps } from './position-monitor-area-search-car.interface';
import { positionMonitorMapAearSearchColumns } from './position-monitor-area-search-car.column';

export default function PositionMonitorAreaSearchCarComponent(props: IPositionMonitorAreaSearchCarProps) {
  const { state, closeAreaSearchCarPage } = usePositionMonitorAreaSearchCarStore();
  const { AreaSearchCarDrawervisible, isLoading, searchForm, tableData, total, showTable } = state;
  function DrawerTable() {
    return (
      <div className={style.areaSearchHeader}>
        <div className={style.areaSearchHeaderMain}>
          <span className={style.areaSearchHeaderMainSpan}>
            车辆合计： <span className={style.areaSearchHeaderMainSpanx}>xx</span>
          </span>
          <span className={style.areaSearchHeaderMainSpan}>
            在线： <span className={style.areaSearchHeaderMainSpanx}>xx</span>
          </span>
          <span className={style.areaSearchHeaderMainSpan}>
            显示车辆： <span className={style.areaSearchHeaderMainSpanx}>xx</span>
          </span>
        </div>

        <div>
          <Button type="primary" style={{ marginRight: '20px' }}>
            加载更多
          </Button>
          <Button>导出全部</Button>
        </div>
      </div>
    );
  }

  const tableParams = React.useMemo(
    () => ({
      columns: positionMonitorMapAearSearchColumns(),
      isLoading,
      pageIndex: searchForm.index,
      // pageSize: searchForm.size,
      data: tableData,
      isPagination: false,
      total: total,
      scroll: { y: 400 }
    }),
    [searchForm.index, isLoading, tableData, total]
  );

  function RenderTable() {
    return <ITableComponent {...tableParams} />;
  }

  function DrawerContent() {
    const props = {
      id: 'trackContainer',
      needSearchAddress: false,
      needISelectCarLoadingComponent: false,
      height: '93vh',
      openDrawRactangle: true
    };
    return (
      <div>
        {DrawerTable()}
        <div className={style.tableContent} style={!showTable ? { visibility: 'hidden' } : {}}>
          {RenderTable()}
        </div>
        <IMapComponent {...props} />
      </div>
    );
  }
  return (
    <Drawer
      title="区域查车"
      placement="bottom"
      mask={false}
      closable
      onClose={closeAreaSearchCarPage}
      visible={AreaSearchCarDrawervisible}
      getContainer={false}
      width={'100vw'}
      height={'100vh'}
    >
      {DrawerContent()}
    </Drawer>
  );
}
