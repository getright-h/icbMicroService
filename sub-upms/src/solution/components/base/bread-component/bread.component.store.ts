import { action, observable } from 'mobx';
import { IStore, IBread } from './bread.interface';

export class BreadStore implements IStore {
  @observable breads = [{ name: process.env.SITE_TITLE }];
  @action
  setBreads(breads: IBread[]) {
    this.breads = breads;
  }
}
