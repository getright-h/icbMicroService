import { action, observable } from 'mobx';
import { DrapChooseLoadingReturn } from '../../../model/dto/drap-choose-loading.dto';
import { DepUtil } from '../../../../framework/aop/inject';
import { DrapChooseLoadingService } from '../../../model/services/drap-choose-loading.service';
import { Subscription } from 'rxjs';
import { useRef } from 'react';
function name(params) {
  const page = useRef(1);
  page.current = 2;
  
}

export class DrapChooseLoadingStore {
  /**
   * @param optiosnList 下拉的选择项集合
   * @param fetching 加载状态
   */

  @DepUtil.Inject(DrapChooseLoadingService)
  drapChooseLoadingService: DrapChooseLoadingService;

  @observable optiosnList: DrapChooseLoadingReturn[] = [];

  @observable fetching = true;

  currentUrl = '';
  getManageListSubscription: Subscription;
  scrollPage = 1;
  searchName = '';
  @action getManageList = () => {
    this.fetching = true;
    this.getManageListSubscription = this.drapChooseLoadingService[this.currentUrl]({
      index: this.scrollPage,
      name: this.searchName,
      size: 20
    }).subscribe(
      (res: any) => {
        this.fetching = false;
        this.optiosnList = [...this.optiosnList, ...res.dataList];
      },
      (error: any) => {
        console.log(error);
      }
    );
  };

  @action fetchCompany = (value: string) => {
    this.optiosnList = [];
    this.scrollPage = 1;
    this.searchName = value;
    this.getManageList();
  };

  @action companyScroll = (e: any) => {
    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      this.scrollPage++;
      this.getManageList(); // 调用api方法
    }
  };
}
