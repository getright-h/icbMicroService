import * as React from 'react';
import { TablePageTelStore } from './table-page-tel.component.store';
import { IProps } from './table-page-tel.interface';
import style from './table-page-tel.component.less';

export class TablePageTelComponent extends React.Component<IProps> {
  private readonly store: TablePageTelStore = this.props.tablePageTelStore;

  static defaultProps = {
    isFlex: true,
    leftFlex: 2,
    rightFlex: 6
  };

  renderSubHeader() {
    return (
      <div className={style.contentTitle}>
        <h1>{this.props.pageName}</h1>
      </div>
    );
  }

  render() {
    const {
      isFlex,
      leftFlex,
      rightFlex,
      pageLeft,
      selectTags,
      selectItems,
      searchButton,
      otherSearchBtns,
      table
    } = this.props;
    const LayoutSider = this.renderSubHeader();
    return (
      <div className={style.pageContainer}>
        {this.props.pageName && LayoutSider}
        <div className={isFlex && style.customFlex}>
          {pageLeft && (
            <div className={isFlex && style.customRight} style={{ flex: leftFlex }}>
              {pageLeft}
            </div>
          )}
          <div className={`${style.appManageAmPush} ${isFlex && style.customRight}`} style={{ flex: rightFlex }}>
            <div className={selectTags && style.selectTags}>{selectTags}</div>
            <div className={style.amMainHeader}>
              <div className={style.pushSearchRow}>{selectItems}</div>
              <div className={style.pushSearchButton}>{searchButton}</div>
            </div>
            {otherSearchBtns}
            {table}
          </div>
        </div>
      </div>
    );
  }
}
