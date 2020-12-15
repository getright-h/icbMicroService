import { IStationManageState } from './station-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Subscription } from 'rxjs';
import React, { useEffect } from 'react';
import { StationManageService } from '~/solution/model/services/station-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export function useStationManageStore() {
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  const { state, setStateWrap } = useStateStore(new IStationManageState());
  const stationManageService = useService(StationManageService);
  let getTableDataSubscription: Subscription;

  function getTableData(isClick?: boolean) {
    const { searchForm } = state;
    isClick && (searchForm.index = 1);
    setStateWrap({ isLoading: true, searchForm });
    getTableDataSubscription = stationManageService
      .queryStationList({ systemId: gState.myInfo.systemId, ...searchForm })
      .subscribe(
        (res: any) => {
          setStateWrap({ tableData: res.dataList, isLoading: false });
        },
        (err: any) => {
          setStateWrap({ tableData: [], isLoading: false });
        }
      );
  }
  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    if (pageSize !== searchForm.size) {
      searchForm.index = 1;
      searchForm.size = pageSize;
    } else {
      searchForm.index = index;
    }
    setStateWrap({ searchForm });
    getTableData();
  }
  function handleFormDataChange(value: string | number | boolean, type: string, option?: Record<string, any>) {
    const { searchForm } = state;
    switch (type) {
      case 'parentOrganizationCode':
        searchForm.parentOrganizationCode = value ? option.info.code : '';
        searchForm.code = '';
        break;
      case 'code':
        searchForm.code = value ? option.info.code : '';
        break;
      default:
        searchForm[type] = value;
        break;
    }
    setStateWrap({ searchForm });
  }
  function addStation() {
    setStateWrap({ editStationVisible: true, isEdit: false });
  }
  function tableAction(actionName: string, row?: any) {
    switch (actionName) {
      case '编辑':
        setStateWrap({
          editStationVisible: true,
          isEdit: true,
          editStationInfo: row
        });
        break;
      case '权限':
        break;
      case '删除':
        Modal.confirm({
          title: '确定删除此岗位吗？',
          icon: <ExclamationCircleOutlined />,
          onOk: () =>
            new Promise((resolve, reject) => {
              stationManageService.deleteStation(row.id).subscribe(
                (res: any) => {
                  ShowNotification.success('已删除！');
                  getTableData(true);
                  resolve(true);
                },
                (err: any) => {
                  ShowNotification.error(err);
                  reject();
                }
              );
            })
        });
        break;
    }
  }
  function popclose() {
    setStateWrap({ editStationVisible: false });
    getTableData(true);
  }
  useEffect(() => {
    getTableData();
    return () => {
      getTableDataSubscription && getTableDataSubscription.unsubscribe();
    };
  }, []);
  return { state, changeTablePageIndex, tableAction, popclose, addStation, getTableData, handleFormDataChange };
}
