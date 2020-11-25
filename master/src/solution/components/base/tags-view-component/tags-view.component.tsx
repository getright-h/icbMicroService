import * as React from 'react';
import { useSelector } from 'react-redux';
import style from './tags-view.component.less';
import { useTagsViewStore } from './tags-view.component.store';
import { useHistory } from 'react-router-dom';
import { HOME_HASH } from '../../../context/redux/reducer/tagViews.redux';

export default function TagsViewComponent() {
  const { state, handleClick, containerRef } = useTagsViewStore();
  const history = useHistory();
  const pathname = history.location.pathname;
  const tagviews = useSelector((state: any) => state.tagViews);
  return (
    <div ref={containerRef} style={{ width: state.parentWidth }} className={style.breadcrumb}>
      <div className={style.test}>
        {tagviews &&
          tagviews.map((item: any) => {
            const len = item.title.length;
            let st = style.item;
            if (pathname === item.path) {
              st = style.item + ' ' + style.active;
            }
            return (
              <div className={st} key={item.path}>
                <span
                  className={style.title}
                  style={{ width: len * 15 }}
                  onClick={() => {
                    history.replace(item.path);
                  }}
                >
                  {item.title}
                </span>
                {item.path === HOME_HASH ? null : (
                  <span
                    className={style.close}
                    onClick={(event: any) => handleClick(tagviews, item.path, pathname, event)}
                  >
                    x
                  </span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
