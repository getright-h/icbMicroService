import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BreadStore } from './bread.component.store';
import { IProps, IBread } from './bread.interface';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import style from './bread.component.less';

@inject('breadStore')
@observer
export default class BreadComponent extends React.Component<IProps> {
  private readonly store: BreadStore = this.props.breadStore;
  renderBreadItems() {
    const { breads } = this.store;
    const BreadItems = breads.map((bread: IBread) => {
      return (
        <Breadcrumb.Item key={bread.name}>
          {bread.path ? <Link to={bread.path}>{bread.name}</Link> : <span>{bread.name}</span>}
        </Breadcrumb.Item>
      );
    });
    return BreadItems;
  }
  render() {
    const BreadItems = this.renderBreadItems();
    return <Breadcrumb className={style.bread}>{BreadItems}</Breadcrumb>;
  }
}
