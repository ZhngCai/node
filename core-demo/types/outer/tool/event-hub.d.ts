//#region 自定义事件相关说明
/**
 * 自定义事件参数
 */
interface CFEventParam {
  /**
   * 事件类型
   */
  type: EVENT_NAME | INFER_EVENT_NAME;
  /**
   * 关联数据
   */
  data?: any;
  /**
   * 错误消息
   */
  message?: string;
}

/**
 * 监听自定义时间的回调函数规格
 */
type CFEventHubCb =
  /**
   * @params e 事件参数
   * @params data 附加数据
   */
  (e: CFEventParam, data?: any) => void;

/**
 * 自定义时间处理器
 */
interface CFEventHub {
  /**
   * 监听某个事件
   * @param name 事件名
   * @param cb 回调函数
   */
  on(name: EVENT_NAME, cb: CFEventHubCb): void;
  /**
   * 解除对事件的监听
   * @param name 事件名，如果不提供，则解除所有事件监听，否则直接该事件名相关的监听。
   * @param cb 回调函数，如果不提供则解除指定事件名称的所有监听，提供了则只解除指定事件名的指定回调函数的监听
   */
  off(name?: EVENT_NAME, cb?: CFEventHubCb): void;
  /**
   * 对某个事件监听一次
   * @param name 事件名
   * @param cb 回调函数
   */
  one(name: EVENT_NAME, cb: CFEventHubCb): void;
  /**
   * 触发某个事件
   * @param name 事件名
   * @param data 额外携带的参数
   */
  trigger(name: EVENT_NAME, data?: any): void;
}

//#endregion
