import * as React from 'react';
import { IFenceAttentionState } from './fence-attention.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';
import { FormInstance } from 'antd/lib/form';
import AttentionDetailComponent from './attention-detail-component/attention-detail.component';
import FollowUpComponent from './follow-up-component/follow-up.component';
import { AlarmCreateService } from '~/solution/model/services/alarm-create.service';
import { formatToUnix } from '~/solution/shared/util/common.util';
import { AlarmListReturn } from '~/solution/model/dto/alarm-create.dto';

export function useFenceAttentionStore() {
  const { state, setStateWrap, getState } = useStateStore(new IFenceAttentionState());
  const alarmCreateService = new AlarmCreateService();
  useEffect(() => {
    getCurrentPageList();
  }, []);
  const formInfo: { current: FormInstance } | any = useRef();
  const { searchForm } = state;
  function callbackAction<T>(actionType: number, data: AlarmListReturn) {
    switch (actionType) {
      case ACTION_TYPE.EDIT:
        setStateWrap({
          modalContainer: <FollowUpComponent onValuesChange={onValuesChange} id={data.id} />,
          modalTitle: '跟进',
          modalWidth: 500,
          visibleModal: true
        });
        break;
      case ACTION_TYPE.DETAIL:
        setStateWrap({
          modalContainer: <AttentionDetailComponent baseData={data} />,
          modalTitle: '围栏告警详情',
          modalWidth: 1000,
          visibleModal: true
        });
        break;
      default:
        break;
    }
  }

  function onValuesChange(form: FormInstance) {
    formInfo.current = form;
  }

  function getCurrentPageList() {
    setStateWrap({
      isLoading: true
    });
    const searchForm = { ...getState().searchForm };
    searchForm.begin = formatToUnix(searchForm.begin);
    searchForm.end = formatToUnix(searchForm.end);
    alarmCreateService.alarmList(searchForm).subscribe(
      res => {
        setStateWrap({
          tableData: res.data,
          total: res.total,
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

  function searchClick() {
    getCurrentPageList();
  }

  function changeTablePageIndex(index: number, pageSize?: number) {
    setStateWrap({ searchForm: { ...searchForm, index } });
    getCurrentPageList();
  }

  function getFormInfo(key: string, value: any) {
    if (value == undefined) {
      value = JSON.stringify('');
    }

    const selectItem = Number.isInteger(value) ? value : JSON.parse(value);
    switch (key) {
      case 'fenceId':
        searchForm[key] = selectItem.id ? selectItem.id : '';
        break;
      case 'fenceDdlBelong':
        searchForm['thingType'] = selectItem.type ? selectItem.type : 0;
        searchForm['thingId'] = selectItem.key ? selectItem.key : '';
        break;
      case 'vehicleId':
        searchForm[key] = selectItem.key ? selectItem.key : '';
        break;
      default:
        searchForm[key] = value;
        break;
    }
  }

  function getDateTimeInfo($event: any) {
    searchForm.begin = $event[0] + ' 00:00:00';
    searchForm.end = $event[1] + ' 23:59:59';
  }

  function handleModalCancel() {
    setStateWrap({
      visibleModal: false
    });
  }
  function handleModalOk() {
    console.log(state.modalTitle);

    if (state.modalTitle == '围栏告警详情') {
      setStateWrap({
        visibleModal: false
      });
      return;
    }
    const formParams: any = formInfo.current.getFieldsValue();
    alarmCreateService.alarmFollow({ ...formParams, id: formInfo.current.id }).subscribe(res => {
      getCurrentPageList();
      handleModalCancel();
    });
  }

  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    getFormInfo,
    getDateTimeInfo,
    handleModalCancel,
    handleModalOk
  };
}
