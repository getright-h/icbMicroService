import { ITagsViewState } from './tags-view.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux';
import MainReducer from '../../context/redux/reducer/index';
export function useTagsViewStore() {
  const dispatch = useDispatch();
  const history: any = useHistory();
  const { state, setStateWrap, getState } = useStateStore(new ITagsViewState());

  useEffect(() => {
    const pathname: string = history.location.pathname;

    dispatch({ type: 'ADD_TAGS', payload: pathname });
    // setStateWrap({
    //   visitedViews: data
    // });

    // const handleChange = (e: any) => {
    //   const pathname: string = e.pathname;

    //   // const flag = state.visitedViews.find(item => item === hash[1]);

    //   const data = getState().visitedViews;
    //   data.push(pathname);
    //   console.log('data===>', data);
    //   setStateWrap({
    //     visitedViews: data
    //   });
    // };
    // const unlisten = history.listen(handleChange);
    // return () => {
    //   unlisten();
    // };
  }, []);

  useEffect(() => {
    const data = state.visitedViews;
    console.log('==visitedViews changes=>', data);
  }, [state.visitedViews]);

  return { state };
}
