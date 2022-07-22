import { IAlarmAttentionModalState } from './alarm-attention-modal.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { PositionMonitorService } from '~/solution/model/services/position-monitor.service';

export function useAlarmAttentionModalStore() {
  const { state, setStateWrap, getState } = useStateStore(new IAlarmAttentionModalState());
  const { index } = state;
  const positionMonitorService: PositionMonitorService = useService(PositionMonitorService);
  useEffect(() => {
    // queryMonitorAlarmInfoPagedList();
  }, []);

  function changeTablePageIndex(index: number, pageSize: number) {
    setStateWrap({ index, size: pageSize });
    // queryMonitorAlarmInfoPagedList();
  }
  function queryMonitorAlarmInfoPagedList() {
    setStateWrap({
      isLoading: true
    });
    // 刷新当前的报警信息条数
    positionMonitorService
      .queryMonitorAlarmInfoPagedList({ index: getState().index, size: 10, isSettle: false })
      .subscribe(
        res => {
          setStateWrap({
            tableInfo: res.monitorAlarmList.dataList,
            total: res.monitorAlarmList.total,
            isLoading: false
          });
        },
        () => {
          setStateWrap({
            isLoading: false
          });
        }
      );
  }
  return { state, changeTablePageIndex };
}
