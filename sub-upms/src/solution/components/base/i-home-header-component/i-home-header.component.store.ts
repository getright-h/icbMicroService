import { StorageUtil } from '~/framework/util/storage';
import { HistoryService } from '~/framework/util/routes/history.service';

export function useHomeHeaderStore() {
  function logout() {
    StorageUtil.removeLocalStorage('token');
    StorageUtil.removeLocalStorage('systemId');
    StorageUtil.removeLocalStorage('systemCode');
    HistoryService.getHashHistory().push('/login');
  }

  function changePwd() {
    console.log('changePwd');
  }

  return { logout, changePwd };
}
