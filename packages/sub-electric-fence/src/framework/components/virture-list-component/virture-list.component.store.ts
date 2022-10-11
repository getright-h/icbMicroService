import { IVirtureListState, IVirtureListProps } from './virture-list.interface';
import { useStateStore } from '@fch/fch-tool';
import { useRef, useEffect } from 'react';

export function useVirtureListStore(props: IVirtureListProps) {
  const { state, setStateWrap } = useStateStore(new IVirtureListState());
  const { options, data } = props;
  const { itemHeight, minLength = 4 } = options;

  const virtualListScrollRef = useRef(null);
  const virtualListRef = useRef(null);
  const lastFirstIndex = useRef(-1);
  const interval = useRef(null);
  function getContainerHeight() {
    // 这个高度与传进来的高度是一样的
    return virtualListRef.current.clientHeight;
  }

  useEffect(() => {
    setStateWrap({ scrollHeight: data.length * itemHeight });
    onScroll();
    initAnimation();
    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, []);

  // 获取实际渲染的行数
  function getActureRows() {
    return Math.ceil(getContainerHeight() / itemHeight) + 3;
  }

  function initAnimation() {
    const len = data.length;
    console.log('data===>', data);
    if (len >= minLength) {
      virtualListScrollRef.current.animate(
        [{ transform: 'translate3D(0, 0, 0)' }, { transform: `translate3D(0, -${len * itemHeight}px, 0)` }],
        {
          duration: 1500 * len,
          iterations: Infinity
        }
      );
    }
  }

  function onScroll() {
    const len = data.length;
    updateShowData();
    if (len >= minLength) {
      // 每一次滑动都更新数据有性能浪费的地方所以这里等到切换了firstIndex采取执行下面的更新
      interval.current = setInterval(() => {
        updateShowData();
      }, 1500);
    }
  }

  function updateShowData() {
    if (lastFirstIndex.current == data.length) {
      lastFirstIndex.current = 0;
    }
    lastFirstIndex.current++;
    const lastIndex = lastFirstIndex.current + getActureRows() - 1;
    dataInViewSlice(lastFirstIndex.current, lastIndex);
  }

  function dataInViewSlice(firstIndex: number, lastIndex: number) {
    const showData = data.slice(firstIndex, lastIndex + 1).map((item: any) => ({
      origin: item,
      // 用来定位元素的位置
      $pos: firstIndex * itemHeight,
      $index: firstIndex++
    }));
    setStateWrap({ showData });
  }

  return { state, virtualListRef, onScroll, virtualListScrollRef };
}
