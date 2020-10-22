import { IFlowChartState } from './flow-chart.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useFlowChartStore() {
  const { state, setStateWrap } = useStateStore(new IFlowChartState());
  return { state };
}
