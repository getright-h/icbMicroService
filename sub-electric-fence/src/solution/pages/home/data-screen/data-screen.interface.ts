/**
 * @export state变量定义和初始化
 * @class IDataScreenState
 */
export class IDataScreenState {
  isFull = true;
  num = 0;
}

export interface CustomPanelProps {
  children: any;
  title: string;
}

export const gradients = {
  orange: {
    type: 'linear',
    x: 0,
    y: 1,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#FF822E'
      },
      {
        offset: 1,
        color: '#F7C83C'
      }
    ]
  },
  red: {
    type: 'linear',
    x: 0,
    y: 1,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#FF3A5A'
      },
      {
        offset: 1,
        color: '#FB8474'
      }
    ]
  },
  purple: {
    type: 'linear',
    x: 0,
    y: 1,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#5A42EC'
      },
      {
        offset: 1,
        color: '#4B77FE'
      }
    ]
  },
  blue: {
    type: 'linear',
    x: 0,
    y: 1,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#0966FF'
      },
      {
        offset: 1,
        color: '#3CB1FF'
      }
    ]
  }
};
