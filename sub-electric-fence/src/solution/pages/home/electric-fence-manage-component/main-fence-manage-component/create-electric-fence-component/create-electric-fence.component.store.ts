import { ICreateElectricFenceState, ICreateElectricProps, FENCETYPENUM } from './create-electric-fence.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ChangeEvent, useEffect, useRef } from 'react';
import { Form, message } from 'antd';
import * as _ from 'lodash';
import { Store } from 'antd/lib/form/interface';
import { ISelectAddressState } from '~/solution/components/base/select-address-component/select-address.interface';
import { FenceManageEditParamsModal, FenceManageCreateParamsModal } from '~/solution/model/dto/fence-manage.dto';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';
import { MainFenceManageContext } from '../main-fence-manage.provider';
import { visibleInfo, getFenceListAction } from '../hooks-redux/main-fence-action';
declare const AMap: any;
let geocoder =
  AMap &&
  new AMap.Geocoder({
    // city: '全国', //城市设为北京，默认：“全国”
    // radius: 1000 //范围，默认：500
  });

const autoOptions = {
  city: '全国'
};
const autoComplete = new AMap.Autocomplete(autoOptions);
export function useCreateElectricFenceStore(props: ICreateElectricProps) {
  const { state, setStateWrap } = useStateStore(new ICreateElectricFenceState());
  const { onValueChange, circlrR, centerPlace, polygon } = props;
  const fenceManageService = new FenceManageService();
  const [form] = Form.useForm();
  const addressInfo = useRef('');
  const { mainFenceManageState, dispatch } = React.useContext(MainFenceManageContext);
  const { editData, isEdit, searchForm } = mainFenceManageState;

  // 这个地方用来提交代码 然后将父级的modal关闭
  function onFinish(values: Store) {
    if (!values.name) {
      message.warning('请输入围栏名');
      return;
    }
    setStateWrap({
      isLoading: true
    });
    if (isEdit) {
      if (!addressInfo.current && editData.fenceType == FENCETYPENUM.ADMINISTRATIVEDIVISION) {
        getAddressInfo(editData.district, true);
      }
      editFence({ ...editData, ...values, polyline: polygon, districtAdcode: addressInfo.current });
      return;
    }
    createFence({ ...values, polyline: polygon, districtAdcode: addressInfo.current });
    return;
  }

  // 保证传给后端的是个code
  function editFence(fenceData: FenceManageEditParamsModal | any) {
    fenceManageService.fenceEdit(fenceData).subscribe(
      (res: any) => {
        visibleInfo(false, dispatch);
        setStateWrap({
          isLoading: false
        });
        getFenceListAction(searchForm, dispatch);
      },
      () => {
        setStateWrap({
          isLoading: false
        });
      }
    );
  }

  function createFence(fenceData: FenceManageCreateParamsModal | any) {
    fenceManageService.fenceCreate(fenceData).subscribe(
      (res: any) => {
        visibleInfo(false, dispatch);
        getFenceListAction(searchForm, dispatch);
        setStateWrap({
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

  function getAddressInfo(value: ISelectAddressState | any, isFromList = false) {
    if (isFromList) {
      const { district, city, province } = value;
      addressInfo.current = (district && district.adcode) || (city && city.adcode) || (province && province.adcode);
      return;
    }
    addressInfo.current = value.district || value.city || value.province;
  }

  _.debounce(handleChangeCircle, 1000);

  useEffect(() => {
    form.setFieldsValue({ rPlace: circlrR });
  }, [circlrR]);

  useEffect(() => {
    centerPlace && regeoCode();
  }, [centerPlace]);

  function regeoCode() {
    if (!geocoder) {
      geocoder = new AMap.Geocoder({});
    }
    geocoder.getAddress(centerPlace, function(status: string, result: any) {
      if (status === 'complete' && result.regeocode) {
        let info = '...';
        if (result.regeocode.formattedAddress.length > 15) {
          info += result.regeocode.formattedAddress.slice(-10);
        } else {
          info = result.regeocode.formattedAddress;
        }
        form.setFieldsValue({ centerPlace: info, centerLatlng: centerPlace });
      }
    });
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
      console.log(result.tips);
    });
  }

  function handleCircleLocation(value: any, options: any) {
    const lnglat = JSON.parse(options.value);

    onValueChange('circleLocation', [lnglat.lng, lnglat.lat]);
  }

  const onCrPlaceChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange('circlrR', e.target.value);
  };
  return { state, onFinish, getAddressInfo, handleCircleLocation, handleChangeCircle, onCrPlaceChange, form };
}
