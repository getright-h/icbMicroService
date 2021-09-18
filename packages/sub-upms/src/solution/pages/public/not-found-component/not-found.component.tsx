import * as React from 'react';
import { IProps } from './not-found.interface';
import style from './not-found.component.less';

export default class NotFoundComponent extends React.Component<IProps> {
  render() {
    return (
      <div className={style.notFoundView}>
        <div className={style.main}>
          {/* <Button type="primary" className={style.button}>
            返回首页
          </Button> */}
        </div>
      </div>
    );
  }
}
