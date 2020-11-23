import { Component } from 'react';
import { TablePageTelStore } from './table-page-tel.component.store';

export interface IProps {
  tablePageTelStore?: TablePageTelStore,
  pageName?: string,
  isFlex?: boolean,
  leftFlex?: number,
  rightFlex?: number,
  PageLeftComponent?: any,
  pageLeft?: any,
  selectTags?: any,
  selectItems?: any,
  searchButton?: any,
  otherSearchBtns?: any,
  table?: any
}