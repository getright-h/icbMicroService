import { IAreaSearchCarState } from './area-search-car.interface';
import { useStateStore } from '@fch/fch-tool';
import { Form } from 'antd';
import moment from 'moment';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ISelectAddressState } from '~/solution/components/base/select-address-component/select-address.interface';
import { useEffect, useRef } from 'react';
import { IMAP } from '~/solution/shared/util/map.util';

declare const AMap: any;
const geocoder =
  AMap &&
  new AMap.Geocoder({
    // city: '全国', //城市设为北京，默认：“全国”
    // radius: 1000 //范围，默认：500
  });

const autoOptions = {
  city: '全国'
};
const autoComplete = new AMap.Autocomplete(autoOptions);

export function useAreaSearchCarStore() {
  const { state, setStateWrap, getState } = useStateStore(new IAreaSearchCarState());
  const [form] = Form.useForm();
  const fenceManageService = new FenceManageService();

  useEffect(() => {
    form.setFieldsValue({
      time: [moment().subtract(6, 'h'), moment()]
    });
  }, []);

  function getTableData() {
    const { pageIndex, pageSize } = getState();
    form.validateFields().then(values => {
      setStateWrap({ isLoading: true });
      const { time, polyline } = values;
      fenceManageService
        .queryAreaVehicle({
          polyline: polyline.map((p: { lat: any; lng: any }) => {
            const { lon: lng, lat } = IMAP.GPS.gcj_decrypt(p.lat, p.lng);
            return { lng, lat };
          }),
          beginTime: time[0] && moment(time[0]).format('YYYY-MM-DD HH:mm:ss'),
          endTime: time[1] && moment(time[1]).format('YYYY-MM-DD HH:mm:ss'),
          index: pageIndex,
          size: pageSize
        })
        .subscribe(
          (res: any) => {
            setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
          },
          () => {
            setStateWrap({ isLoading: false });
          }
        );
    });
  }

  function searchClick() {
    changeTablePageIndex(1, state.pageSize);
  }

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData();
  }

  function handleChangeCircle(value: string) {
    setStateWrap({
      locationList: []
    });

    autoComplete.search(value, function(status: string, result: any) {
      // 搜索成功时，result即是对应的匹配数据
      setStateWrap({
        locationList: result.tips
      });
      // console.log(result.tips);
    });
  }

  function handleCircleLocation(value: any, options: any) {
    const lnglat = JSON.parse(options.value);
    setStateWrap({ circleLocation: [lnglat.lng, lnglat.lat] });
  }

  function onFenceTypeChange(e: RadioChangeEvent | number) {
    let value: any = e;
    if (typeof e == 'object') {
      value = e.target.value;
    }
    setStateWrap({ fenceType: value });
  }

  function getAddressInfo(value: ISelectAddressState | any) {
    setStateWrap({ districtAdcode: value.district || value.city || value.province });
  }
  return {
    state,
    form,
    searchClick,
    changeTablePageIndex,
    handleChangeCircle,
    handleCircleLocation,
    getAddressInfo,
    onFenceTypeChange
  };
}
