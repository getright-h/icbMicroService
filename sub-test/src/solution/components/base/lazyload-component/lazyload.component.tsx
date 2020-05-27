import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { LazyloadStore } from './lazyload.component.store';
import { IProps } from './lazyload.interface';
import { LazyloadLoadingComponent } from '../../component.module';
// import style from './lazyload.component.less';

@inject('lazyloadStore')
@observer
export default class LazyloadComponent extends React.Component<IProps> {
  private readonly store: LazyloadStore = this.props.lazyloadStore;
  render() {
    const LazyTargetComponent = React.lazy(this.props.load);
    return (
      <React.Suspense fallback={LazyloadLoadingComponent}>
        <LazyTargetComponent {...this.props} />
      </React.Suspense>
    );
  }
}
