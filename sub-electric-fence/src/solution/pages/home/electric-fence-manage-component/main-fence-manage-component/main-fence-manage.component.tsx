import * as React from 'react';
import style from './main-fence-manage.component.less';
import MainFenceLeftComponent from './main-fence-left-component/main-fence-left.component';
import MainFenceRightComponent from './main-fence-right-component/main-fence-right.component';
import { Input, Button } from 'antd';
import { TablePageTelComponent } from '../../../../components/base/table-page-tel-component/table-page-tel.component';
import { useMainFenceManageStore } from './main-fence-manage.component.store';
import CreateElectricFenceComponent from './create-electric-fence-component/create-electric-fence.component';
import * as _ from 'lodash';

export default function MainFenceManageComponent() {
  const {
    state,
    onValueChange,
    tableRef,
    searchClick,
    editPopShow,
    changeSearchTableValue
  } = useMainFenceManageStore();
  const { searchLoading, visible, isEdit, circleLocation, circlrR, currentChoose, singleFenceData } = state;

  function renderSelectItems() {
    return (
      <div style={{ position: 'relative' }}>
        <div className="push-search-item">
          <Input placeholder="请输入围栏名" onChange={value => changeSearchTableValue('name', value)} />
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
        <Button type="primary" onClick={() => onValueChange('visible', true)}>
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
    title: isEdit ? '编辑电子围栏' : '添加电子围栏',
    getContainer: false,
    onCloseDrawer: () => onValueChange('visible', false),
    container: (
      <CreateElectricFenceComponent
        onValueChange={onValueChange}
        editData={singleFenceData}
<<<<<<< HEAD
=======
        isEdit={isEdit}
>>>>>>> caa6db3c71d1c632e6b071cb424d1aa4fce831ec
        circlrR={circlrR}
        centerPlace={circleLocation}
      />
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
        table={<MainFenceLeftComponent ref={tableRef} editPopShow={editPopShow} />}
        rightFlex={5}
        drawerInfo={drawerInfo}
        leftFlex={2}
      ></TablePageTelComponent>
    </div>
  );
}
