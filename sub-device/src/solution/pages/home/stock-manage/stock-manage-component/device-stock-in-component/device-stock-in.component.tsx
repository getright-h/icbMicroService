import * as React from 'react';
import style from './device-stock-in.component.less';
import { useDeviceStockInStore } from './device-stock-in.component.store';
import { IDeviceStockInProps } from './device-stock-in.interface';
import { Modal, Form, Input, Select, Space, Tooltip, Table, Col, Row, Radio, Button, Upload } from 'antd';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { Link } from 'react-router-dom';
import { PlusOutlined, MinusOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';

export default function DeviceStockInComponent(props: IDeviceStockInProps) {
  const {
    state,
    form,
    reduxState,
    selfSubmit,
    selfClose,
    getCurrentSelectInfo,
    callbackAction,
    changeImportType,
    customRequest
  } = useDeviceStockInStore(props);
  const { visible } = props;
  const { currentSelectNode } = reduxState;
  const { confirmLoading, errorList, isExitWrongData, isErrorListVisible, importType, deviceImportList } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  };
  const queryDeviceTypeList = ISelectLoadingComponent({
    width: '240px',
    reqUrl: 'queryDeviceTypeList',
    placeholder: '选择设备型号',
    searchKey: '',
    getCurrentSelectInfo: (value: string, option: any) => getCurrentSelectInfo('type', option)
  });
  const queryStorePositionList = ISelectLoadingComponent({
    width: '240px',
    reqUrl: 'queryStorePositionList',
    placeholder: '选择仓位',
    searchForm: { storeId: currentSelectNode ? currentSelectNode.key : '' },
    searchKey: '',
    getCurrentSelectInfo: (value: string, option: any) => getCurrentSelectInfo('position', option)
  });
  const queryPurchaseSelectList = ISelectLoadingComponent({
    width: '240px',
    reqUrl: 'queryPurchaseSelectList',
    placeholder: '选择采购单',
    searchKey: '',
    getCurrentSelectInfo: (value: string, option: any) => getCurrentSelectInfo('purchase', option)
  });
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form} initialValues={{ deviceList: [{}] }}>
          <Row>
            <Col span={12}>
              <Form.Item name="storePositionId" label="入库仓位" required={true}>
                <Input.Group compact>
                  <Form.Item name="storePositionId" noStyle rules={[{ required: true, message: '请选择入库仓位' }]}>
                    {queryStorePositionList}
                  </Form.Item>
                  <span className={style.aLink}>
                    <Link to="../baseManage/warehouse">添加仓位</Link>
                  </span>
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="typeId" label="设备型号" rules={[{ required: true }]}>
                {queryDeviceTypeList}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="state" label="设备状态" rules={[{ required: true }]}>
                <Select placeholder="请选择设备状态" style={{ width: '240px' }}>
                  <Select.Option value={1}>正常</Select.Option>
                  <Select.Option value={2}>故障</Select.Option>
                  <Select.Option value={3}>损坏</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="purchaseId" label="采购单">
                <Input.Group compact>
                  <Form.Item name="purchaseId" noStyle>
                    {queryPurchaseSelectList}
                  </Form.Item>
                  <span className={style.aLink}>
                    <Tooltip placement="right" arrowPointAtCenter title="关联采购单可帮您追溯采购时间、成本等">
                      <InfoCircleOutlined className={style.primaryIcon} />
                    </Tooltip>
                  </span>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="设备导入方式" required={true}>
                <Radio.Group onChange={changeImportType} value={importType}>
                  <Radio value={1}>手动输入</Radio>
                  <Radio value={2}>导入Excel</Radio>
                </Radio.Group>
                <a>设备上传模板</a>
              </Form.Item>
            </Col>
          </Row>
          {importType == 1 ? (
            <Row>
              <Col span={24}>
                <Form.List name="deviceList">
                  {(fields, { add, remove }) => {
                    return (
                      <Form.Item
                        label="设备号/SIM卡号"
                        required={true}
                        style={{ alignItems: 'start' }}
                        labelCol={{ span: 3 }}
                      >
                        <div className={style.deviceList}>
                          {fields.map((field, index) => (
                            <Space key={field.key} className={style.space} align="start">
                              <Form.Item
                                {...field}
                                name={[field.name, 'code']}
                                style={{ maxWidth: '200px' }}
                                className={style.fieldItem}
                                rules={[{ required: true, message: '请填写设备号' }]}
                              >
                                <Input placeholder="请填写设备号" />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                name={[field.name, 'sim']}
                                style={{ maxWidth: '200px' }}
                                className={style.fieldItem}
                                rules={[{ required: true, message: '请填写sim卡号' }]}
                              >
                                <Input placeholder="请填写sim卡号" />
                              </Form.Item>
                              <div className={style.fieldAddButton}>
                                <PlusOutlined
                                  onClick={() => {
                                    add();
                                  }}
                                />
                                <MinusOutlined
                                  onClick={() => {
                                    remove(field.name);
                                    index == 0 && add();
                                  }}
                                />
                              </div>
                            </Space>
                          ))}
                        </div>
                      </Form.Item>
                    );
                  }}
                </Form.List>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col span={12}>
                <Form.Item label="选择文件" style={{ position: 'relative' }} required={true}>
                  <Upload
                    showUploadList={false}
                    action={`${process.env.MAIN}allot/manage/uploadAllotDeviceExcel`}
                    customRequest={customRequest}
                  >
                    <Button>
                      <UploadOutlined /> 点击上传文件
                    </Button>
                  </Upload>
                  <Tooltip className={style.aLink} placement="right" arrowPointAtCenter title="仅导入最新上传的文件">
                    <InfoCircleOutlined className={style.primaryIcon} />
                  </Tooltip>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="http://file.test.i-cbao.com:88/uploads/pictures/2021/0205/a4fa2f5b7efa23c1.xlsx"
                  >
                    下载模板
                  </a>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="导入设备"
                  name="deviceImportList"
                  required={true}
                  style={{ alignItems: 'start' }}
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 19 }}
                  rules={[
                    {
                      validator: (_, value) =>
                        !!deviceImportList.length ? Promise.resolve() : Promise.reject('请导入设备')
                    }
                  ]}
                >
                  <DeviceTable />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </React.Fragment>
    );
  }

  function DeviceTable() {
    const errorText = (text: any, record: any) => <span style={{ color: record.remark && 'red' }}>{text}</span>;
    const columns = [
      {
        title: 'Excel行号',
        dataIndex: 'rowNumber',
        render: errorText
      },
      {
        title: '设备号',
        dataIndex: 'code',
        render: errorText
      },
      {
        title: 'sim卡号',
        dataIndex: 'sim',
        render: errorText
      }
    ];
    isExitWrongData &&
      columns.push({
        title: '错误信息',
        dataIndex: 'remark',
        render: errorText
      });
    return (
      <Table
        size="small"
        dataSource={deviceImportList}
        columns={columns}
        rowKey={row => row.code}
        pagination={{ pageSize: 5, showQuickJumper: true }}
      ></Table>
    );
  }

  function ErrorList() {
    const columns = [
      {
        title: '设备号',
        dataIndex: 'code'
      },
      {
        title: 'sim卡号',
        dataIndex: 'sim'
      },
      {
        title: '失败原因',
        dataIndex: 'message'
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (render: any, data: any) => {
          return (
            <React.Fragment>
              {data.isRenew ? (
                <a
                  onClick={() => {
                    callbackAction(data);
                  }}
                >
                  恢复
                </a>
              ) : data.isRenewed ? (
                '已恢复'
              ) : (
                '-'
              )}
            </React.Fragment>
          );
        }
      }
    ];
    return (
      <Modal
        width={600}
        title="失败设备一览表"
        visible={isErrorListVisible}
        footer={null}
        onCancel={() => selfClose(true)}
        maskClosable={false}
      >
        <Table dataSource={errorList} columns={columns} rowKey={row => row.code}></Table>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      <Modal
        title={
          <div className={style.modalTitle}>
            设备入库<span>当前仓库：{currentSelectNode?.name}</span>
          </div>
        }
        visible={visible}
        width={1000}
        centered={true}
        onCancel={() => selfClose(false)}
        onOk={() => {
          form
            .validateFields()
            .then(values => selfSubmit(values))
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
        maskClosable={false}
        destroyOnClose={true}
        confirmLoading={confirmLoading}
      >
        {renderForm()}
      </Modal>
      <ErrorList />
    </React.Fragment>
  );
}
