import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router';

type RouteComponent = ComponentType<RouteComponentProps | any>
type RouteComponentPromise = () => Promise<{ default:any }>

export interface IRoute {
  component: RouteComponent | RouteComponentPromise | any;
  path: string;
  exact?: boolean;
  strategy?: any;
  lazyload?:boolean;
}
