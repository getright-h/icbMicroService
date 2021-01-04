import React from 'react';
import { IProps } from './lazyload.interface';
import { LazyloadLoadingComponent } from '../../component.module';

export default class LazyloadComponent extends React.Component<IProps> {
  render() {
    const LazyTargetComponent = React.lazy(this.props.load);
    return (
      <React.Suspense fallback={LazyloadLoadingComponent}>
        <LazyTargetComponent {...this.props} />
      </React.Suspense>
    );
  }
}
