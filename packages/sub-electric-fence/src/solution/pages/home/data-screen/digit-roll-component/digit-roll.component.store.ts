import { IDigitRollProps, IDigitRollState } from './digit-roll.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useDigitRollStore(props: IDigitRollProps) {
  const { state, setStateWrap } = useStateStore(new IDigitRollState());

  useEffect(() => {
    if (props.num != state.curNum) {
      setStateWrap({ curNum: props.num });
    }
  }, [props.num]);

  function formatDigit(num: number, length: number) {
    let sum = '0'; // in case some random input
    if (typeof num === 'string') {
      sum = num;
    } else if (typeof num === 'number') {
      sum = num.toString();
    }
    // '1234' => '001234'
    const _len = sum.length;
    const _fullLen = length && typeof length === 'number' ? length : _len;
    if (_len >= _fullLen) {
      sum = sum.substring(_len - _fullLen, _len);
    } else {
      for (let i = 0; i < _fullLen - _len; i++) {
        sum = '0' + sum;
      }
    }
    const numArr = sum.split('');
    return numArr;

    // sum = sum.split('').reverse();
    // for (let i = sum.length - 1; i > 0; i--) {
    //   if (i % 3 === 0) {
    //     sum.splice(i, 0, divider)
    //   }
    // }
  }

  return { state, formatDigit };
}
