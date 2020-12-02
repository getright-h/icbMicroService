import { IPositionMonitorDrawerLeftState } from './position-monitor-drawer-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { PositionMonitorContext } from '../position-monitor.component';
import { useContext, useEffect } from 'react';
import { setDataAction } from '../position-monitor-redux/position-monitor-action';

export function usePositionMonitorDrawerLeftStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorDrawerLeftState());
  const { reduxState, dispatch } = useContext(PositionMonitorContext);
  const { checkedCarData } = reduxState;
  const { currentSelectCar } = reduxState;

  useEffect(() => {
    const selectedRowKeys: any[] = [];
    checkedCarData.forEach(item => {
      selectedRowKeys.push(item.id);
    });
    setStateWrap({ selectedRowKeys });
  }, [checkedCarData]);

  function onCheckedUserInfo(record: any, selected: any) {
    //获取选中的车的信息
    // 判断在现有的车辆中是否有这些车
    onCheckedUserSelectAllInfo(selected, [], [record]);
  }

  /**
   * @param {boolean} selected 是全选还是取消
   * @param {any[]} selectedRows // 选中的当前的列
   * @param {any[]} changeRows // 当前操作的数据
   */
  function onCheckedUserSelectAllInfo(selected: boolean, selectedRows: any[], changeRows: any[]) {
    //当前是全部选中，需要将变化的添加到选中的车辆中
    // 在每个选中的数据中加入最近更新的时间，然后比对整体更新的时间，这样就知道哪一个点更新了，那些点没有更新
    let filterCheckedCarData = [];
    // 更新当前
    let needChangeSelectCat = false;
    if (!selected) {
      filterCheckedCarData = checkedCarData.filter(checkedCarDataChild => {
        let flag = true;
        changeRows.forEach(selectedRowsChild => {
          if (checkedCarDataChild.id == selectedRowsChild.id) {
            flag = false;
          }
          // 如果这个时候选中的车辆在这里被删除了，需要将地图上选中的车辆置为空
          if (currentSelectCar && currentSelectCar.id == selectedRowsChild.id) {
            needChangeSelectCat = true;
          }
        });
        return flag;
      });
    } else {
      filterCheckedCarData = [...checkedCarData, ...changeRows];
    }

    setDataAction(
      { checkedCarData: filterCheckedCarData, currentSelectCar: needChangeSelectCat ? currentSelectCar : undefined },
      dispatch
    );
  }
  return { state, onCheckedUserInfo, onCheckedUserSelectAllInfo };
}
