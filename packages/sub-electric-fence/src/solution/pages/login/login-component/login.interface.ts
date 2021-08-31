import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps {}

export interface IState {
  loginLoading: boolean;
  vCodeImage: string;
}
