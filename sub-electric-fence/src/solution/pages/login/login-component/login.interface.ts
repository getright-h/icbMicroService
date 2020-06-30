import { FormComponentProps } from '@ant-design/compatible/lib/form/Form';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends FormComponentProps, RouteComponentProps {}

export interface IState {
  loginLoading: boolean;
}
