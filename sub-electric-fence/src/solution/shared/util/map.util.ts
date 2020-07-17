//添加缩放和图层切换控件
declare const AMapUI: any;
declare const AMap: any;
export const IMAP = {
  // 添加基础控件
  addBaseController(map: any) {
    AMapUI.loadUI(['control/BasicControl'], function(BasicControl: any) {
      //缩放控件，显示Zoom值
      map.addControl(
        new BasicControl.Zoom({
          position: 'lb'
        })
      );

      //图层切换控件
      map.addControl(
        new BasicControl.LayerSwitcher({
          position: 'rt'
        })
      );
    });
  },
  // 初始化map
  createMap(id: string) {
    return new AMap.Map(id, {
      resizeEnable: true,
      zoom: 16
    });
  },
  // 创建圆形
  createCircle(circleLocation: Array<number>, circlrR: number, map: any) {
    const circle = new AMap.Circle({
      center: circleLocation,
      radius: circlrR, //半径
      borderWeight: 3,
      strokeColor: '#FF33FF',
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillOpacity: 0.4,
      strokeStyle: 'dashed',
      strokeDasharray: [10, 10],
      // 线样式还支持 'dashed'
      fillColor: '#1791fc',
      zIndex: 50
    });
    circle.setMap(map);
    map.setFitView([circle]);
    const circleEditor = new AMap.CircleEditor(map, circle);
    circleEditor.open();
    return circleEditor;
  },
  // 创建多边形
  createPolygon(circleLocation: Array<number>, map: any, path?: Array<[number, number]> | any, isOpen = true) {
    if (!path) {
      const x = circleLocation[0];
      const y = circleLocation[1];

      path = [
        [x - 0.0508, y - 0.045],
        [x - 0.0508, y + 0.045],
        [x + 0.0508, y + 0.045],
        [x + 0.0508, y - 0.045]
      ];
    }
    const polygon = new AMap.Polygon({
      strokeWeight: 1,
      path: path,
      fillOpacity: 0.4,
      fillColor: '#80d8ff',
      strokeColor: '#0091ea'
    });
    map.add(polygon);
    map.setFitView([polygon]);
    let polyEditor;
    if (isOpen) {
      polyEditor = new AMap.PolyEditor(map, polygon);
      polyEditor.open();
    }

    return { polyEditor, path };
  },
  // 获取当前定位并执行callback回传地址信息
  getCurrentLocation(map: any, callback: (lgnlat: [number, number]) => void) {
    AMap.plugin('AMap.Geolocation', function() {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：5s
        buttonPosition: 'RB', //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
      });

      map.addControl(geolocation);
      geolocation.getCurrentPosition(function(status: string, result: any) {
        if (status == 'complete') {
          callback([result.position.lng, result.position.lat]);
        }
      });
    });
  },
  // 测距
  Rule: {
    init(map: any) {
      return new AMap.MouseTool(map);
    },
    goToDrawRule(mouseTool: any) {
      mouseTool.rule({
        startMarkerOptions: {
          //可缺省
          icon: new AMap.Icon({
            size: new AMap.Size(19, 31), //图标大小
            imageSize: new AMap.Size(19, 31),
            image: 'https://webapi.amap.com/theme/v1.3/markers/b/start.png'
          })
        },
        endMarkerOptions: {
          //可缺省
          icon: new AMap.Icon({
            size: new AMap.Size(19, 31), //图标大小
            imageSize: new AMap.Size(19, 31),
            image: 'https://webapi.amap.com/theme/v1.3/markers/b/end.png'
          }),
          offset: new AMap.Pixel(-9, -31)
        },
        midMarkerOptions: {
          //可缺省
          icon: new AMap.Icon({
            size: new AMap.Size(19, 31), //图标大小
            imageSize: new AMap.Size(19, 31),
            image: 'https://webapi.amap.com/theme/v1.3/markers/b/mid.png'
          }),
          offset: new AMap.Pixel(-9, -31)
        },
        lineOptions: {
          //可缺省
          strokeStyle: 'solid',
          strokeColor: '#FF33FF',
          strokeOpacity: 1,
          strokeWeight: 2
        }
      });
    }
  },
  // 添加车辆marker 在地图上
  //callback 异步查询车辆信息
  bindMarkerClick(markers: any, map: any, callback: (markerInfo: any, map: any, marker: any, infoWindow: any) => {}) {
    // map.clearMap();
    AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow: any) => {
      markers.forEach(function(marker: any) {
        if (!marker.position) {
          return;
        }
        const markerInfo = new AMap.Marker({
          map,
          icon: marker.icon,
          zIndex: 9999999,
          position: [marker.position[0], marker.position[1]],
          offset: new AMap.Pixel(-13, -30)
        });
        const infoWindow = new SimpleInfoWindow({
          infoTitle: '<strong>车辆状态</strong>',
          infoBody: `<div class="vehicle-basic-info">
          <span class="title">基本信息</span>
          <div class="basic">
              <span class="item">车牌：<%- licenceNumber %></span>
              <span class="item">车架号：<%- identificationNumber %></span>
              <span class="item">经销商名：<%- unitName %></span>
          </div>
          </div>
          <div class="vehicle-divide-line"></div>
          <div class="vehicle-state-info">
              <span class="title">状态</span>
              <div class="basic">
                  <span class="item">经纬度：<%- lalg %></span>
                  <span class="item">状态：<%- status %></span>
                  <span class="item">地址：<%- place %></span>
              </div>
          </div>
          <div>
          <button id="mybtn" class="button_ pop_ pop_def" data-isopen="1">查看轨迹</button>
          </div>`,
          infoTplData: {
            identificationNumber: '',
            licenceNumber: '',
            unitName: '',
            status: '',
            lalg: '',
            place: ''
          },

          //基点指向marker的头部位置
          offset: new AMap.Pixel(0, -31)
        });
        AMap.event.addListener(markerInfo, 'click', function() {
          callback(markerInfo, map, marker, infoWindow);
        });
      });
      map.setFitView();
    });
  }
};
