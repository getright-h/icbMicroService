import { IISelectLoadingState, IISelectLoadingProps } from './i-select-loading.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
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
  const resultTotal = useRef(0);
  const resultList = useRef([]);
  searchParams.current = props.searchForm || {};
  searchName.current = props.searchKey || '';

  function getOptionList(isSearch = false, searchNameInfo = searchName.current) {
    const { optionList } = state;

    setStateWrap({ fetching: true });
    searchName.current = searchNameInfo;
    getOptionListSubscription = drapChooseLoadingService[reqUrl]({
      ...searchParams.current,
      key: searchNameInfo,
      [searchKeyName]: searchNameInfo,
      index: scrollPage.current,
      size: props.pageSize || 20
    }).subscribe(
      (res: any) => {
        if (res) {
          /** 兼容 res */
          if (Array.isArray(res)) {
            resultList.current = res;
          }
          /** 兼容 data里是数据列表 */
          if (res.data && Array.isArray(res.data)) {
            resultList.current = res.data;
            resultTotal.current = res.total;
          }
          /** 兼容 dataList里是数据列表 */
          if (res.dataList && Array.isArray(res.dataList)) {
            resultList.current = res.dataList;
            resultTotal.current = res.total;
          }

          /** 如果当前返回的数据为 [] */
          if (!resultList.current.length) {
            scrollPage.current = 1;
            setStateWrap({ fetching: false });
          }

          const newOptionList = [...(isSearch ? [] : optionList), ...resultList.current];
          setStateWrap({ optionList: newOptionList, fetching: false });
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

  const fetchOptions = _.debounce((isSearch?: boolean, value?: string) => {
    if (isSearch) {
      scrollPage.current = 1;
      searchName.current = value || '';
    }
    console.log(searchName.current);

    getOptionList(true, searchName.current);
  }, 300);

  function optionScroll(e: any) {
    e.persist();
    const { optionList } = state;
    // 如果已经获取了全部数据则不发起请求

    if (optionList.length && optionList.length == resultTotal.current) {
      return;
    }
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
    console.log('props.searchKey', props.searchKey);

    props.searchKey && fetchOptions(true, props.searchKey);
  }, [props.searchKey]);

  useEffect(() => {
    return () => {
      getOptionListSubscription && getOptionListSubscription.unsubscribe();
    };
  }, []);
  return { state, optionScroll, fetchOptions };
}
