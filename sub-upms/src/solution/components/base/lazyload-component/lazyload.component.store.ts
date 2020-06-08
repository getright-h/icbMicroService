import { action, observable } from 'mobx';

export class LazyloadStore {
  @observable yourObservableProps: string;
  @action yourActionProps = () => {};
}
