import { action, observable } from 'mobx';

export class LazyloadLoadingStore {
  @observable yourObservableProps: string;
  @action yourActionProps = () => {};
}
