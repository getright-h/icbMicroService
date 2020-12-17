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
  // 绘制路径
  drawLine(map: any, lineArr: any[]) {
    return new AMap.Polyline({
      map: map,
      path: lineArr,
      showDir: true,
      strokeColor: '#28F', //线颜色
      // strokeOpacity: 1,     //线透明度
      strokeWeight: 6 //线宽
      // strokeStyle: "solid"  //线样式
    });
  },
  showCarInfo(
    markerInfo: any,
    map: any,
    marker: any,
    callback?: (markerInfo: any, map: any, marker: any, infoWindow: any) => void
  ) {
    AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow: any) => {
      const infoWindow = new SimpleInfoWindow({
        infoTitle: '<strong>车辆状态</strong>',
        infoBody: `<div class="vehicle-basic-info">
        <span class="title">基本信息</span>
        <div class="basic">
        <div class="item">车主姓名：<%- ownerName %></div>
         <div class="item">车牌号：<%- plateNo %></div>
         <div class="item">车架号：<%- vinNo %></div>
         <div class="item">设备号：<%- deviceCode %></div>
     </div>
     </div>
     <div class="vehicle-divide-line"></div>
     <div class="vehicle-state-info">
         <span class="title">状态</span>
         <div class="basic">
             <div class="item">设备状态：<%- deviceState %></div>
             <div class="item">经纬度：<%- lalg %></div>
             <div class="item">地址：<%- place %></div>
             <div class="item">定位时间：<%- positionTime %></div>
         </div>
     </div>`,

        infoTplData: {
          ownerName: '',
          plateNo: '',
          vinNo: '',
          deviceCode: '',
          deviceState: '',
          typeName: '',
          positionTime: '',
          lalg: '',
          place: ''
        },

        //基点指向marker的头部位置
        offset: new AMap.Pixel(0, -31)
      });
      callback(markerInfo, map, marker, infoWindow);
    });
  },
  drawRectangle: {
    init(map: any) {
      return new AMap.MouseTool(map);
    },
    gotoDrawRectangle(mouseTool: any) {
      mouseTool.rectangle({
        fillColor: '#00b0ff',
        strokeColor: '#80d8ff'
        //同Polygon的Option设置
      });
    },
    listenDraw(mouseTool: any, callback: (info: any) => void) {
      mouseTool.on('draw', function(e: any) {
        callback(e.obj.Ce.path);
      });
    }
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
  bindMarkerClick(
    markers: any,
    map: any,
    callback?: (markerInfo: any, map: any, marker: any, infoWindow: any) => void,
    locationCarMarkerListFlag: any[] = []
  ) {
    const markerInfoData: any[] = [];
    locationCarMarkerListFlag?.forEach(oldMarker => {
      let needClear = true;
      markers?.forEach((marker: any) => {
        // 如果在原来上面没有的点就添加
        if (
          marker.markerInfo.id == oldMarker.id &&
          JSON.stringify(marker.position) == JSON.stringify(oldMarker.position)
        ) {
          // 表示这个点原来就在上面不需要处理
          needClear = false;
        }
      });

      if (needClear) {
        map.remove(oldMarker.marker);
      } else {
        markerInfoData.push(oldMarker);
      }
    });
    AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow: any) => {
      markers?.forEach((marker: any) => {
        let needAdd = true;
        locationCarMarkerListFlag?.forEach((oldMarker: any) => {
          // 如果在原来上面没有的点就添加
          if (
            marker.markerInfo.id == oldMarker.id &&
            JSON.stringify(marker.position) == JSON.stringify(oldMarker.position)
          ) {
            // 表示这个点原来就在上面不需要处理
            needAdd = false;
          }
        });

        if (needAdd) {
          if (!marker.position) {
            return;
          }

          const markerInfo = new AMap.Marker({
            map,
            icon: new AMap.Icon({
              // 图标尺寸
              size: new AMap.Size(46, 28),
              // 图标的取图地址
              image: marker.icon,
              // 图标所用图片大小
              imageSize: new AMap.Size(46, 28)
            }),
            label: {
              content: `<div>${marker.markerInfo.plateNo}</div>`,
              offset: new AMap.Pixel(-20, 26)
            },
            zIndex: 9999999,
            position: marker.position,
            offset: new AMap.Pixel(-13, -30),
            id: marker.markerInfo.id
          });

          markerInfoData.push({
            position: marker.position,
            id: marker.markerInfo.id,
            marker: markerInfo
          });

          const infoWindow = new SimpleInfoWindow({
            infoTitle: '<strong>车辆状态</strong>',
            infoBody: `<div class="vehicle-basic-info">
            <span class="title">基本信息</span>
            <div class="basic">
            <div class="item">车主姓名：<%- ownerName %></div>
             <div class="item">车牌号：<%- plateNo %></div>
             <div class="item">车架号：<%- vinNo %></div>
             <div class="item">设备号：<%- deviceCode %></div>
         </div>
         </div>
         <div class="vehicle-divide-line"></div>
         <div class="vehicle-state-info">
             <span class="title">状态</span>
             <div class="basic">
                 <div class="item">车辆状态：<%- vehicleState %></div>
                 <div class="item">设备状态：<%- deviceState %></div>
                 <div class="item">经纬度：<%- lalg %></div>
                 <div class="item">地址：<%- place %></div>
                 <div class="item">定位时间：<%- positionTime %></div>
             </div>
         </div>
            <div>
            <button id="mybtnSearch" class="button_ pop_ pop_def" data-isopen="1">追踪</button>
            <button id="mybtnWatchLine" class="button_ pop_ pop_def" data-isopen="1">查看轨迹</button>
            <button id="mybtnDo" class="button_ pop_ pop_def" data-isopen="1">指令</button>
            </div>`,

            infoTplData: {
              ownerName: '',
              plateNo: '',
              vinNo: '',
              deviceCode: '',
              deviceState: '',
              typeName: '',
              vehicleState: '',
              positionTime: '',
              lalg: '',
              place: ''
            },

            //基点指向marker的头部位置
            offset: new AMap.Pixel(0, -31)
          });
          AMap.event.addListener(markerInfo, 'click', function() {
            callback(markerInfo, map, marker, infoWindow);
          });
        }
      });
      map.setFitView();
    });
    return markerInfoData;
  },

  bindOffernStopPlace(
    markers: any,
    map: any,
    callback?: (markerInfo: any, map: any, marker: any, infoWindow: any) => void
  ) {
    AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow: any) => {
      markers?.forEach((marker: any) => {
        const markerInfo = new AMap.Marker({
          map,
          icon: new AMap.Icon({
            // 图标尺寸
            size: new AMap.Size(46, 28),
            // 图标的取图地址
            image: marker.icon,
            // 图标所用图片大小
            imageSize: new AMap.Size(46, 28)
          }),
          label: {
            content: '<div>川A888888</div>',
            offset: new AMap.Pixel(-20, 26)
          },
          zIndex: 9999999,
          position: marker.position,
          offset: new AMap.Pixel(-13, -30),
          id: marker.id
        });

        const infoWindow = new SimpleInfoWindow({
          infoTitle: '<strong>车辆常驻点</strong>',
          infoBody: `<div class="vehicle-basic-info">
              <span class="title">基本信息</span>
              <div class="basic">
                  <span class="item">经纬度：<%- coordinates %></span>
                  <span class="item">到访次数：<%- number %></span>
                  <span class="item">平均停留时间：<%- stopTime %></span>
              </div>
              </div>
              <div class="vehicle-divide-line"></div>
              <div>
              <button id="mybtnSearch" class="button_ pop_ pop_def" data-isopen="1">追踪</button>
              <button id="mybtnWatchLine" class="button_ pop_ pop_def" data-isopen="1">查看轨迹</button>
              <button id="mybtnDo" class="button_ pop_ pop_def" data-isopen="1">指令</button>
              <button id="mybtnAttention" class="button_ pop_ pop_def" data-isopen="1">报警</button>
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
  },

  bindMassMarkers(
    markers: any,
    map: any,
    callback?: (markerInfo: any, map: any, marker: any, infoWindow: any) => void
  ) {
    const style = [
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(11, 11)
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
        anchor: new AMap.Pixel(4, 4),
        size: new AMap.Size(7, 7),
        icon: require('~assets/image/online.png')
      }
    ];
    const mass = new AMap.MassMarks(markers, {
      zIndex: 99999,
      cursor: 'pointer',
      style: style
    });
    mass.on('click', function(e: any) {
      console.log(e);
    });
    mass.setMap(map);

    mass.getMap().setFitView();
  },
  GPS: {
    PI: 3.14159265358979324,
    x_pi: (3.14159265358979324 * 3000.0) / 180.0,
    delta: function(lat, lon) {
      // Krasovsky 1940
      //
      // a = 6378245.0, 1/f = 298.3
      // b = a * (1 - f)
      // ee = (a^2 - b^2) / a^2;
      const a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
      const ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
      let dLat = this.transformLat(lon - 105.0, lat - 35.0);
      let dLon = this.transformLon(lon - 105.0, lat - 35.0);
      const radLat = (lat / 180.0) * this.PI;
      let magic = Math.sin(radLat);
      magic = 1 - ee * magic * magic;
      const sqrtMagic = Math.sqrt(magic);
      dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * this.PI);
      dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * this.PI);
      return { lat: dLat, lon: dLon };
    },

    //WGS-84 to GCJ-02
    gcj_encrypt: function(wgsLat, wgsLon) {
      if (this.outOfChina(wgsLat, wgsLon)) return { lat: wgsLat, lon: wgsLon };

      const d = this.delta(wgsLat, wgsLon);
      return { lat: wgsLat + d.lat, lon: wgsLon + d.lon };
    },
    //GCJ-02 to WGS-84
    gcj_decrypt: function(gcjLat, gcjLon) {
      if (this.outOfChina(gcjLat, gcjLon)) return { lat: gcjLat, lon: gcjLon };
      const d = this.delta(gcjLat, gcjLon);
      return { lat: gcjLat - d.lat, lon: gcjLon - d.lon };
    },
    //GCJ-02 to WGS-84 exactly
    gcj_decrypt_exact: function(gcjLat, gcjLon) {
      const initDelta = 0.01;
      const threshold = 0.000000001;
      let dLat = initDelta,
        dLon = initDelta;
      let mLat = gcjLat - dLat,
        mLon = gcjLon - dLon;
      let pLat = gcjLat + dLat,
        pLon = gcjLon + dLon;
      let wgsLat,
        wgsLon,
        i = 0;
      while (1) {
        wgsLat = (mLat + pLat) / 2;
        wgsLon = (mLon + pLon) / 2;
        const tmp = this.gcj_encrypt(wgsLat, wgsLon);
        dLat = tmp.lat - gcjLat;
        dLon = tmp.lon - gcjLon;
        if (Math.abs(dLat) < threshold && Math.abs(dLon) < threshold) break;

        if (dLat > 0) pLat = wgsLat;
        else mLat = wgsLat;
        if (dLon > 0) pLon = wgsLon;
        else mLon = wgsLon;

        if (++i > 10000) break;
      }
      return { lat: wgsLat, lon: wgsLon };
    },
    //GCJ-02 to BD-09
    bd_encrypt: function(gcjLat, gcjLon) {
      const x = gcjLon,
        y = gcjLat;
      const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
      const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
      const bdLon = z * Math.cos(theta) + 0.0065;
      const bdLat = z * Math.sin(theta) + 0.006;
      return { lat: bdLat, lon: bdLon };
    },
    //BD-09 to GCJ-02
    bd_decrypt: function(bdLat, bdLon) {
      const x = bdLon - 0.0065,
        y = bdLat - 0.006;
      const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
      const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
      const gcjLon = z * Math.cos(theta);
      const gcjLat = z * Math.sin(theta);
      return { lat: gcjLat, lon: gcjLon };
    },
    //WGS-84 to Web mercator
    //mercatorLat -> y mercatorLon -> x
    mercator_encrypt: function(wgsLat, wgsLon) {
      const x = (wgsLon * 20037508.34) / 180;
      let y = Math.log(Math.tan(((90 + wgsLat) * this.PI) / 360)) / (this.PI / 180);
      y = (y * 20037508.34) / 180;
      return { lat: y, lon: x };
      /*
      if ((Math.abs(wgsLon) > 180 || Math.abs(wgsLat) > 90))
          return null;
      var x = 6378137.0 * wgsLon * 0.017453292519943295;
      var a = wgsLat * 0.017453292519943295;
      var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
      return {'lat' : y, 'lon' : x};
      //*/
    },
    // Web mercator to WGS-84
    // mercatorLat -> y mercatorLon -> x
    mercator_decrypt: function(mercatorLat, mercatorLon) {
      const x = (mercatorLon / 20037508.34) * 180;
      let y = (mercatorLat / 20037508.34) * 180;
      y = (180 / this.PI) * (2 * Math.atan(Math.exp((y * this.PI) / 180)) - this.PI / 2);
      return { lat: y, lon: x };
      /*
      if (Math.abs(mercatorLon) < 180 && Math.abs(mercatorLat) < 90)
          return null;
      if ((Math.abs(mercatorLon) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892))
          return null;
      var a = mercatorLon / 6378137.0 * 57.295779513082323;
      var x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0);
      var y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323;
      return {'lat' : y, 'lon' : x};
      //*/
    },
    // two point's distance
    distance: function(latA, lonA, latB, lonB) {
      const earthR = 6371000;
      const x =
        Math.cos((latA * this.PI) / 180) * Math.cos((latB * this.PI) / 180) * Math.cos(((lonA - lonB) * this.PI) / 180);
      const y = Math.sin((latA * this.PI) / 180) * Math.sin((latB * this.PI) / 180);
      let s = x + y;
      if (s > 1) s = 1;
      if (s < -1) s = -1;
      const alpha = Math.acos(s);
      const distance = alpha * earthR;
      return distance;
    },
    outOfChina: function(lat, lon) {
      if (lon < 72.004 || lon > 137.8347) return true;
      if (lat < 0.8293 || lat > 55.8271) return true;
      return false;
    },
    transformLat: function(x, y) {
      let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
      ret += ((20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0) / 3.0;
      ret += ((20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin((y / 3.0) * this.PI)) * 2.0) / 3.0;
      ret += ((160.0 * Math.sin((y / 12.0) * this.PI) + 320 * Math.sin((y * this.PI) / 30.0)) * 2.0) / 3.0;
      return ret;
    },
    transformLon: function(x, y) {
      let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
      ret += ((20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0) / 3.0;
      ret += ((20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin((x / 3.0) * this.PI)) * 2.0) / 3.0;
      ret += ((150.0 * Math.sin((x / 12.0) * this.PI) + 300.0 * Math.sin((x / 30.0) * this.PI)) * 2.0) / 3.0;
      return ret;
    }
  },
  initLonlat: function(lon, lat, len?) {
    // const result = {
    //   lon: '0,0',
    //   lat: '0,0',
    //   lonAndLat: '0,0'
    // };
    if (!lon || !lat) return result;
    len = len || 6;
    const reg = /(\d+).(\d+)/;
    const points = this.GPS.gcj_encrypt(lat, lon);
    if (!points) return result;
    let _lon = points['lon'] + '',
      _lat = points['lat'] + '';
    const lonGroup = _lon.match(reg);
    if (lonGroup && lonGroup.length > 2) {
      const lonDecimal = lonGroup[2];
      if (lonDecimal && lonDecimal.length > len) _lon = lonGroup[1] + '.' + lonDecimal.substring(0, len);
    }
    const latGroup = _lat.match(reg);
    if (latGroup && latGroup.length > 2) {
      const latDecimal = latGroup[2];
      if (latDecimal && latDecimal.length > len) {
        _lat = latGroup[1] + '.' + latDecimal.substring(0, len);
      }
    }
    // result.lon = _lon;
    // result.lat = _lat;
    // result.lonAndLat = _lon + ',' + _lat;
    return [_lon, _lat];
  }
};
