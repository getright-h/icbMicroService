import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { useLocation } from 'react-router-dom';

export function useAuthorityState() {
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  const { pathname } = useLocation();
  const { auth = {} } = gState?.myInfo as any;
  console.log(auth, pathname);
  let authority = {};
  if (auth[pathname]) {
    authority = auth[pathname];
  }
  return {
    authority
  };
}
