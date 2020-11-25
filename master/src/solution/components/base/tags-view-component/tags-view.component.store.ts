import { ITagsViewState } from './tags-view.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux';
export function useTagsViewStore() {
  const dispatch = useDispatch();
  const history: any = useHistory();
  const containerRef = useRef<any>();
  const { state, setStateWrap } = useStateStore(new ITagsViewState());

  useEffect(() => {
    const p = containerRef.current.parentNode;

    setStateWrap({
      parentWidth: p.getBoundingClientRect().width
    });
    const pathname: string = history.location.pathname;

    dispatch({ type: 'ADD_TAGS', payload: pathname });

    const unhistory = history.listen((pathname: any) => {
      dispatch({ type: 'ADD_TAGS', payload: pathname.pathname });
    });

    return () => {
      unhistory();
    };
  }, []);

  function handleClick(tagViews: any, path: any, pathname: string, e: any) {
    e.stopPropagation();
    if (path === pathname) {
      const len = tagViews.length;
      if (len < 2) return;
      const item = tagViews[len - 2];
      dispatch({ type: 'DELETE_TAGS', payload: pathname });
      history.replace(item.path);
    } else {
      dispatch({ type: 'DELETE_TAGS', payload: path });
    }
  }
  return { state, handleClick, containerRef };
}
