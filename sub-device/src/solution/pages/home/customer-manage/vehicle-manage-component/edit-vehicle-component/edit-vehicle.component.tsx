import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Descriptions, Form, Input, Radio, Row, Select, Space } from 'antd';
import * as React from 'react';
import { IUploadImgComponent } from '~/framework/components/component.module';
import style from './edit-vehicle.component.less';
import { useEditVehicleStore } from './edit-vehicle.component.store';

export default function EditVehicleComponent() {
  const { state, form, createUserTypeChange, handleSubmit, cancelSubmit } = useEditVehicleStore();
  const { isEdit, createUserType } = state;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

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

  function ownerForm() {
    return (
      <section className={style.formWrapper}>
        <Form {...layout} form={form}>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item label="方式" name="type" rules={[{ required: true }]}>
                <Radio.Group
                  buttonStyle="solid"
                  name="createUserType"
                  defaultValue={1}
                  onChange={e => createUserTypeChange(e.target.value)}
                >
                  <Radio.Button value={1}>绑定车主</Radio.Button>
                  <Radio.Button value={2}>创建车主</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            {createUserType == 1 && (
              <Col span={6}>
                <Form.Item label="搜索用户" name="user" rules={[{ required: true }]}>
                  <Select></Select>
                </Form.Item>
              </Col>
            )}
            {createUserType == 2 && (
              <React.Fragment>
                <Col span={6}>
                  <Form.Item label="车主姓名" name="userName" rules={[{ required: true }]}>
                    <Input placeholder="请输入车主姓名" />
                  </Form.Item>
                </Col>
                <Col span={6} offset={1}>
                  <Form.Item label="车主电话" name="userPhone" rules={[{ required: true }]}>
                    <Input placeholder="请输入车主电话" />
                  </Form.Item>
                </Col>
              </React.Fragment>
            )}
          </Row>
          <Row gutter={32}>
            {createUserType == 1 && (
              <Col span={16} offset={1}>
                <Descriptions className={style.userInfo}>
                  <Descriptions.Item label="车主姓名">Zhou Maomao</Descriptions.Item>
                  <Descriptions.Item label="车主电话">1810000000</Descriptions.Item>
                  <Descriptions.Item label="车主性别">男</Descriptions.Item>
                  <Descriptions.Item label="证件类型">身份证</Descriptions.Item>
                  <Descriptions.Item label="证件号">111111111111111111</Descriptions.Item>
                </Descriptions>
              </Col>
            )}
          </Row>
        </Form>
      </section>
    );
  }
  function vehicleForm() {
    return (
      <section className={style.formWrapper}>
        <Form {...layout} form={form}>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item label="车架号" name="vehicleFrameNumber" rules={[{ required: true }]}>
                <Input placeholder="请输入车架号" />
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="车牌号" name="vehicleNumber">
                <Input placeholder="请输入车牌号" />
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="车辆发动机号" name="vehicleNumber">
                <Input placeholder="请输入发动机号" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="车辆品牌" name="vehicleFrameNumber">
                <Select></Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="生产厂家" name="vehicleNumber">
                <Select></Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="车辆型号" name="vehicleNumber">
                <Select></Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="车辆配置" name="vehicleNumber">
                <Select></Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="车辆颜色" name="vehicleNumber">
                <Select></Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="购买日期" name="vehicleNumber">
                <DatePicker
                  style={{ width: '100%' }}
                  showTime={{ format: 'YYYY-MM-DD' }}
                  format="YYYY-MM-DD"
                  // defaultValue={editPurchaseTime && moment(editPurchaseTime)}
                  placeholder="请选择时间"
                  // onChange={(date: moment.Moment, dateString: string) => {
                  //   handleTimeChange(dateString);
                  // }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="金融公司" name="vehicleNumber">
                <Select></Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="经销商" name="vehicleNumber">
                <Select></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item label="车辆图片" name="image">
                <IUploadImgComponent
                // fileList={imageList}
                // getFileList={url => {
                //   form.setFieldsValue({ image: url });
                // }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item label="服务开始时间" name="vehicleNumber">
                <DatePicker
                  style={{ width: '100%' }}
                  showTime={{ format: 'YYYY-MM-DD' }}
                  format="YYYY-MM-DD"
                  // defaultValue={editPurchaseTime && moment(editPurchaseTime)}
                  placeholder="请选择时间"
                  // onChange={(date: moment.Moment, dateString: string) => {
                  //   handleTimeChange(dateString);
                  // }}
                />
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="服务时长" name="serviceTime">
                <Input suffix="月" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </section>
    );
  }
  function deviceForm() {
    return (
      <section className={style.formWrapper}>
        <Form {...layout} form={form} initialValues={{ deviceList: [{}] }}>
          <Row gutter={32}>
            <Col span={12}>
              <Form.List name="deviceList">
                {(fields, { add, remove }) => {
                  return (
                    <Form.Item label="添加设备" style={{ alignItems: 'start' }} labelCol={{ span: 4 }}>
                      {fields.map((field, index) => (
                        <Space className={style.space} key={`device-${index}`}>
                          <Form.Item {...field} name={[field.name, 'typeId']}>
                            <Select style={{ width: '240px' }}></Select>
                          </Form.Item>
                          <div className={style.fieldAddButton}>
                            <PlusOutlined
                              onClick={() => {
                                add();
                              }}
                            />
                            {index != 0 && (
                              <MinusOutlined
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            )}
                          </div>
                        </Space>
                      ))}
                    </Form.Item>
                  );
                }}
              </Form.List>
            </Col>
          </Row>
        </Form>
      </section>
    );
  }

  function deviceInfo() {
    const deviceList = [
      { id: '1', code: '0826', type: 'MHW-1' },
      { id: '2', code: '1013', type: 'FF-22' }
    ];
    return (
      <section className={style.formWrapper}>
        <Form {...layout} form={form}>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label="绑定设备" labelCol={{ span: 4 }} style={{ marginBottom: 0 }}>
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
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </section>
    );
  }

  function submitButtons() {
    return (
      <section className={style.submitButtons}>
        <Button
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then(values => handleSubmit(values))
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          确定
        </Button>
        <Button onClick={cancelSubmit}>取消</Button>
      </section>
    );
  }

  return (
    <React.Fragment>
      {renderHeader(isEdit ? '编辑车辆' : '创建车辆', () => {
        return <Button></Button>;
      })}
      {renderSubHeader('车主信息')}
      {ownerForm()}
      {renderSubHeader('车辆信息')}
      {vehicleForm()}
      {renderSubHeader('设备信息')}
      {isEdit && deviceInfo()}
      {deviceForm()}
      {submitButtons()}
    </React.Fragment>
  );
}
