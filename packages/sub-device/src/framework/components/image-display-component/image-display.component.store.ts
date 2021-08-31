import { IImageDisplayState, IImageDisplayProps } from './image-display.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useImageDisplayStore(props: IImageDisplayProps) {
  const { state, setStateWrap } = useStateStore(new IImageDisplayState());

  function showActionSheet(imageUrl: string) {
    setStateWrap({ file: imageUrl });
    showCurrentImage();
  }

  function showCurrentImage() {
    setStateWrap({ modalIsOpen: !state.modalIsOpen });
  }
  return { state, showActionSheet, showCurrentImage };
}
