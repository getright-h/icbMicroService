import * as React from 'react';
import style from './add-monitor-car.component.less';
import { useAddMonitorCarStore } from './add-monitor-car.component.store';
import { IAddMonitorCarProps } from './add-monitor-car.interface';
import { Modal, Form, Select, Input, Switch } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import OrganizationControllerComponent from '~/solution/components/organization-controller-component/organization-controller.component';

export default function AddMonitorCarComponent(props: IAddMonitorCarProps) {
  const { state, onExpand, onCheck, onSelectCar, getCartDeviceList, insertVehicleGroup } = useAddMonitorCarStore(props);
  const {
    confirmLoading,
    expandedKeys,
    checkedKeys,
    checkedObject,
    addCarDeviceList = [],
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
      checkedKeys
    };
    return (
      <div>
        <OrganizationControllerComponent checkable {...prganizationControllerComponentProps} />
      </div>
    );
  }
  return (
    <Modal
      visible={addMonitorModal}
      width={700}
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
            <div>
              <div style={{ height: 200, margin: 0 }}>
                <span>选择机构</span> {RenderTree()}
              </div>
              <div style={{ height: 170, margin: 0 }}>
                <Form.Item label="选择车辆" name="vinNo">
                  <Select
                    placeholder={'请输入车架号'}
                    onFocus={() => getCartDeviceList('add')}
                    mode="multiple"
                    onChange={(value: any) => onSelectCar(value, 'add')}
                  >
                    {addCarDeviceList.map((device: any) => (
                      <Select.Option key={device.id + 'add'} value={device.vinNo}>
                        {device.vinNo}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div style={{ height: 160, margin: 0 }}>
                <Form.Item label="去除车辆" name={'vinRemoveNo'}>
                  <Select
                    placeholder={'请输入车架号'}
                    onFocus={() => getCartDeviceList('del')}
                    mode="multiple"
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
