import { IShareLinkModalState } from './share-link-modal.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ShowNotification } from '~/framework/util/common';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useShareLinkModalStore() {
  const { state, setStateWrap } = useStateStore(new IShareLinkModalState());
  const inputRef = React.useRef(null);
  const qrCodeRef = React.useRef();
  const location = useLocation();
  useEffect(() => {
    setStateWrap({
      copyValue: process.env.SHARELINK
    });
  }, []);
  function onCopy() {
    inputRef.current.select();
    document.execCommand('copy');
    ShowNotification.info('复制成功');
  }
  function downloadQRCodeImg() {
    const img = qrCodeRef.current.getElementsByTagName('img')[0];
    const canvas = document.createElement('canvas');
    canvas.width = 430;
    canvas.height = 430;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 15, 15, 400, 400);
    ctx.font = '30px Arial';
    const url = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', url);
    downloadLink.setAttribute('download', 'userActionReport.jpg');
    downloadLink.click();
    ShowNotification.info('已下载二维码');
  }
  return { state, onCopy, inputRef, qrCodeRef, downloadQRCodeImg };
}
