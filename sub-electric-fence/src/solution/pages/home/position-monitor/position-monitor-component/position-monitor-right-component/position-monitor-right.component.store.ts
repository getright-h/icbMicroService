import { IPositionMonitorRightState } from './position-monitor-right.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import * as _ from 'lodash';
import { useEffect, useRef } from 'react';
declare const AMap: any;
const geocoder =
  AMap &&
  new AMap.Geocoder({
    // city: '全国', //城市设为北京，默认：“全国”
    // radius: 1000 //范围，默认：500
  });
const mapContainer = {
  resizeEnable: true,
  center: [116.395577, 39.892257],
  zoom: 12
};

const autoOptions = {
  city: '全国'
};
const autoComplete = new AMap.Autocomplete(autoOptions);
export function usePositionMonitorRightStore() {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorRightState());
  const map = useRef();
  const mouseTool = useRef();
  useEffect(() => {
    initMap();
  }, []);

  function initMap() {
    map.current = new AMap.Map('container', mapContainer);
    initRule();
    onRightClick(map.current);
    // gpsDetail(this.item);
  }

  function onRightClick(map: any) {
    map.on('rightclick', (e: any) => {
      console.log('您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置双击了地图！');
    });
  }

  function initRule() {
    mouseTool.current = new AMap.MouseTool(map.current);
  }

  const handleChangeCircleFunction = _.debounce(handleChangeCircle, 300);
  function handleCircleLocation(value: any, options: any) {
    const lnglat = JSON.parse(options.value);

    // onValueChange('circleLocation', [lnglat.lng, lnglat.lat]);
  }

  function handleChangeCircle(value: string) {
    setStateWrap({
      locationList: []
    });

    autoComplete.search(value, function(status: string, result: any) {
      // 搜索成功时，result即是对应的匹配数据
      setStateWrap({
        locationList: result.tips
      });
      console.log(result.tips);
    });
  }

  function startRule() {}

  return { state, handleChangeCircleFunction, handleCircleLocation, startRule };
}
