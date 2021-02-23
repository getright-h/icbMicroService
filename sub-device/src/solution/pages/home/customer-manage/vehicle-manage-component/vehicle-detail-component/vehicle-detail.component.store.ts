import { IVehicleDetailState } from './vehicle-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';

export function useVehicleDetailStore() {
  const { state, setStateWrap } = useStateStore(new IVehicleDetailState());
  const customerManageService: CustomerManageService = new CustomerManageService();
  const history = useHistory();
  const params = useParams();
  const { $auth } = useAuthorityState();

  useEffect(() => {
    if (params.hasOwnProperty('id')) {
      setStateWrap({ id: params['id'] });
      getDetails(params['id']);
    }
  }, []);

  function getDetails(id: string) {
    customerManageService.getVehicleDetail(id).subscribe(res => {
      setStateWrap({ details: res });
    });
  }

  function linkToEdit() {
    history.push(`edit/${state.id}`);
  }
  return { state, $auth, linkToEdit };
}
