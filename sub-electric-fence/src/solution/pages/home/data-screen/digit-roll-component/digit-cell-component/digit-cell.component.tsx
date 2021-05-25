import * as React from 'react';
import style from './digit-cell.component.less';
import { useDigitCellStore } from './digit-cell.component.store';
import { IDigitCellProps } from './digit-cell.interface';

export default function DigitCell(props: IDigitCellProps) {
  const { state } = useDigitCellStore();
  const letterH = props.height - props.width;
  return (
    <div
      className={style.box}
      style={{
        width: props.width + 'px',
        height: props.height + 'px',
        fontSize: props.width + 'px',
        lineHeight: props.height + 'px',
        background: props.bgColor,
        border: props.bgBorder
      }}
    >
      <span
        style={{
          top: letterH / 2 + 'px',
          letterSpacing: letterH + 'px',
          transform: `translate(-50%, -${props.digit * 10}%)`
        }}
      >
        0123456789
      </span>
    </div>
  );
}
