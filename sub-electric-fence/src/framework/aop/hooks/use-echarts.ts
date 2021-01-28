import * as echarts from 'echarts';
import { useEffect } from 'react';

function useECharts(
  chartRef: { current: HTMLDivElement | HTMLCanvasElement },
  config: echarts.EChartOption<echarts.EChartOption.Series> | echarts.EChartsResponsiveOption
) {
  let chartInstance: echarts.ECharts = null;

  function renderChart() {
    const renderedInstance = echarts.getInstanceByDom(chartRef.current);
    if (renderedInstance) {
      chartInstance = renderedInstance;
    } else {
      chartInstance = echarts.init(chartRef.current);
    }
    chartInstance.setOption(config);
  }

  useEffect(() => {
    chartRef.current && renderChart();
  }, [config]);

  useEffect(() => {
    return () => {
      chartInstance && chartInstance.dispose();
    };
  }, []);

  return;
}

export default useECharts;
