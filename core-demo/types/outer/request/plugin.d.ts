/**
 * 发送请求的数据格式
 */
interface CFRequestBodyBase {
  /**
   * 当前语言
   */
  _LANG_?: string;
  /**
   * 当前链接来行
   * realtime_preview: 实时预览
   * preview: 完整预览
   * formal: 正式答题
   */
  _LINK_TYPE_?: string;
  /**
   * 是否未自动推导模式
   */
  _IS_INFER_?: string;
}

/**
 * 发送请求的数据格式
 */
interface CFRequestBodyData extends CFRequestBodyBase {
  /**
   * 其他自定义的参数
   */
  [key: string]: string | undefined;
}

type ICFRequestFn = (
  data: CFRequestBodyData,
  core: CFCore
) => ICFRequestResult | Promise<ICFRequestResult>;

/**
 * 请求验证结果
 * @ignore
 */
interface ICFRequestResult {
  /**
   * 结果
   */
  result?: string | boolean | number;
  /**
   * 错误消息
   */
  message?: string;

  exception?: Error;
}

/**
 * 参数项
 */
interface CFParamItem {
  /**
   * 参数名
   */
  name: string;
  /**
   * 参数值
   */
  value: string;
}

/**
 * 请求信息类型
 * @ignore
 */
interface ICFRequest {
  /**
   * 请求方式
   */
  method: PLUGIN_REQ;
  /**
   * 使用的内置接口的id
   */
  embedId: string;
  /**
   * 接口地址
   */
  url: string;
  /**
   * 参数列表
   */
  params: CFParamItem[];
  /**
   * 头信息列表
   */
  headers: CFParamItem[];
}

/**
 * 内置接口类型
 * @ignore
 */
interface ICFEmbedApi {
  /**
   * 接口id
   */
  id: string;
  /**
   * 接口名称
   */
  name: string;
  /**
   * 接口代码
   */
  code: string;
  /**
   * 接口执行方法
   */
  fn: ICFRequestFn;
}
