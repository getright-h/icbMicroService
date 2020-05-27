import { action, observable } from 'mobx';

export class CubeStore {
  @observable yourObservableProps: string;
  @action yourActionProps = () => {};
}
