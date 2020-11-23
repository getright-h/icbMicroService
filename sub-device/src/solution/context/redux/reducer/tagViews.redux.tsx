import TYPES from '../types';
import { TagViews } from './reducer.interface';
import { IMenu } from '~/framework/components/menu-component/menu.interface';
import { PAGES_MENU } from '../../../shared/constant/common.const';
import _ from 'lodash';

const menus = _.cloneDeep(PAGES_MENU.MENU);
function jsonToArray(nodes: any, prefix: string): any {
  let r = [];
  if (Array.isArray(nodes)) {
    for (let i = 0, l = nodes.length; i < l; i++) {
      nodes[i].path = prefix + '/' + nodes[i].path;
      r.push(nodes[i]); // 取每项数据放入一个新数组
      if (Array.isArray(nodes[i]['children']) && nodes[i]['children'].length > 0)
        // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
        r = r.concat(jsonToArray(nodes[i]['children'], nodes[i]['path']));
      delete nodes[i]['children'];
    }
  }
  return r;
}
const flatArr = jsonToArray(menus, '');
export const initialState: any = [
  {
    path: '/home',
    title: '首页'
  }
];

const tagReducer = (state = initialState, action: { type: string; payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.ADD_TAGS:
      return add(state, payload);
    default:
      return state;
  }
};
function add(origintagViews: any[], payload: string) {
  const tagViews = origintagViews.slice();
  if (
    tagViews.find(item => {
      return item.path === payload;
    })
  )
    return tagViews;
  const item = flatArr.find((item: any) => {
    return item.path === payload;
  });
  if (item) {
    const obj = {
      title: item.title,
      path: item.path
    };
    tagViews.push(obj);
    return tagViews;
  }
}

export default tagReducer;
