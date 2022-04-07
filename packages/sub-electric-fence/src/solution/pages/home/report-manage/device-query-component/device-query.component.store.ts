import { IDeviceQueryState } from './device-query.interface';
import { useStateStore } from '@fch/fch-tool';
import { Form } from 'antd';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import moment from 'moment';

export function useDeviceQueryStore() {
  const { state, setStateWrap } = useStateStore(new IDeviceQueryState());
  const [searchForm] = Form.useForm();
  const orderReportService: OrderReportService = new OrderReportService();

  function formatTime(time: moment.MomentInput) {
    const begin = time?.[0]
      ? moment(time[0])
          .startOf('day')
          .valueOf()
      : undefined;
    const end = time?.[1]
      ? moment(time[1])
          .endOf('day')
          .valueOf()
      : undefined;
    return [begin, end];
  }

  function searchClick() {
    searchForm.validateFields().then(values => {
      setStateWrap({ isLoading: true });
      const { time, deviceCode } = values;
      const [beginTime, endTime] = formatTime(time);
      orderReportService.queryDeviceAnalyse({ deviceCode, beginTime, endTime }).subscribe(
        res => {
          setStateWrap({ content: res, isLoading: false });
        },
        err => {
          setStateWrap({ isLoading: false });
        }
      );
    });
  }

  function initSearchForm() {
    searchForm.resetFields();
  }
  return { state, searchForm, searchClick, initSearchForm };
}
