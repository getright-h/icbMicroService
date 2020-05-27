import { action, observable } from 'mobx';

export class TablePageTelStore {
  @observable your_observable_props: string;
  @action your_action_props: Function;
}
