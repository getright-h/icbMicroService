import * as React from 'react';
import DigitCell from './digit-cell-component/digit-cell.component';
import style from './digit-roll.component.less';
import { useDigitRollStore } from './digit-roll.component.store';
import { IDigitRollProps } from './digit-roll.interface';

export default function DigitRoll(props: IDigitRollProps) {
  const { state, formatDigit } = useDigitRollStore(props);
  const { numLength = 8, width = 30, height = 40, bgColor = '#142b71', bgBorder = '1px solid #263d8d' } = props;
  const numArr = formatDigit(state.curNum, numLength);
  const letterH = (height - width) / 2;

  return (
    <div className={style.digitContainer}>
      {numArr.map((d, index) => (
        <DigitCell key={index} digit={Number(d)} width={width} height={height} bgColor={bgColor} bgBorder={bgBorder} />
      ))}
      {typeof props.children == 'string' ? (
        <div style={{ marginBottom: letterH + 'px', marginLeft: letterH + 'px' }}>{props.children}</div>
      ) : (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    </div>
  );
}
