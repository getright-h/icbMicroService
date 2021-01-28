import * as React from 'react';
import style from './i-qrcode.component.less';
import { useIQrcodeStore } from './i-qrcode.component.store';
import { IIQrcodeProps } from './i-qrcode.interface';

export const IQrcodeComponent = React.memo((props: IIQrcodeProps) => {
  const { state, qrRef } = useIQrcodeStore(props);
  return <div ref={qrRef}></div>;
});
