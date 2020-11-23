import { IFlowChartState, FlowChartComponentProps } from './flow-chart.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { FlowList } from '~/solution/model/dto/allocation-template.dto';

export function useFlowChartStore(props: FlowChartComponentProps) {
  const { state, setStateWrap } = useStateStore(new IFlowChartState());
  return { state };
}
