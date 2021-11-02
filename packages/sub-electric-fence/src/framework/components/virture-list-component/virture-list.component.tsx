import * as React from 'react';
import styles from './virture-list.component.less';
import { useVirtureListStore } from './virture-list.component.store';
import { IVirtureListProps } from './virture-list.interface';

export default function VirtureListComponent(props: IVirtureListProps) {
  const { state, virtualListRef, virtualListScrollRef } = useVirtureListStore(props);
  const { style } = props;
  const { showData, scrollHeight } = state;
  return (
    <div style={style} ref={virtualListRef} className={styles.VirtualList}>
      <div className={styles.VirtualListContainer} ref={virtualListScrollRef} style={{ height: scrollHeight }}>
        {showData.map((item: any, i: number) => (
          <div key={i} className={styles.VirtualListPlaceholder} style={{ top: item.$pos }}>
            {item.origin !== undefined ? (props.children as any)(item.origin, item.$index) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
