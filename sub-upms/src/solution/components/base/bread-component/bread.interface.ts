import { BreadStore } from './bread.component.store';

export interface IBread {
  name:string,
  path?:string
}

export interface IProps {
  breadStore?: BreadStore
}

export interface IStore {
  breads:IBread[]
}