/*
 * @Author: your name
 * @Date: 2020-05-13 16:05:33
 * @LastEditTime: 2020-05-18 11:19:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \warrant-dealer-web\src\solution\components\base\drap-choose-component\drap-choose.component.store.ts
 */

import { IDrapChooseState, IDrapChooseProps } from './drap-choose.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { DrapChooseLoadingService } from '../../../model/services/drap-choose-loading.service';
import * as _ from 'lodash';
import { useCallback, useRef, useEffect } from 'react';

export function useDrapChooseStore(props: IDrapChooseProps) {
  const { state, setStateWrap } = useStateStore(new IDrapChooseState());
  const drapChooseLoadingService = useService(DrapChooseLoadingService);
  const scrollPage = useRef(1);
  const searchName = useRef('');
  const searchParams = useRef({});
  searchParams.current = props.params || {};
  function getManageList(isSearch = false) {
    setStateWrap({ fetching: true });
    drapChooseLoadingService[props.reqUrl]({
      ...searchParams.current,
      index: scrollPage.current,
      strValue: searchName.current,
      type: props.type,
      size: 20
    }).subscribe(
      (res: any) => {
        if (props.reqUrl == 'getAreaPagedList' && res) {
          const optionList = [...(isSearch ? [] : state.optionList), ...res];
          setStateWrap({ optionList, fetching: false });
        }
        if (res.dataList) {
          const optionList = [...(isSearch ? [] : state.optionList), ...res.dataList];
          setStateWrap({ optionList, fetching: false });
        }
        // 权证派单
        // if (props.reqUrl == 'getOrganizationPagedList') {
        //   console.log(res);
        // }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  useEffect(() => {
    setStateWrap({ value: props.defaultValue });
  }, [props.defaultValue]);

  const fetchCompany = useCallback(
    _.throttle((isSearch?: boolean, value?: string) => {
      if (isSearch) {
        scrollPage.current = 1;
        searchName.current = value;
      }
      getManageList(true);
    }, 300),
    []
  );

  function companyScroll(e: any) {
    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      scrollPage.current = scrollPage.current + 1;
      getManageList(); // 调用api方法
    }
  }
  return { state, companyScroll, fetchCompany, getManageList };
}
