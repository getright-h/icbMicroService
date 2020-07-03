import * as React from 'react';
import { IFenceAttentionState } from './fence-attention.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';
import { values } from 'lodash';
import { FormInstance } from 'antd/lib/form';
import AttentionDetailComponent from './attention-detail-component/attention-detail.component';
import FollowUpComponent from './follow-up-component/follow-up.component';

export function useFenceAttentionStore() {
  const { state, setStateWrap } = useStateStore(new IFenceAttentionState());
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
        setStateWrap({
          modalContainer: <FollowUpComponent />,
          modalTitle: '跟进',
          modalWidth: 500,
          visibleModal: true
        });
        break;
      case ACTION_TYPE.DETAIL:
        setStateWrap({
          modalContainer: <AttentionDetailComponent />,
          modalTitle: '围栏告警详情',
          modalWidth: 1000,
          visibleModal: true
        });
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
  function getDateTimeInfo() {}

  function handleModalCancel() {
    setStateWrap({
      visibleModal: false
    });
  }
  function handleModalOk() {
    setStateWrap({
      visibleModal: false
    });
  }

  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    getDateTimeInfo,
    handleModalCancel,
    handleModalOk
  };
}
