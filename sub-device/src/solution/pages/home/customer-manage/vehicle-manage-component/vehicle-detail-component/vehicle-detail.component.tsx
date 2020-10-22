import { Button, Descriptions } from 'antd';
import * as React from 'react';
import style from './vehicle-detail.component.less';
import { useVehicleDetailStore } from './vehicle-detail.component.store';

export default function VehicleDetailComponent() {
  const { state, linkToEdit } = useVehicleDetailStore();

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
    return (
      <Descriptions style={{ padding: '10px 50px' }}>
        <Descriptions.Item label="车主姓名">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="车主电话">1810000000</Descriptions.Item>
        <Descriptions.Item label="车主性别">男</Descriptions.Item>
        <Descriptions.Item label="证件类型">身份证</Descriptions.Item>
        <Descriptions.Item label="证件号">111111111111111111</Descriptions.Item>
      </Descriptions>
    );
  }

  function vehicleInfo() {
    return (
      <Descriptions style={{ padding: '10px 50px' }}>
        <Descriptions.Item label="车架号">a</Descriptions.Item>
        <Descriptions.Item label="车牌号">a</Descriptions.Item>
        <Descriptions.Item label="车辆发动机号">a</Descriptions.Item>
        <Descriptions.Item label="车辆品牌">a</Descriptions.Item>
        <Descriptions.Item label="生产厂家">a</Descriptions.Item>
        <Descriptions.Item label="车型">a</Descriptions.Item>
        <Descriptions.Item label="配置">a</Descriptions.Item>
        <Descriptions.Item label="车辆颜色">a</Descriptions.Item>
        <Descriptions.Item label="购买日期">a</Descriptions.Item>
        <Descriptions.Item label="经销商">a</Descriptions.Item>
        <Descriptions.Item label="金融公司">a</Descriptions.Item>
        <Descriptions.Item label="车辆图片">a</Descriptions.Item>
        <Descriptions.Item label="服务开始时间">a</Descriptions.Item>
        <Descriptions.Item label="服务时长">a</Descriptions.Item>
      </Descriptions>
    );
  }

  function deviceInfo() {
    const deviceList = [
      { id: '1', code: '0826', type: 'MHW-1' },
      { id: '2', code: '1013', type: 'FF-22' }
    ];
    return (
      <Descriptions style={{ padding: '10px 50px' }}>
        <Descriptions.Item label="绑定设备">
          <div>
            {deviceList.map(device => (
              <div key={device.code} className={style.deviceItem}>
                <span>
                  {device.code}({device.type})
                </span>
                <Button type="link">解绑</Button>
              </div>
            ))}
          </div>
        </Descriptions.Item>
      </Descriptions>
    );
  }

  return (
    <React.Fragment>
      {renderHeader('车辆详情', () => {
        return <Button onClick={linkToEdit}>编辑</Button>;
      })}
      {renderSubHeader('车主信息')}
      {ownerInfo()}
      {renderSubHeader('车辆信息')}
      {vehicleInfo()}
      {renderSubHeader('设备信息')}
      {deviceInfo()}
    </React.Fragment>
  );
}
