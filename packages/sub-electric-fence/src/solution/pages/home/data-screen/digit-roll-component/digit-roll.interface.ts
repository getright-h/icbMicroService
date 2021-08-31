/**
 * @export state变量定义和初始化
 * @class IDigitRollState
 */
export class IDigitRollState {
  curNum = 0;
}

/**
 * @export props变量定义和初始化
 * @class IDigitRollProps
 */
export class IDigitRollProps {
  num: number;
  numLength?: number;
  width?: number;
  height?: number;
  bgColor?: string;
  bgBorder?: string;
  children?: unknown;
}
