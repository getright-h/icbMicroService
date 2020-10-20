import * as React from 'react';
import style from './flow-chart.component.less';
import { useFlowChartStore } from './flow-chart.component.store';
import { Divider } from 'antd';

export default function FlowChartComponent() {
  const data = [
    [
      {
        title: '总仓库'
      }
    ],
    [
      {
        title: '子仓库1'
      },
      {
        title: '子仓库2'
      },
      {
        title: '子仓库1'
      },
      {
        title: '子仓库2'
      },
      {
        title: '子仓库1'
      },
      {
        title: '子仓库2'
      }
    ]
  ];
  const { state } = useFlowChartStore();
  // 当有单个子元素的时候
  function renderSinglePlace(title: Array<{ title: string }>) {
    return (
      <>
        <div className={style.box1}>{title[0].title}</div>
      </>
    );
  }

  // 当有多个子元素的时候
  function renderMutiplePlace(title: Array<{ title: string }>) {
    return (
      <div className={style.box0}>
        {title.map((item, index) => {
          return (
            <div key={index} className={style.box2}>
              {item.title}
            </div>
          );
        })}
      </div>
    );
  }

  // 连接 的箭头
  function renderAline() {
    return (
      <div>
        <Divider type="vertical" style={{ height: '50px' }} plain></Divider>
        <div className={style.arrowhead}></div>
      </div>
    );
  }
  return (
    <div className={style.boxContent}>
      {data.map((item, index) => {
        const returnInfo = null;
        if (item.length == 1) {
          returnInfo = renderSinglePlace(item);
        } else {
          returnInfo = renderMutiplePlace(item);
        }
        if (index + 1 < data.length) {
          returnInfo = (
            <>
              {returnInfo}
              {renderAline()}
            </>
          );
        }
        return returnInfo;
      })}
    </div>
  );
}
