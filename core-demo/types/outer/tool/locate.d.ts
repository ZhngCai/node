/**
 * 地域字典类
 */
interface CFRegionDict {
  /**
   * 代号
   */
  Value: number;
  /**
   * 地名
   */
  Meaning: string;
}

/**
 * 省级地域类
 */
interface CFRegionProvince extends CFRegionDict {
  /**
   * 所包含的市级列表
   */
  cities: CFRegionCity[];
  /**
   * 省级代号
   */
  id: number;
}
/**
 * 市级地域类
 */
interface CFRegionCity extends CFRegionDict {
  /**
   * 所包含的县级列表
   */
  counties: CFRegionCounty[];
  /**
   * 市级代号
   */
  id: number;
}

/**
 * 县级地域类
 */
interface CFRegionCounty extends CFRegionDict {
  /**
   * 县级代号
   */
  id: number;
}

/**
 * 地图地址类型
 */
interface CFMapAddress {
  /**
   *  城市 二级行政区(市/地区)
   */
  city: string;
  /**
   *  城市代号
   */
  city_code?: number;
  /**
   *  区(县)
   */
  district: string;
  /**
   *  省 一级行政区(省,直辖市)
   */
  province: string;
  /**
   *  街道
   */
  street?: string;
  /**
   *  门牌号
   */
  street_number?: string;

  /**
   * 国家
   */
  country?: string;
}

/**
 * 地图地点类型
 */
interface CFMapPoint {
  /**
   *  纬度
   */
  lat: number;
  /**
   *  经度
   */
  lng: number;
}

/**
 * 地图定位信息类型
 */
interface CFMapLocation {
  /**
   *  精准度信息
   */
  accuracy?: number | null;
  /**
   *  地址详情
   */
  address: CFMapAddress;
  /**
   *  海拔
   */
  altitude?: number | null;
  /**
   *  海拔精度
   */
  altitudeAccuracy?: number | null;
  /**
   *  面对方向
   */
  heading?: number | null;
  /**
   *  纬度
   */
  latitude?: string;
  /**
   *  经度
   */
  longitude?: string;
  /**
   *  定位点
   */
  point?: CFMapPoint;
  /**
   *  移动速度
   */
  speed?: number | null;
  /**
   *  时间戳
   */
  timestamp?: number | null;

  /**
   * 各级地址在各个位置中的索引
   */
  indexes?: string;
}

/**
 * @ignore
 */
interface IRegionRawData {
  provinces: CFRegionDict[];
}
