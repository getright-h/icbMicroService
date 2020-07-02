import { IFenceAttentionState } from './fence-attention.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';
import { values } from 'lodash';
import { FormInstance } from 'antd/lib/form';
import { useHistory } from 'react-router-dom';

export function useFenceAttentionStore(form: FormInstance) {
  const { state, setStateWrap } = useStateStore(new IFenceAttentionState());
  const history = useHistory();
  useEffect(() => {
    const list = [
      {
        source: '品信雪佛兰 ',
        plateNumber: '川A12334',
        userName: '李斯',
        userPhone: '13288388333',
        vin: '83838838848933',
        equipmentNumber: 'KM-33443EEER',
        bindFence: '成都围栏',
        warningMessage: '驶出围栏',
        warningTime: '2019-11-15 12:01:00',
        status: '未处理'
      },
      {
        source: '品信雪佛兰 ',
        plateNumber: '川A12334',
        userName: '李斯',
        userPhone: '13288388333',
        vin: '83838838848933',
        equipmentNumber: 'KM-33443EEER',
        bindFence: '成都围栏',
        warningMessage: '驶出围栏',
        warningTime: '2019-11-15 12:01:00',
        status: '已处理'
      }
    ];
    setStateWrap({ tableData: list });
  }, []);
  function callbackAction<T>(actionType: number, data: T) {
    console.log('a', actionType);
    switch (actionType) {
      case ACTION_TYPE.EDIT:
        showModal();
        break;
      case ACTION_TYPE.DETAIL:
        break;
      default:
        break;
    }
  }
  function searchClick() {
    console.log(1);
  }
  function changeTablePageIndex(index: number, pageSize: number) {
    console.log(index, pageSize);
  }
  function showModal() {
    setStateWrap({
      visible: true
    });
  }

  function hideModal() {
    setStateWrap({
      visible: false
    });
  }

  function handleOK() {
    console.log(form.getFieldsValue());
    setStateWrap({
      visible: false
    });
  }
  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    hideModal,
    handleOK
  };
}
