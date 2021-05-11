import { IInputExportFilenameState } from './input-export-filename.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';

export function useInputExportFilenameStore() {
  const { state, setStateWrap } = useStateStore(new IInputExportFilenameState());
  const [form] = Form.useForm();

  return { state, form };
}
