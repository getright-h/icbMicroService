import * as React from 'react';
import { useBreadStore } from './bread.component.store';
import { IBread } from './bread.interface';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import style from './bread.component.less';

export default function BreadComponent() {
  const { state } = useBreadStore();
  const { breads } = state;
  function renderBreadItems() {
    const BreadItems = breads.map((bread: IBread) => {
      return (
        <Breadcrumb.Item key={bread.name}>
          {bread.path ? <Link to={bread.path}>{bread.name}</Link> : <span>{bread.name}</span>}
        </Breadcrumb.Item>
      );
    });
    return BreadItems;
  }
  const BreadItems = renderBreadItems();
  return <Breadcrumb className={style.bread}>{BreadItems}</Breadcrumb>;
}
