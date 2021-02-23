import { Button, Descriptions } from 'antd';
import * as React from 'react';
import { ImageDisplayComponent } from '~/framework/components/component.module';
import UnbindDeviceComponent from '../unbind-device-component/unbind-device.component';
import style from './vehicle-detail.component.less';
import { useVehicleDetailStore } from './vehicle-detail.component.store';

export default function VehicleDetailComponent() {
  const { state, $auth, linkToEdit } = useVehicleDetailStore();
  const { details } = state;

  function renderHeader(title: string, rightChild?: Function) {
    return (
      <header className={style.header}>
        <div className={style.mainTitle}>{title}</div>
        {rightChild && rightChild()}
      </header>
    );
  }
  function renderSubHeader(title: string, rightChild?: Function) {
    return (
      <header className={style.subHeader}>
        <div className={style.subTitle}>{title}</div>
        {rightChild && rightChild()}
      </header>
    );
  }

  function ownerInfo() {
    const { owner } = details;
    return (
      <Descriptions style={{ padding: '10px 50px' }}>
        <Descriptions.Item label="车主姓名">{owner.ownerName || '-'}</Descriptions.Item>
        <Descriptions.Item label="车主电话">{owner.ownerMobile || '-'}</Descriptions.Item>
        <Descriptions.Item label="车主性别">{owner.sexText || '-'}</Descriptions.Item>
        <Descriptions.Item label="证件类型">{owner.certificateTypeText || '-'}</Descriptions.Item>
        <Descriptions.Item label="证件号">{owner.certificateNo || '-'}</Descriptions.Item>
      </Descriptions>
    );
  }

  function vehicleInfo() {
    const { vehicle } = details;
    return (
      <Descriptions style={{ padding: '10px 50px' }}>
        <Descriptions.Item label="车架号">{vehicle.vinNo || '-'}</Descriptions.Item>
        <Descriptions.Item label="车牌号">{vehicle.plateNo || '-'}</Descriptions.Item>
        <Descriptions.Item label="车辆发动机号">{vehicle.engineNo || '-'}</Descriptions.Item>
        <Descriptions.Item label="车辆品牌">{vehicle.brandName || '-'}</Descriptions.Item>
        <Descriptions.Item label="生产厂家">{vehicle.factoryName || '-'}</Descriptions.Item>
        <Descriptions.Item label="车型">{vehicle.versionName || '-'}</Descriptions.Item>
        <Descriptions.Item label="配置">{vehicle.configName || '-'}</Descriptions.Item>
        <Descriptions.Item label="车辆颜色">{vehicle.color || '-'}</Descriptions.Item>
        <Descriptions.Item label="购买日期">{vehicle.buyTime || '-'}</Descriptions.Item>
        <Descriptions.Item label="经销商">{vehicle.distributorName || '-'}</Descriptions.Item>
        <Descriptions.Item label="金融公司" span={2}>
          {vehicle.financeName || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="车辆图片" span={3}>
          {vehicle.imageList.map((image: string) => (
            <ImageDisplayComponent imageUrl={image} key={image} />
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="服务开始时间">{vehicle.serverBeginTime || '-'}</Descriptions.Item>
        <Descriptions.Item label="服务时长">
          {vehicle.serverTime ? `${vehicle.serverTime} 个月` : '-'}
        </Descriptions.Item>
      </Descriptions>
    );
  }

  function deviceInfo() {
    const { deviceList } = details;
    return (
      <Descriptions style={{ padding: '10px 50px' }}>
        <Descriptions.Item label="绑定设备">
          <div>
            {deviceList.length
              ? deviceList.map((device: any) => (
                  <div key={device} className={style.deviceItem}>
                    <span>{device}</span>
                  </div>
                ))
              : '-'}
          </div>
        </Descriptions.Item>
      </Descriptions>
    );
  }

  return (
    <React.Fragment>
      {renderHeader('车辆详情', () => {
        return (
          <Button type="primary" onClick={linkToEdit} disabled={!$auth['editVehicle']}>
            编辑
          </Button>
        );
      })}
      {renderSubHeader('车主信息')}
      {details && ownerInfo()}
      {renderSubHeader('车辆信息')}
      {details && vehicleInfo()}
      {renderSubHeader('设备信息')}
      {details && deviceInfo()}
    </React.Fragment>
  );
}
