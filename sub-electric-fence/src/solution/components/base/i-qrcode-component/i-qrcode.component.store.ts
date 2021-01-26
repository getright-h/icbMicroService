import { IIQrcodeProps, IIQrcodeState } from './i-qrcode.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import QRCode from 'qrcodejs2';

export function useIQrcodeStore(props: IIQrcodeProps) {
  const { state, setStateWrap } = useStateStore(new IIQrcodeState());
  useEffect(() => {
    initQrcode();
  }, [props.url, props.qrRef]);

  function initQrcode() {
    new QRCode(props.qrRef.current, {
      text: props.url,
      width: props.widthAndHeight || 300,
      height: props.widthAndHeight || 300,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }
  return { state };
}
