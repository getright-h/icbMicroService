import { DrapChooseLoadingStore } from './drap-choose-loading.component.store';

/**
 * @param placeholder
 * @param getCurrentSelectInfo
 */
export interface IProps {
  drapChooseLoadingStore?: DrapChooseLoadingStore,
  placeholder?: string,
  getCurrentSelectInfo?: Function,
  reqUrl?: string,
  defaultValue?: string | undefined,
  seachKey?: string
}