import { ComponentType } from 'react';
import { LazyloadStore } from './lazyload.component.store';

export interface IProps {
  lazyloadStore?: LazyloadStore,
  load:() => Promise<{ default: ComponentType<any>; }>
}