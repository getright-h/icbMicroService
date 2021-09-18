import { IVoucherEditState, IVoucherEditProps } from './voucher-edit.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { useEffect } from 'react';
import { VoucherManageService } from '~/solution/model/services/voucher-manage.service';
import { ShowNotification } from '~/framework/util/common';
import moment from 'moment';

export function useVoucherEditStore(props: IVoucherEditProps) {
  const { state, setStateWrap } = useStateStore(new IVoucherEditState());
  const voucherManageService: VoucherManageService = new VoucherManageService();
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.id && props.visible) {
      getDetails(props.id);
      setStateWrap({ isEdit: true });
    }
  }, [props.id, props.visible]);

  function getDetails(id: string) {
    voucherManageService.getDispatchDetail(id).subscribe(res => {
      const deviceCodeList = res.deviceCodeList.map(device => device.deviceCode);
      const pictureList = res.pictureList
        ? res.pictureList.map((image: any) => {
            return {
              uid: image,
              url: image
            };
          })
        : [];
      setStateWrap({ pictureList, deviceCodeList });
      form.setFieldsValue({
        ...res,
        time: moment(res.time)
      });
    });
  }

  function getDeviceCodeList(option: any) {
    setStateWrap({
      deviceCodeList: option ? option.info.deviceCodeList : []
    });
  }

  function selfSubmit(values: any) {
    setStateWrap({ confirmLoading: true });
    const confirmForm = {
      ...values,
      time: values.time ? moment(values.time).format('YYYY-MM-DD HH:mm:ss') : '',
      deviceCodeList: state.deviceCodeList.map((item: any) => {
        return {
          deviceCode: item
        };
      })
    };
    // console.log(values);
    // console.log(confirmForm);
    if (props.id) {
      // 编辑
      voucherManageService
        .setDispatch({
          id: props.id,
          ...confirmForm
        })
        .subscribe(
          res => {
            ShowNotification.success('安装单编辑成功！');
            setStateWrap({ confirmLoading: false });
            selfClose(true);
          },
          err => {
            setStateWrap({ confirmLoading: false });
          }
        );
    } else {
      // 新增
      voucherManageService.insertDispatch(confirmForm).subscribe(
        res => {
          ShowNotification.success('安装单创建成功！');
          setStateWrap({ confirmLoading: false });
          selfClose(true);
        },
        err => {
          setStateWrap({ confirmLoading: false });
        }
      );
    }
  }
  function selfClose(isSuccess = false) {
    form.resetFields();
    setStateWrap({
      pictureList: [],
      deviceCodeList: []
    });
    props?.close(isSuccess);
  }

  return { state, form, selfSubmit, selfClose, getDeviceCodeList };
}
