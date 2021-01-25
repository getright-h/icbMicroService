import { IShareLinkModalState } from './share-link-modal.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ShowNotification } from '~/framework/util/common';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useShareLinkModalStore() {
  const { state, setStateWrap } = useStateStore(new IShareLinkModalState());
  const inputRef = React.useRef(null);
  const location = useLocation();
  useEffect(() => {
    setStateWrap({
      copyValue: window.location.href.replace(location.pathname, '/userActionReport')
    });
  }, []);
  function onCopy() {
    inputRef.current.select();
    document.execCommand('copy');
    ShowNotification.info('复制成功');
  }
  return { state, onCopy, inputRef };
}
