import * as React from 'react';
import { useSelector } from 'react-redux';
import style from './tags-view.component.less';
import { useTagsViewStore } from './tags-view.component.store';
import { Link, useHistory } from 'react-router-dom';

export default function TagsViewComponent() {
  const { state } = useTagsViewStore();
  const history = useHistory();
  const pathname = history.location.pathname;
  console.log('pathname===>', pathname);
  const tagviews = useSelector((state: any) => state.tagViews);
  return (
    <div className={style.test}>
      {tagviews &&
        tagviews.map((item: any) => {
          let st = style.item;
          if (pathname === item.path) {
            st = style.item + ' ' + style.active;
          }
          return (
            <div className={st} key={item.path}>
              <span
                onClick={() => {
                  history.replace(item.path);
                }}
              >
                {item.title}
              </span>
              <span className={style.close}>x</span>
            </div>
          );
        })}
    </div>
  );
}
