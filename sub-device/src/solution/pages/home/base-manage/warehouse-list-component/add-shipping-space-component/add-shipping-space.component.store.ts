import { IAddShippingSpaceProps, IAddShippingSpaceState } from './add-shipping-space.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { WarehouseListManageContext } from '../warehouse-list.component';
import { Form } from 'antd';
import { useRef, useContext, useEffect } from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { ShowNotification } from '../../../../../../framework/util/common/showNotification';

export function useAddShippingSpaceStore(props: IAddShippingSpaceProps) {
  const { state, setStateWrap } = useStateStore(new IAddShippingSpaceState());
  const warehouseListService = useRef(new WarehouseListService());
  const { reduxState } = useContext(WarehouseListManageContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.shippingSpaceId) {
      warehouseListService.current.getStorePositionDetail({ id: props.shippingSpaceId }).subscribe(res => {
        res.minAlarm = res.minAlarm == -1 ? '' : res.minAlarm;
        res.maxAlarm = res.maxAlarm == -1 ? '' : res.maxAlarm;
        res.alarmDay = res.alarmDay == -1 ? '' : res.alarmDay;
        form.setFieldsValue(res);
      });
    }
  }, [props.shippingSpaceId]);

  // 确认添加
  function handleOk() {
    setStateWrap({
      confirmLoading: true
    });
    // 编辑和添加使用不同的service方法
    const URL = props.isEdit ? 'updateStorePosition' : 'insertStorePosition';
    const formInfo = form.getFieldsValue();
    formInfo.minAlarm = formInfo.minAlarm + '' == '' ? -1 : formInfo.minAlarm;
    formInfo.maxAlarm = formInfo.maxAlarm + '' == '' ? -1 : formInfo.maxAlarm;
    warehouseListService.current[URL]({
      ...formInfo,
      storeId: reduxState.currentSelectNode && reduxState.currentSelectNode.key,
      id: props.shippingSpaceId
    }).subscribe(
      () => {
        setStateWrap({
          confirmLoading: false
        });
        ShowNotification.success(`${props.isEdit ? '编辑' : '添加'}成功`);
        // 传true表示这个时候需要刷新列表
        props.closeShippingSpaceModal(true);
      },
      () => {
        setStateWrap({
          confirmLoading: false
        });
      }
    );
  }

  function handleCancel() {
    props.closeShippingSpaceModal();
  }
  return { state, handleOk, handleCancel, form };
}
