import * as React from 'react';
import { inject, observer } from 'mobx-react';
import style from './cube.component.less';
import { IProps } from './cube.interface';

@inject('cubeStore')
@observer
export default class CubeComponent extends React.Component<IProps> {
  private cubeRef: HTMLDivElement = null;
  private stageRef: HTMLDivElement = null;
  static defaultProps = {
    size: '50px',
    top: '10%',
    left: '20%'
  };
  componentDidMount() {
    const subDivs = this.cubeRef.getElementsByTagName('div');
    const { size, top, left } = this.props;
    this.cubeRef.style.width = size;
    this.cubeRef.style.height = size;
    top && (this.stageRef.style.top = top);
    left && (this.stageRef.style.left = left);

    [].slice.call(subDivs).forEach((ele: HTMLDivElement, index: number) => {
      ele.style.width = size;
      ele.style.height = size;
      if (index === 1) {
        ele.style.top = '-' + size;
      } else if (index === 2) {
        ele.style.left = '-' + size;
      }
    });
  }
  render() {
    return (
      <div className={style.stage} ref={ele => (this.stageRef = ele)}>
        <div className={style.cube} ref={ele => (this.cubeRef = ele)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
