import * as React from 'react';
import style from './image-display.component.less';
import { IImageDisplayProps } from './image-display.interface';
import { useImageDisplayStore } from './image-display.component.store';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { EyeOutlined } from '@ant-design/icons';

export default function ImageDisplayComponent(props: IImageDisplayProps) {
  const { state, showActionSheet, showCurrentImage } = useImageDisplayStore(props);
  const { modalIsOpen, file } = state;

  const { imageUrl, width, height } = props;

  return (
    <div className={style.previewImg} style={{ width: width || '100px', height: height || '100px' }}>
      <div className={style.showImg}>
        <img src={imageUrl} />
      </div>
      <div className={style.mask}>
        <EyeOutlined
          className={style.look}
          onClick={() => {
            showActionSheet(imageUrl);
          }}
        />
      </div>
      <ModalGateway>
        {modalIsOpen ? (
          <Modal onClose={() => showCurrentImage()}>
            <Carousel views={[{ source: file }]} components={{ Footer: null }} />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
