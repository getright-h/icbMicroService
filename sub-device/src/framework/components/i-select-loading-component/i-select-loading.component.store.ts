import { IISelectLoadingState, IISelectLoadingProps } from './i-select-loading.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef, useCallback } from 'react';
import { DrapChooseLoadingService } from '~/solution/model/services/drap-choose-loading.service';
import _ from 'lodash';
import { Subscription } from 'rxjs';

export function useISelectLoadingStore(props: IISelectLoadingProps) {
  const { reqUrl, searchKeyName = 'name' } = props;
  const { state, setStateWrap } = useStateStore(new IISelectLoadingState());
  const drapChooseLoadingService = useService(DrapChooseLoadingService);
  let getOptionListSubscription: Subscription;

  const scrollPage = useRef(1);
  const searchName = useRef('');
  const searchParams = useRef({});
  searchParams.current = props.searchForm || {};
  searchName.current = props.searchKey || '';

  function getOptionList(isSearch = false) {
    setStateWrap({ fetching: true });
    getOptionListSubscription = drapChooseLoadingService[reqUrl]({
      ...searchParams.current,
      [searchKeyName]: searchName.current,
      index: scrollPage.current,
      size: props.pageSize || 100
    }).subscribe(
      (res: any) => {
        if (res) {
          if (Array.isArray(res)) {
            res.dataList = res;
          }
          /** 兼容 data里是数组格式 */
          if (res.data && Array.isArray(res.data)) {
            res.dataList = res.data;
          }

          if (!res.dataList && !res.data) return;
          /** 兼容 data里是数组格式 */

          // if (!res.dataList) return;
          const optionList = [...(isSearch ? [] : state.optionList), ...res.dataList];
          setStateWrap({ optionList, fetching: false });
        } else if (scrollPage.current == 1 && (!res || !res.dataList)) {
          setStateWrap({ optionList: [], fetching: false });
        } else {
          scrollPage.current--;
          setStateWrap({ fetching: false });
        }
      },
      (error: any) => {
        setStateWrap({ fetching: false });
        console.log(error);
      }
    );
  }

  const fetchOptions = useCallback(
    _.throttle((isSearch?: boolean, value?: string) => {
      console.log('fetchOptions', value);
      console.log('isSearch', isSearch);
      if (isSearch) {
        scrollPage.current = 1;
        searchName.current = value || '';
      }
      getOptionList(true);
    }, 300),
    []
  );

  function optionScroll(e: any) {
    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      scrollPage.current++;
      getOptionList();
    }
  }
  useEffect(() => {
    setStateWrap({ value: props.selectedValue });
    // 解开用于解决 修改信息时候,下拉框由于没有列表数据,而只是暂时ID
    // getOptionList();
  }, [props.selectedValue]);

  useEffect(() => {
    // fetchOptions(true, props.searchKey);
    props.searchKey && fetchOptions(true, props.searchKey);
  }, [props.searchKey]);

  useEffect(() => {
    return () => {
      getOptionListSubscription && getOptionListSubscription.unsubscribe();
    };
  }, []);
  return { state, optionScroll, fetchOptions };
}
