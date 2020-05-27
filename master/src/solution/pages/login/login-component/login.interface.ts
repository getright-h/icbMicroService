import { FormComponentProps } from 'antd/lib/form/Form';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends FormComponentProps, RouteComponentProps {}

export interface IState {
  loginLoading: boolean;
  vCodeImage: string;
}
