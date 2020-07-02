import * as React from 'react';
import style from './main-fence-manage.component.less';
import MainFenceLeftComponent from './main-fence-left-component/main-fence-left.component';
import MainFenceRightComponent from './main-fence-right-component/main-fence-right.component';
import { Input, Button } from 'antd';
import { TablePageTelComponent } from '../../../../components/base/table-page-tel-component/table-page-tel.component';
import { useMainFenceManageStore } from './main-fence-manage.component.store';
import CreateElectricFenceComponent from './create-electric-fence-component/create-electric-fence.component';

export default function MainFenceManageComponent() {
  const { state, searchClick, onValueChange } = useMainFenceManageStore();
  const { searchLoading, visible, circleLocation, circlrR, currentChoose } = state;

  function renderSelectItems() {
    return (
      <div style={{ position: 'relative' }}>
        <div className="push-search-item">
          <Input placeholder="请输入围栏名" />
        </div>
      </div>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="push-search-button-item">
        <Button type="primary" onClick={searchClick} loading={searchLoading}>
          查询
        </Button>
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={() => onValueChange<boolean>('visible', true)}>
          新建围栏
        </Button>
      </div>
    );
  }
  const drawerInfo = {
    closable: true,
    maskClosable: false,
    mask: false,
    visible,
    width: '100%',
    styleInfo: { position: 'absolute', zIndex: 0 },
    placement: 'left',
    title: '添加电子围栏',
    getContainer: false,
    onCloseDrawer: () => onValueChange('visible', false),
    container: (
      <CreateElectricFenceComponent onValueChange={onValueChange} circlrR={circlrR} centerPlace={circleLocation} />
    )
  };

  const rightProps = {
    circleLocation,
    circlrR,
    currentChoose
  };
  return (
    <div>
      <TablePageTelComponent
        pageName={'围栏管理'}
        isLeft={true}
        pageLeft={<MainFenceRightComponent {...rightProps} onValueChange={onValueChange} />}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={<MainFenceLeftComponent />}
        rightFlex={5}
        drawerInfo={drawerInfo}
        leftFlex={2}
      ></TablePageTelComponent>
    </div>
  );
}
