import { IUserActionReportState } from './user-action-report.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useUserActionReportStore() {
  const { state, setStateWrap } = useStateStore(new IUserActionReportState());
  useEffect(() => {
    if (window.innerWidth <= 750) {
      document.getElementsByTagName('html')[0].style['font-size'] = `${(window.innerWidth / 750) * 15}px`;
    } else {
      document.getElementsByTagName('html')[0].style['font-size'] = `${(window.innerWidth / 2500) * 15}px`;
    }
  }, []);
  return { state };
}
