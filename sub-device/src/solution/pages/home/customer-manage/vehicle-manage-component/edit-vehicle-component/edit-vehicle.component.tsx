import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Descriptions, Form, Input, Radio, Row, Select, Space } from 'antd';
import * as React from 'react';
import { ISelectLoadingComponent, IUploadImgComponent } from '~/framework/components/component.module';
import UnbindDeviceComponent from '../unbind-device-component/unbind-device.component';
import style from './edit-vehicle.component.less';
import { useEditVehicleStore } from './edit-vehicle.component.store';

export default function EditVehicleComponent() {
  const {
    state,
    form,
    createUserTypeChange,
    handleSubmit,
    cancelSubmit,
    getCurrentSelectInfo,
    getCurrentSelectOwner,
    handleDeviceListChange,
    vehicleLayoutChange,
    unbindDevice,
    modalCancel
  } = useEditVehicleStore();
  const { isEdit, createUserType, extraFormData, bindedDeviceList, ownerInfo, imageList, confirmLoading } = state;
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

  function renderOwnerForm() {
    const queryOwnerList = ISelectLoadingComponent({
      reqUrl: 'queryOwnerList',
      placeholder: '请选择车主',
      searchKey: ownerInfo?.ownerName || '',
      searchKeyName: 'strValue',
      getCurrentSelectInfo: (value: string, option: any) => {
        getCurrentSelectOwner(value);
      },
      searchForm: { sex: -1, follow: -1 }
    });
    return (
      <section className={style.formWrapper}>
        <Form {...layout} form={form}>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item label="方式" rules={[{ required: true }]}>
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
                <Form.Item label="搜索用户" name={['owner', 'id']} rules={[{ required: true, message: '请选择用户' }]}>
                  {queryOwnerList}
                </Form.Item>
              </Col>
            )}
            {createUserType == 2 && (
              <React.Fragment>
                <Col span={6}>
                  <Form.Item label="车主姓名" name={['owner', 'name']} rules={[{ required: true }]}>
                    <Input placeholder="请输入车主姓名" />
                  </Form.Item>
                </Col>
                <Col span={6} offset={1}>
                  <Form.Item label="车主电话" name={['owner', 'mobile']} rules={[{ required: true }]}>
                    <Input placeholder="请输入车主电话" />
                  </Form.Item>
                </Col>
              </React.Fragment>
            )}
          </Row>
          <Row gutter={32}>
            {createUserType == 1 && ownerInfo && (
              <Col span={16} offset={1}>
                <Descriptions className={style.userInfo}>
                  <Descriptions.Item label="车主姓名">{ownerInfo.ownerName || '-'}</Descriptions.Item>
                  <Descriptions.Item label="车主电话">{ownerInfo.ownerMobile || '-'}</Descriptions.Item>
                  <Descriptions.Item label="车主性别">{ownerInfo.sexText || '-'}</Descriptions.Item>
                  <Descriptions.Item label="证件类型">{ownerInfo.certificateTypeText || '-'}</Descriptions.Item>
                  <Descriptions.Item label="证件号">{ownerInfo.certificateNo || '-'}</Descriptions.Item>
                </Descriptions>
              </Col>
            )}
          </Row>
        </Form>
      </section>
    );
  }
  function renderVehicleForm() {
    const { vehicleBrandList, vehicleFactoryList, vehicleVersionList, vehicleConfigList, vehicleCode } = state;
    const queryDistributorList = ISelectLoadingComponent({
      reqUrl: 'queryOrganizationList',
      placeholder: '请选择所属经销商',
      searchKey: extraFormData.distributorName || '',
      getCurrentSelectInfo: (value: string, option: any) => {
        getCurrentSelectInfo('distributor', option);
      },
      searchForm: {
        systemId: process.env.SYSTEM_ID,
        typeId: 'c59c75eec2d3cc075cca08d84386bcb9'
      }
    });
    const queryFinanceList = ISelectLoadingComponent({
      reqUrl: 'queryOrganizationList',
      placeholder: '请选择所属金融机构',
      searchKey: extraFormData.financeName || '',
      getCurrentSelectInfo: (value: string, option: any) => {
        getCurrentSelectInfo('finance', option);
      },
      searchForm: {
        systemId: process.env.SYSTEM_ID,
        typeId: 'f247ca73916ac014b40908d86eb6ae8a'
      }
    });
    return (
      <section className={style.formWrapper}>
        <Form {...layout} form={form}>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item label="车架号" name={['vehicle', 'vinNo']} rules={[{ required: true }]}>
                <Input placeholder="请输入车架号" />
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="车牌号" name={['vehicle', 'plateNo']}>
                <Input placeholder="请输入车牌号" />
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="车辆发动机号" name={['vehicle', 'engineNo']}>
                <Input placeholder="请输入发动机号" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="车辆品牌" name={['vehicle', 'brandName']}>
                <Select
                  showSearch
                  allowClear
                  placeholder="请选择车辆品牌"
                  onClear={() => vehicleLayoutChange('brand')}
                  onSelect={(value: any, option: any) => vehicleLayoutChange('brand', option)}
                >
                  {vehicleBrandList.map(brand => (
                    <Select.Option key={brand.key} value={brand.value} code={brand.code}>
                      {brand.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="车辆型号" name={['vehicle', 'factoryName']}>
                <Select
                  showSearch
                  allowClear
                  placeholder="请选择车辆型号"
                  disabled={!vehicleCode.brandCode}
                  onClear={() => vehicleLayoutChange('factory')}
                  onSelect={(value: any, option: any) => vehicleLayoutChange('factory', option)}
                >
                  {vehicleFactoryList.map(factory => (
                    <Select.Option key={factory.key} value={factory.value} code={factory.code}>
                      {factory.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="车辆系列" name={['vehicle', 'versionName']}>
                <Select
                  showSearch
                  allowClear
                  placeholder="请选择车辆系列"
                  disabled={!vehicleCode.factoryCode}
                  onClear={() => vehicleLayoutChange('version')}
                  onSelect={(value: any, option: any) => vehicleLayoutChange('version', option)}
                >
                  {vehicleVersionList.map(version => (
                    <Select.Option key={version.key} value={version.value} code={version.code}>
                      {version.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="车辆配置" name={['vehicle', 'configName']}>
                <Select
                  showSearch
                  allowClear
                  placeholder="请选择车辆配置"
                  disabled={!vehicleCode.versionCode}
                  onClear={() => vehicleLayoutChange('config')}
                  onSelect={(value: any, option: any) => vehicleLayoutChange('config', option)}
                >
                  {vehicleConfigList.map(config => (
                    <Select.Option key={config.key} value={config.value} code={config.key}>
                      {config.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="车辆颜色" name={['vehicle', 'color']}>
                <Input placeholder="请输入车辆颜色" />
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item label="购买日期" name={['vehicle', 'buyTime']}>
                <DatePicker
                  style={{ width: '100%' }}
                  showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择时间"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="金融公司" name={['vehicle', 'financeId']}>
                {queryFinanceList}
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item
                label="经销商"
                name={['vehicle', 'distributorId']}
                rules={[{ required: true, message: '请选择经销商' }]}
              >
                {queryDistributorList}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="车辆图片"
                name={['vehicle', 'imageList']}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <IUploadImgComponent
                  fileList={imageList}
                  getFileList={url => {
                    form.setFieldsValue({ vehicle: { ['imageList']: url } });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item label="服务开始时间" name={['vehicle', 'serverBeginTime']}>
                <DatePicker
                  style={{ width: '100%' }}
                  showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择时间"
                />
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item
                label="服务时长"
                name={['vehicle', 'serverTime']}
                rules={[{ pattern: /^[0-9]*$/, message: '请按正确格式填写' }]}
              >
                <Input suffix="月" placeholder="请填写数字" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </section>
    );
  }
  function renderDeviceForm() {
    return (
      <section className={style.formWrapper}>
        <Form {...layout} form={form}>
          <Row gutter={32}>
            <Col span={12}>
              <Form.List name="codeList">
                {(fields, { add, remove }) => {
                  return (
                    <Form.Item label="添加设备" style={{ alignItems: 'start' }} labelCol={{ span: 4 }}>
                      {fields.map((field, index) => (
                        <Space className={style.space} key={`device-${index}`}>
                          <ISelectLoadingComponent
                            width="240px"
                            reqUrl="queryDeviceList"
                            placeholder="选择设备"
                            searchKey=""
                            searchKeyName="code"
                            searchForm={{ organizationId: form.getFieldValue(['vehicle', 'distributorId']) }}
                            getCurrentSelectInfo={(value: string, option: any) => handleDeviceListChange(value, index)}
                          />
                          <div className={style.fieldAddButton}>
                            <MinusOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </div>
                        </Space>
                      ))}
                      <Button
                        style={{ width: '240px' }}
                        type="dashed"
                        onClick={() => {
                          form.validateFields().then(() => add());
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        点击添加
                      </Button>
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
    return (
      <section className={style.formWrapper}>
        <Form {...layout}>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label="绑定设备" labelCol={{ span: 4 }} style={{ marginBottom: 0, alignItems: 'baseline' }}>
                {bindedDeviceList.length &&
                  bindedDeviceList.map(device => (
                    <div key={device} className={style.deviceItem}>
                      <span>{device}</span>
                      <a onClick={() => unbindDevice(device)}>解绑</a>
                    </div>
                  ))}
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
          loading={confirmLoading}
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
      {renderOwnerForm()}
      {renderSubHeader('车辆信息')}
      {renderVehicleForm()}
      {renderSubHeader('设备信息')}
      {isEdit && (bindedDeviceList.length ? deviceInfo() : null)}
      {renderDeviceForm()}
      {submitButtons()}
      <UnbindDeviceComponent visible={state.isUnbindDevice} close={modalCancel} info={state.unbindInfo} />
    </React.Fragment>
  );
}
