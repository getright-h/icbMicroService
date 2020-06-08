import { action, observable } from 'mobx';

export class TimePickerStore {
  @observable yourObservableProps: string;
  @action yourActionProps = () => {};
}
