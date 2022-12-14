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
            index: 1,
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
    // ??????????????????????????????
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    setStateWrap({
      searchForm: { ...searchForm, index, size: pageSize }
    });
    queryVehicleInfoPagedList({ ...searchForm, index, size: pageSize });
  }

  //??????????????????????????????????????????????????????????????????????????????????????????
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
    //???????????????????????????
    // ?????????????????????????????????????????????
    onCheckedUserSelectAllInfo(selected, [], [record]);
  }

  function queryVehicleGroupList() {
    positionMonitorService.queryVehicleGroupList({ organizationId: currentSelectNode.key + '' }).subscribe(res => {
      setStateWrap({ vehicleGroupList: res });
    });
  }

  /**
   * @param {boolean} selected ?????????????????????
   * @param {any[]} selectedRows // ?????????????????????
   * @param {any[]} changeRows // ?????????????????????
   */
  async function onCheckedUserSelectAllInfo(selected: boolean, selectedRows: any[], changeRows: any[]) {
    //?????????????????????????????????????????????????????????????????????
    // ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    let filterCheckedCarData = [];
    // ????????????
    let needChangeSelectCat = false;
    if (!selected) {
      filterCheckedCarData = checkedCarData.filter(checkedCarDataChild => {
        let flag = true;
        changeRows.forEach(selectedRowsChild => {
          if (checkedCarDataChild.id == selectedRowsChild.id) {
            flag = false;
          }
          // ???????????????????????????????????????????????????????????????????????????????????????????????????
          if (currentSelectCar && currentSelectCar.id == selectedRowsChild.id) {
            needChangeSelectCat = true;
          }
        });
        return flag;
      });
    } else {
      // ?????????????????????????????????????????????changeRows
      const changeRowsIds: string[] = [];
      let newchangeRows: VehicleInfoParamReture[] = [];
      changeRows.forEach(item => {
        changeRowsIds.push(item.id);
      });
      // ???????????????????????????????????????????????????????????????????????????????????????
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
