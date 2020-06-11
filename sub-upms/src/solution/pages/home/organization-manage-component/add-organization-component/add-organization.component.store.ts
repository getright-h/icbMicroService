import { IAddOrganizationState } from './add-organization.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { RouteComponentProps } from 'react-router-dom';

export function useAddOrganizationStore(props: RouteComponentProps) {
  const { state, setStateWrap } = useStateStore(new IAddOrganizationState());

  return { state };
}
