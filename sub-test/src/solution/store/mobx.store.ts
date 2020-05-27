/**
 * 此文件将由构建工具自动生成注入，请勿手动修改！
 * 此文件将由构建工具自动生成注入，请勿手动修改！
 * 此文件将由构建工具自动生成注入，请勿手动修改！
 */

//  -- Package Start --

// import { LoginStore } from '~/solution/pages/login/login-component/login.component.store';
import { NotFoundStore } from '~/solution/pages/public/not-found-component/not-found.component.store';
import { CubeStore } from '~/solution/components/base/cube-component/cube.component.store';
// import { AddressChooseStore } from '~/solution/components/base/address-choose-component/address-choose.component.store';
import { BreadStore } from '~/solution/components/base/bread-component/bread.component.store';
import { DrapChooseLoadingStore } from '~/solution/components/base/drap-choose-loading-component/drap-choose-loading.component.store';
import { TimePickerStore } from '~/solution/components/base/time-picker-component/time-picker.component.store';
import { LazyloadLoadingStore } from '~/solution/components/base/lazyload-loading-component/lazyload-loading.component.store';
import { LazyloadStore } from '~/solution/components/base/lazyload-component/lazyload.component.store';
import { TablePageTelStore } from '~/solution/components/base/table-page-tel-component/table-page-tel.component.store';
//  -- Package End --

export class Stores {
  //  -- Attr Start --
  // loginStore: LoginStore = new LoginStore();
  notFoundStore: NotFoundStore = new NotFoundStore();
  cubeStore: CubeStore = new CubeStore();
  // addressChooseStore: AddressChooseStore = new AddressChooseStore();
  drapChooseLoadingStore: DrapChooseLoadingStore = new DrapChooseLoadingStore();
  breadStore: BreadStore = new BreadStore();
  timePickerStore: TimePickerStore = new TimePickerStore();
  lazyloadLoadingStore: LazyloadLoadingStore = new LazyloadLoadingStore();
  lazyloadStore: LazyloadStore = new LazyloadStore();
  tablePageTelStore: TablePageTelStore = new TablePageTelStore();
  //  -- Attr End --

  static forRoot() {
    if (window.mobxGlobalWindowStore) return window.mobxGlobalWindowStore;
    const globalStore = new Stores();
    window.mobxGlobalWindowStore = globalStore;
    return globalStore;
  }
}
