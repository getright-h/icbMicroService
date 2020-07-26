import { ICreateBindCarState, ICreateBindCarProps } from './create-bind-car.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { MonitorObjectServiceService } from '~/solution/model/services/monitor-object-service.service';
import { debounce } from '~/solution/shared/util/common.util';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';
import { useEffect, useRef } from 'react';
import { Subscription } from 'rxjs';
import moment from 'moment';

export function useCreateBindCarStore(props: ICreateBindCarProps) {
  const { state, setStateWrap } = useStateStore(new ICreateBindCarState());
  const [form] = Form.useForm();
  const { formInitValue } = props;
  const fenceManageService = new FenceManageService();
  const monitorObjectServiceService = new MonitorObjectServiceService();
  const monitorObjectServiceServiceSubscription: { current: Subscription } = useRef();
  useEffect(() => {
    throFetchCarInfo('');
    handleSearchFence('');
  }, []);

  useEffect(() => {
    console.log('formInitValue1', formInitValue);
    if (formInitValue) {
      formInitValue.begin = moment(formInitValue.beginDate);
      formInitValue.end = moment(formInitValue.endDate);
      form.setFieldsValue({ ...formInitValue });
    }
    return () => {
      monitorObjectServiceServiceSubscription.current && monitorObjectServiceServiceSubscription.current.unsubscribe();
    };
  }, [formInitValue]);

  function fetchCarInfo(event: any = '') {
    setStateWrap({
      fetching: true,
      searchDataList: undefined
    });
    monitorObjectServiceServiceSubscription.current = monitorObjectServiceService
      .vehicleDdlThing({ key: event })
      .subscribe(res => {
        setStateWrap({
          searchDataList: res.data,
          fetching: false
        });
      });
  }

  const throFetchCarInfo = debounce(fetchCarInfo, 300);

  function handleSearchFence(value: string) {
    setStateWrap({
      fetching: true,
      searchFenceList: undefined
    });
    monitorObjectServiceServiceSubscription.current = fenceManageService
      .fenceList({ name: value, index: 1, size: 50 })
      .subscribe(res => {
        setStateWrap({
          searchFenceList: res.data,
          fetching: false
        });
      });
  }

  return { state, form, throFetchCarInfo, handleSearchFence };
}
