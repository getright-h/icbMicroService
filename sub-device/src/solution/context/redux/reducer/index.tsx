import { combineReducers } from 'redux';
import menu from './menu.redux';
import tagViews from './tagViews.redux';

const MainReducer = combineReducers({
  menu,
  tagViews
});

export default MainReducer;
