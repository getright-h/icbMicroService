import { IDirectiveListState } from './statistical-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IMAP } from '~shared/util/map.util';

export function useDirectiveListStore() {
  const { state, setStateWrap } = useStateStore(new IDirectiveListState());
  const orderReportService: OrderReportService = new OrderReportService();
  const [searchForm] = Form.useForm();
  const { deviceCode, alarmType }: any = useParams();

  useEffect(() => {
    initSearchForm();
  }, []);

  function getTableData(pageIndex?: number) {
    setStateWrap({ isLoading: true });
    const { pageSize } = state;
    orderReportService
      .queryReportAlarmStatisticsDetail({ deviceCode, alarmType, index: pageIndex, size: pageSize })
      .subscribe(
        async (res: any) => {
          const tableData = res?.pagedList?.dataList;
          const fetchArrary: any[] = [];
          if (Array.isArray(tableData)) {
            for (let i = 0; i < tableData.length; i++) {
              const { latitude, longitude } = tableData[i];
              if (latitude && longitude) {
                fetchArrary.push(IMAP.covertPointToAddress([longitude, latitude]));
              }
            }
          }
          Promise.all(fetchArrary).then((address: any) => {
            try {
              for (let i = 0; i < address.length; i++) {
                tableData[i].address = address[i];
              }
            } catch (error) {
              console.log(error);
            }
            setStateWrap({ tableData, total: res?.pagedList?.total, detail: res, isLoading: false });
          });
        },
        err => {
          setStateWrap({ isLoading: false });
        }
      );
  }

  function initSearchForm() {
    searchForm.resetFields();
    getTableData(1);
  }

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData(pageIndex);
  }

  return {
    state,
    searchForm,
    initSearchForm,
    changeTablePageIndex
  };
}
