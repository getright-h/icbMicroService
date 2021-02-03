import * as React from 'react';
import style from './add-monitor-car.component.less';
import { useAddMonitorCarStore } from './add-monitor-car.component.store';
import { IAddMonitorCarProps } from './add-monitor-car.interface';
import { Modal, Form, Select, Input, Switch } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import OrganizationControllerComponent from '~/solution/components/organization-controller-component/organization-controller.component';
import { ISelectLoadingComponent } from '~/framework/components/component.module';

export default function AddMonitorCarComponent(props: IAddMonitorCarProps) {
  const { state, onExpand, onCheck, onSelectCar, getDelCartDeviceList, insertVehicleGroup } = useAddMonitorCarStore(
    props
  );
  const {
    confirmLoading,
    expandedKeys,
    checkedKeys,
    checkedObject,
    delCarDeviceList = [],
    addChoseList = [],
    delChoseList = [],
    selectedVehicleCount,
    totalVehicleCount
  } = state;
  const { addMonitorModal = false, colse } = props;
  function RenderTree() {
    const prganizationControllerComponentProps = {
      expandedKeys,
      onExpand,
      getCheckedInfo: onCheck,
      checkedKeys,
      checkable: true,
      organizationChecked: true
    };
    return (
      <div className={style.chooeseOrg}>
        <OrganizationControllerComponent {...prganizationControllerComponentProps} />
      </div>
    );
  }
  const queryVehicleList = ISelectLoadingComponent({
    reqUrl: 'queryVehicleSelectedPagedList',
    placeholder: '请输入车架号',
    searchKeyName: 'strValue',
    mode: 'multiple',
    getCurrentSelectInfo: (value: string, option: any) => {
      onSelectCar(value, 'add');
    }
  });
  return (
    <Modal
      visible={addMonitorModal}
      centered={true}
      width={800}
      confirmLoading={confirmLoading}
      onOk={() => {
        insertVehicleGroup();
      }}
      destroyOnClose={true}
      onCancel={() => colse()}
      title={'添加监控车辆'}
    >
      <div className={style.monitorCar}>
        <div className={style.modalLeft}>
          <h2>选择</h2>
          <div className={style.modalLeftWapper}>
            <div style={{ height: 290, margin: 0, overflowY: 'auto' }}>
              <span>选择机构</span> {RenderTree()}
            </div>
            <div style={{ height: 120, margin: 0, paddingTop: '10px' }}>
              <span>选择车辆</span>
              <Form.Item name="vinNo">{queryVehicleList}</Form.Item>
            </div>
            <div style={{ height: 120, margin: 0, paddingTop: '10px' }}>
              <span>去除车辆</span>
              <Form.Item name={'vinRemoveNo'}>
                <Select
                  placeholder={'请输入车架号'}
                  onFocus={getDelCartDeviceList}
                  mode="multiple"
                  maxTagCount={3}
                  onChange={(value: any) => onSelectCar(value, 'del')}
                >
                  {delCarDeviceList.map((device: any) => (
                    <Select.Option key={device.id + 'del'} value={device.vinNo}>
                      {device.vinNo}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className={style.modalRight}>
          <h2>预览</h2>
          <div className={style.modalRightWapper}>
            <div className={style.rightTop}>
              <h2 className={style.subTitle}>已选车辆（{selectedVehicleCount}）</h2>
              <div className={style.chooesed}>
                {checkedObject.map((org: any) => (
                  <div key={org.id}>
                    <PlusCircleTwoTone twoToneColor={'green'} /> <span>{org.name}</span>
                  </div>
                ))}
                {addChoseList.map((device: any) => (
                  <div key={device + 'chose_add'}>
                    <PlusCircleTwoTone twoToneColor={'green'} /> <span>{device}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.rightBottom}>
              <h2 className={style.subTitle}>去除车辆（{delChoseList.length}）</h2>
              <div className={style.chooesed}>
                {delChoseList.map((device: any) => (
                  <div key={device + 'chose_del'}>
                    <MinusCircleTwoTone twoToneColor={'red'} /> <span>{device}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className={style.total}>车辆总计： （{totalVehicleCount}）</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
