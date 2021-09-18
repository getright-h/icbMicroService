import * as React from 'react';
import MainFenceLeftComponent from './main-fence-left-component/main-fence-left.component';
import MainFenceRightComponent from './main-fence-right-component/main-fence-right.component';
import { Input, Button } from 'antd';
import { TablePageTelComponent } from '../../../../components/base/table-page-tel-component/table-page-tel.component';
import { useMainFenceManageStore } from './main-fence-manage.component.store';
import CreateElectricFenceComponent from './create-electric-fence-component/create-electric-fence.component';
import * as _ from 'lodash';
import { MainFenceManageContext } from './main-fence-manage.provider';
import { visibleInfo, newFence, getFenceListAction, changeSearchForm } from './hooks-redux/main-fence-action';
import { MainFenceReducer, mainFenceInitialState } from './hooks-redux/main-fence-reducer';

export default function MainFenceManageComponent() {
  const { state, $auth, onValueChange } = useMainFenceManageStore();
  const { searchLoading, circleLocation, circlrR, currentChoose, singleFenceData, polygon } = state;
  const [fenceManage, dispatch] = React.useReducer(MainFenceReducer, mainFenceInitialState);
  const { visible, isEdit, searchForm } = fenceManage;
  function renderSelectItems() {
    return (
      <div style={{ position: 'relative' }}>
        <div className="push-search-item">
          <Input
            placeholder="请输入围栏名"
            allowClear
            onChange={value => changeSearchForm('name', value.target.value, dispatch)}
          />
        </div>
      </div>
    );
  }

  function renderSearchButtons() {
    return (
      <div className="push-search-button-item">
        <Button
          type="primary"
          onClick={() => getFenceListAction({ ...searchForm, index: 1 }, dispatch)}
          loading={searchLoading}
          // disabled={!$auth['queryAllFence']}
          // className={`${$auth['queryAllFence'] ? '' : 'no-auth-link'}`}
        >
          查询
        </Button>
      </div>
    );
  }
  function renderOtherButtons() {
    return (
      <div className="other-search-button-item">
        <Button
          type="primary"
          onClick={() => newFence(dispatch)}
          disabled={!$auth['addFence']}
          // className={`${$auth['addFence'] ? '' : 'no-auth-link'}`}
        >
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
    onCloseDrawer: () => visibleInfo(false, dispatch),
    container: (
      <CreateElectricFenceComponent
        onValueChange={onValueChange}
        editData={singleFenceData}
        polygon={polygon}
        isEdit={isEdit}
        circlrR={circlrR}
        centerPlace={circleLocation}
      />
    )
  };

  const rightProps = {
    circleLocation,
    circlrR,
    currentChoose,
    isEdit,
    polygon
  };
  return (
    <MainFenceManageContext.Provider value={{ mainFenceManageState: fenceManage, dispatch }}>
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
    </MainFenceManageContext.Provider>
  );
}
