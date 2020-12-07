import {
  DirectiveManage,
  SearchParams,
  ITypesReturn,
  ICmdSendParam,
  DirectiveListReturn
} from '../dto/directive-manage.service.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

const GET_CMD_LIST = 'gps/cmd/list';
const DEL_CMD = 'gps/cmd/delete';
const CMD_TYPES = 'gps/cmd/types';
const CMD_SEND = 'gps/cmd/send';
@DepUtil.Injectable()
export class DirectiveService implements DirectiveManage {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  getCmdList(params: SearchParams): Observable<{ data: DirectiveListReturn[]; total: number }> {
    return this.requestService.post(GET_CMD_LIST, params);
  }
  deleteCmd(params: { id: string }): Observable<boolean> {
    return this.requestService.post(DEL_CMD, params);
  }
  getTypesList(params: { id: string }): Observable<{ data: ITypesReturn[]; total: number }> {
    return this.requestService.post(CMD_TYPES, params);
  }
  sendCmd(params: ICmdSendParam): Observable<boolean> {
    return this.requestService.post(CMD_SEND, params);
  }
}
