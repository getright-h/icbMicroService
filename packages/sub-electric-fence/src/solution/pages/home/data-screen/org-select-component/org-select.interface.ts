/**
 * @export state变量定义和初始化
 * @class IOrgSelectState
 */
export class IOrgSelectState {
  curValue: string;
  orgList: any[] = [];
  loading = false;
}

/**
 * @export props变量定义和初始化
 * @class IOrgSelectProps
 */
export class IOrgSelectProps {
  dropdownStyle: Record<string, any>;
  onChange: (value: string) => void;
}
