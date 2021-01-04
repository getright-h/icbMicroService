import React from 'react';
import { TablePageTelStore } from './table-page-tel.component.store';
import { IProps } from './table-page-tel.interface';
import style from './table-page-tel.component.less';
import { Drawer } from 'antd';

export class TablePageTelComponent extends React.Component<IProps> {
  private readonly store: TablePageTelStore = this.props.tablePageTelStore;

  static defaultProps = {
    isFlex: true,
    leftFlex: 0,
    rightFlex: 6,
    isLeft: false
  };

  renderSubHeader() {
    return (
      <div className={style.contentTitle}>
        <h1>{this.props.pageName}</h1>
      </div>
    );
  }

  renderDrawer() {
    const {
      closable,
      maskClosable,
      mask,
      visible,
      width,
      styleInfo,
      placement,
      title,
      container,
      onCloseDrawer
    } = this.props.drawerInfo;
    return (
      <Drawer
        title={title}
        placement={placement}
        closable={closable}
        maskClosable={maskClosable}
        mask={mask}
        visible={visible}
        style={styleInfo}
        width={width}
        key={placement}
        getContainer={false}
        onClose={onCloseDrawer}
      >
        {container}
      </Drawer>
    );
  }

  tableFunction(
    isFlex: boolean,
    selectTags: boolean,
    selectItems: any,
    searchButton: any,
    otherSearchBtns: any,
    table: any,
    rightFlex: any
  ) {
    return (
      <>
        <div className={`${style.appManageAmPush} ${isFlex && style.customRight}`} style={{ flex: rightFlex }}>
          <div className={selectTags && style.selectTags}>{selectTags}</div>
          <div className={style.amMainHeader}>
            <div className={style.pushSearchRow}>{selectItems}</div>
            <div className={style.pushSearchButton}>{searchButton}</div>
          </div>
          {otherSearchBtns}
          {table}
          {this.props.drawerInfo && this.renderDrawer()}
        </div>
      </>
    );
  }

  otherFieldLeftFunction(isFlex: boolean, leftFlex: any, pageLeft: any) {
    return (
      <div className={isFlex && style.customRight} style={{ flex: leftFlex, padding: 0 }}>
        {pageLeft}
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
      table,
      isLeft
    } = this.props;
    const LayoutSider = this.renderSubHeader();
    console.log(isFlex);

    return (
      <div className={style.pageContainer}>
        {LayoutSider}
        <div className={isFlex && style.customFlex}>
          {isLeft ? (
            <>
              {this.tableFunction(isFlex, selectTags, selectItems, searchButton, otherSearchBtns, table, leftFlex)}
              {this.otherFieldLeftFunction(isFlex, rightFlex, pageLeft)}
            </>
          ) : (
            <>
              {leftFlex ? this.otherFieldLeftFunction(isFlex, leftFlex, pageLeft) : null}
              {this.tableFunction(isFlex, selectTags, selectItems, searchButton, otherSearchBtns, table, rightFlex)}
            </>
          )}
        </div>
      </div>
    );
  }
}
