import { IFenceModalViewState } from './fence-modal-view.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { IMAP } from '~/solution/shared/util/map.util';
declare const AMap: any;

export function useFenceModalViewStore() {
  const { state, setStateWrap } = useStateStore(new IFenceModalViewState());
  const map: any = useRef();
  const mouseTool: any = useRef();
  useEffect(() => {
    initMap();
  }, []);

  function initMap() {
    // 获取当前用户定位
    map.current = IMAP.createMap('container');
    IMAP.addBaseController(map.current);
    mouseTool.current = IMAP.Rule.init(map.current);
  }

  function startRule() {
    if (!state.isRule) {
      IMAP.Rule.goToDrawRule(mouseTool.current);
    } else {
      mouseTool.current.close(true);
    }
    setStateWrap({ isRule: !state.isRule });
  }

  return { state, startRule };
}
