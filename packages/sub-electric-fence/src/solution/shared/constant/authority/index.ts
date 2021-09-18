import { IAuthorityCode } from './authorityDot';
export const DEVICE_AUTHORITY_CODE: IAuthorityCode = {
  '/home/fence/positionMonitor': {
    queryAllOrganization: 'queryAllOrganization',
    realTimeTracking: 'realTimeTracking',
    IssueInstructions: 'IssueInstructions',
    historyTrajectory: 'historyTrajectory',
    unprocessedAlarmInfo: 'unprocessedAlarmInfo',
    areaInspectionVehicle: 'areaInspectionVehicle'
  },
  '/home/fence/fence/mainfence': {
    addFence: 'addFence',
    editFence: 'editFence',
    queryAllFence: 'queryAllFence',
    deleteFence: 'deleteFence'
  },
  '/home/fence/fence/monitoringObject': {
    fenceBindVehicle: 'fenceBindVehicle',
    editBindVehicle: 'editBindVehicle',
    fenceUnbindVehicle: 'fenceUnbindVehicle',
    editBindVehicleTime: 'editBindVehicleTime'
  },
  '/home/fence/directive/directiveList': {
    addInstruct: 'addInstruct',
    deleteInstruct: 'deleteInstruct',
    queryInstructAll: 'queryInstructAll'
  },
  '/home/fence/parameter': {
    queryDeviceAlarmType: 'queryDeviceAlarmType',
    queryPlatformAlarmTyp: 'queryPlatformAlarmTyp',
    parmOperationCustom: 'parmOperationCustom',
    addParamTemplate: 'addParamTemplate',
    editParamTemplate: 'editParamTemplate',
    deleteParamTemplate: 'deleteParamTemplate',
    queryParamTemplateList: 'queryParamTemplateList'
  },
  '/home/fence/report/userActionReport': {},
  '/home/fence/report/statistical': {},
  '/home/fence/report/permanent': {},
  '/home/fence/report/record': {},
  '/home/fence/report/monitor': {},
  '/home/fence/report/follow': {}
};
