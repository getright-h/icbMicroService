import { IPositionMonitorDrawerLeftState } from './position-monitor-drawer-left.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { PositionMonitorContext } from '../position-monitor.component';
import { useContext, useEffect } from 'react';
import { setDataAction } from '../position-monitor-redux/position-monitor-action';
import { PositionMonitorService } from '../../../../../model/services/position-monitor.service';
import { IQueryVehicleInfoPagedListParams, VehicleInfoParamReture } from '~/solution/model/dto/position-monitor.dto';

export function usePositionMonitorDrawerLeftStore() {
  const { state, setStateWrap, getState } = useStateStore(new IPositionMonitorDrawerLeftState());
  const { reduxState, dispatch } = useContext(PositionMonitorContext);
  const positionMonitorService: PositionMonitorService = useService(PositionMonitorService);
  const { checkedCarData, currentSelectNode, currentSelectCar } = reduxState;
  const { searchForm } = state;
  useEffect(() => {
    const selectedRowKeys: any[] = [];
    checkedCarData.forEach(item => {
      selectedRowKeys.push(item.id);
    });
    setStateWrap({ selectedRowKeys });
  }, [checkedCarData]);

  useEffect(() => {
    if (currentSelectNode?.key) {
      const keyword = currentSelectNode?.['isFinance'] ? 'financeId' : 'organizationId';
      setStateWrap(
        {
          searchForm: {
            ...searchForm,
            organizationId: undefined,
            financeId: undefined,
            [keyword]: currentSelectNode?.key + '',
            vehicleGroupId: undefined
          }
        },
        (newState: IPositionMonitorDrawerLeftState) => {
          queryVehicleInfoPagedList(newState.searchForm);
        }
      );
      queryVehicleGroupList();
    }
  }, [currentSelectNode?.key]);

  function onCurrentVehicleChange(value: string) {
    setStateWrap(
      { searchForm: { ...searchForm, vehicleGroupId: value, index: 1 } },
      (newState: IPositionMonitorDrawerLeftState) => {
        console.log(searchForm);

        queryVehicleInfoPagedList(newState.searchForm);
      }
    );
    // 去查询相应的列表信息
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    setStateWrap({
      searchForm: { ...searchForm, index, size: pageSize }
    });
    queryVehicleInfoPagedList({ ...searchForm, index, size: pageSize });
  }

  //根据监控组、车架号、车主电话、车牌号、设备号信息查询车辆信息
  function queryVehicleInfoPagedList(state?: IQueryVehicleInfoPagedListParams) {
    setTimeout(() => {
      setStateWrap({ tableLoading: true });
    }, 0);
    const formInfo = JSON.parse(JSON.stringify(state || getState().searchForm));
    if (formInfo.vehicleGroupId) {
      formInfo.VehicleGroupOrganizationId = JSON.parse(JSON.stringify(formInfo.organizationId || formInfo.financeId));
      formInfo.organizationId = '';
      formInfo.financeId = '';
    }
    positionMonitorService.queryVehicleInfoPagedList(formInfo).subscribe(
      res => {
        setStateWrap({ tableData: res.dataList, total: res.total, tableLoading: false });
      },
      () => {
        setStateWrap({ tableLoading: false });
      }
    );
  }

  function onCheckedUserInfo(record: any, selected: any) {
    //获取选中的车的信息
    // 判断在现有的车辆中是否有这些车
    onCheckedUserSelectAllInfo(selected, [], [record]);
  }

  function queryVehicleGroupList() {
    positionMonitorService.queryVehicleGroupList({ organizationId: currentSelectNode.key + '' }).subscribe(res => {
      setStateWrap({ vehicleGroupList: res });
    });
  }

  /**
   * @param {boolean} selected 是全选还是取消
   * @param {any[]} selectedRows // 选中的当前的列
   * @param {any[]} changeRows // 当前操作的数据
   */
  async function onCheckedUserSelectAllInfo(selected: boolean, selectedRows: any[], changeRows: any[]) {
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
      // 获取当前勾选车辆的最新信息更新changeRows
      const changeRowsIds: string[] = [];
      let newchangeRows: VehicleInfoParamReture[] = [];
      changeRows.forEach(item => {
        changeRowsIds.push(item.id);
      });
      // 保证能够实时的勾选上，但是如果后端有问题会出现界面操作异常
      const selectedRowKeys: any[] = [];
      [...changeRows, ...checkedCarData].forEach(item => {
        selectedRowKeys.push(item.id);
      });
      setStateWrap({ selectedRowKeys });

      changeRowsIds.length && (newchangeRows = await getNewestCarInfo(changeRowsIds));

      filterCheckedCarData = [...newchangeRows, ...checkedCarData];
    }

    setDataAction(
      { checkedCarData: filterCheckedCarData, currentSelectCar: needChangeSelectCat ? currentSelectCar : undefined },
      dispatch
    );
  }

  async function getNewestCarInfo(vehicleIdList: string[]) {
    setDataAction({ addCarLoading: true }, dispatch);
    const newchangeRows = await positionMonitorService.queryVehicleInfoByParam({ vehicleIdList }).toPromise();
    setDataAction({ addCarLoading: false }, dispatch);
    return newchangeRows;
  }

  return {
    state,
    onCurrentVehicleChange,
    onCheckedUserInfo,
    onCheckedUserSelectAllInfo,
    changeTablePageIndex,
    queryVehicleGroupList
  };
}
