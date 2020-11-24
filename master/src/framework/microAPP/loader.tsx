import React from 'react';
import ReactDOM from 'react-dom';
import LazyloadLoadingComponent from '~/solution/components/base/lazyload-loading-component/lazyload-loading.component';
/**
 * 渲染子应用
 */
function Render(props: any) {
  const { loading } = props;
  // return <>{loading && <h1>正在加载中...</h1>}</>;
  return <>{loading && <LazyloadLoadingComponent />}</>;
}

function render(props: any) {
  const container = document.getElementById('mic-loading');
  ReactDOM.render(<Render loading={props.loading} />, container);
}

export const loader = (loading: any) => render({ loading });
