import { IEditVehicleState } from './edit-vehicle.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'antd';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { ShowNotification } from '~/framework/util/common';
import moment from 'moment';
import { SetVehicleRequestParam } from '~/solution/model/dto/customer-manage.dto';

export function useEditVehicleStore() {
  const { state, setStateWrap } = useStateStore(new IEditVehicleState());
  const customerManageService: CustomerManageService = new CustomerManageService();
  const params = useParams();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    if (params.hasOwnProperty('id')) {
      setStateWrap({ id: params['id'], isEdit: true });
      getDetails(params['id']);
    }
    getBrandList();
  }, []);

  function getDetails(id: string) {
    customerManageService.getVehicleDetail(id).subscribe(res => {
      const formData: SetVehicleRequestParam = {
        ...res,
        owner: {
          ...res.owner,
          name: res.owner.ownerName,
          mobile: res.owner.ownerMobile
        },
        vehicle: {
          ...res.vehicle,
          buyTime: res.vehicle.buyTime ? moment(res.vehicle.buyTime) : '',
          serverBeginTime: res.vehicle.serverBeginTime ? moment(res.vehicle.serverBeginTime) : ''
        }
      };
      form.setFieldsValue(formData);
      const imageList = res.vehicle.imageList.map((image: any) => {
        return {
          uid: image,
          url: image
        };
      });
      setStateWrap({
        extraFormData: {
          distributorName: res.vehicle.distributorName,
          financeName: res.vehicle.financeName,
          brandId: res.vehicle.brandId,
          factoryId: res.vehicle.factoryId,
          versionId: res.vehicle.versionId,
          configId: res.vehicle.configId
        },
        ownerInfo: res.owner,
        bindedDeviceList: res.deviceList,
        imageList
      });
    });
  }

  function createUserTypeChange(value: number) {
    setStateWrap({ createUserType: value });
  }

  function getCurrentSelectInfo(type: string, option: any) {
    setStateWrap({
      extraFormData: {
        ...state.extraFormData,
        [`${type}Name`]: option ? option.children : undefined
      }
    });
    form.setFieldsValue({
      vehicle: { [`${type}Id`]: option ? option.value : undefined }
    });
  }

  function getCurrentSelectOwner(value: string) {
    if (value) {
      customerManageService.getOwnerDetail(value).subscribe(res => {
        setStateWrap({
          ownerInfo: {
            id: value,
            ownerName: res.name,
            ownerMobile: res.mobile,
            sexText: res.sexText,
            certificateTypeText: res.certificateTypeText,
            certificateNo: res.certificateNo
          }
        });
      });
    } else {
      setStateWrap({
        ownerInfo: {
          id: ''
        }
      });
    }
  }

  function handleDeviceListChange(value: string, index: number) {
    const codeList = form.getFieldsValue(['codeList']).codeList;
    codeList[index] = value;
    form.setFieldsValue([codeList]);
  }

  function handleSubmit(values: any) {
    setStateWrap({ confirmLoading: true });
    const confirmForm = {
      ...values,
      vehicle: {
        ...values.vehicle,
        ...state.extraFormData,
        serverTime: values.vehicle.serverTime ? Number(values.vehicle.serverTime) : 0,
        buyTime: values.vehicle.buyTime ? moment(values.vehicle.buyTime).format('YYYY-MM-DD HH:mm:ss') : null,
        serverBeginTime: values.vehicle.serverBeginTime
          ? moment(values.vehicle.serverBeginTime).format('YYYY-MM-DD HH:mm:ss')
          : null
      }
    };
    // console.log('values', values);
    // console.log('confirm', confirmForm);
    if (state.isEdit) {
      customerManageService.updateVehicle({ id: state.id, ...confirmForm }).subscribe(
        res => {
          setStateWrap({ confirmLoading: false });
          ShowNotification.success('编辑成功！');
          history.push(`../${state.id}`);
        },
        err => {
          setStateWrap({ confirmLoading: false });
        }
      );
    } else {
      customerManageService.insertVehicle(confirmForm).subscribe(
        res => {
          setStateWrap({ confirmLoading: false });
          ShowNotification.success('新增成功！');
          history.push('./vehicle');
        },
        err => {
          setStateWrap({ confirmLoading: false });
        }
      );
    }
    // setStateWrap({ confirmLoading: false });
  }

  function cancelSubmit() {
    history.push('./vehicle');
  }

  function vehicleLayoutChange(curType: string, option?: any) {
    const arr = ['brand', 'factory', 'version', 'config'];
    const { extraFormData, vehicleCode } = state;
    const vehicle = form.getFieldsValue(['vehicle']).vehicle;

    arr.forEach((type, index) => {
      if (type === curType) {
        extraFormData[`${curType}Id`] = option ? option.key : '';
        vehicleCode[`${curType}Code`] = option ? option.code : '';
        const newArr = arr.slice(index + 1);

        newArr.forEach(clearType => {
          extraFormData[`${clearType}Id`] = '';
          vehicleCode[`${clearType}Code`] = '';
          vehicle[`${clearType}Name`] = undefined;
        });
      }
    });

    setStateWrap({ extraFormData, vehicleCode });
    form.setFieldsValue([vehicle]);
  }

  useEffect(() => {
    state.vehicleCode.brandCode && getFactoryList({ code: state.vehicleCode.brandCode });
  }, [state.vehicleCode.brandCode]);

  useEffect(() => {
    state.vehicleCode.factoryCode && getVersionList({ code: state.vehicleCode.factoryCode });
  }, [state.vehicleCode.factoryCode]);

  useEffect(() => {
    state.extraFormData.versionId && getConfigList(state.extraFormData.versionId);
  }, [state.extraFormData.versionId]);

  function getBrandList() {
    customerManageService.getVehicleBrand({}).subscribe(res => {
      setStateWrap({ vehicleBrandList: res });
    });
  }

  function getFactoryList(form = {}) {
    customerManageService.getVehicleFactory(form).subscribe(res => {
      setStateWrap({ vehicleFactoryList: res });
    });
  }

  function getVersionList(form = {}) {
    customerManageService.getVehicleVersion(form).subscribe(res => {
      setStateWrap({ vehicleVersionList: res });
    });
  }

  function getConfigList(id = '') {
    customerManageService.getVehicleConfig({ id }).subscribe(res => {
      setStateWrap({ vehicleConfigList: res });
    });
  }

  function unbindDevice(code: string) {
    const { id } = state;
    setStateWrap({ isUnbindDevice: true, unbindInfo: { code, id } });
  }

  function modalCancel(isSuccess?: boolean) {
    setStateWrap({ isUnbindDevice: false });
    isSuccess && getDetails(state.id);
  }

  return {
    state,
    form,
    createUserTypeChange,
    handleSubmit,
    cancelSubmit,
    getCurrentSelectInfo,
    getCurrentSelectOwner,
    handleDeviceListChange,
    vehicleLayoutChange,
    unbindDevice,
    modalCancel
  };
}
