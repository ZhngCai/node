//#region URL参数说明

/**
 * 标准查询参数
 */
interface CFQueryParams {
  /**
   * 离线任务唯一id，默认不会指定，只有离线应用需要指定
   * 预览模式下会无视该参数
   */
  offline_task_id?: string;
  /**
   * 离线问卷id，只有离线模式的时候会传入。
   * 正式答题的时候，url是没有携带问卷id的，而是携带的收集器代码
   * 问卷id都是获取问卷数据以后才能获取到的。
   *
   * 而离线的时候要很早就访问本地离线专属资源，这时候还没有问卷id。
   *
   * 所以依赖url参数上传输一个过来
   *
   * 离线模式下核心包需要
   *
   * 1. 拦截api通过通讯转发给app
   *
   * 2. 有些资源是写死的地址，编程模块中会直接通过ajax去请求这些资源，如多语言文本等，
   *    可以在发起ajax请求的时候去拦截这些url，然后转成本地地址，在发出请求。
   *
   * 3. cfpd中有些资源，如图片，视频，图标等保存的是一个缺少主机名的路径，后续通过配置中的cdn主机名拼接这些路径形成一个完成的url，
   *    这些资源一般不是通过ajax变成方式去请求的，而是浏览器直接发起请求的，所以无法在发出请求的时候去拦截，而是应该事先就把地址纠正掉。
   *    需要篡改主机配置中的cdn主机地址，使得通过cdn主机地址拼接起来的cfpd中提供的url地址直接是指向本地的。
   *
   * 4. cfpd中还有些资源是写死的的地址，如自动提示图标，也是直接有浏览器请求的，需要在解析cfpd的时候去篡改掉这些地址。
   *
   * 5. 还有fake接口，是通过addScript添加到头部的，这个可以在addScript中拦截
   *
   */
  offline_survey_id?: string;
  /**
   * key1的别名
   */
  key?: string;
  /**
   * 系统附加参数1
   */
  key1?: string;
  /**
   * 是否为开发模式,开启这个参数可以在本地调整正式环境的问卷
   * @ignore
   */
  dev?: string;
  /**
   * 授权回调链接中的奖励id
   * @ignore
   */
  rid?: string;
  /**
   * 授权回调链接中的app_id
   * @ignore
   */
  aid?: string;
  /**
   * 授权回调链接中的component_id
   * @ignore
   */
  cid?: string;
  /**
   * 授权回调链接中的问卷id
   * @ignore
   */
  qid?: string;
  /**
   * 授权回调链接中的response id
   * @ignore
   */
  tid?: string;
  /**
   * 奖励页面模板，只有动态组件下的奖励路由会使用到
   */
  rtpl?: string;
  /**
   * 自动运行地址
   * @ignore
   */
  auto_path?: string;
  /**
   * 推导id,普通自动推导的时候一般为数值
   * 当为testcase时，是运行测试案例的特殊模式
   * @ignore
   */
  infer_id?: string;
  /**
   * 指定的推导数据产生的时间段，格式:开始时间毫秒数-结束时间毫秒数
   * 指定后所有数据的产生时间都会在该时间端之内
   * 否则产生时间就是推导出的那一刻
   * @ignore
   */
  infer_time_range?: string;
  /**
   * 指定推导数据的状态，如果有该状态，则推导完提交的数据会是该状态，否则会是test状态
   */
  infer_status?: string;
  /**
   * 指定的推导数据的收集器id,如果有该id，则提交数据中也需要携带该id
   */
  infer_collector_id?: string;
  /**
   * 收集器代码，这个参数是必须的，如果是预览的时候则同问卷id一样
   * 正式答题的时候则是一个收集器代码
   */
  sid: string;
  /**
   * @ignore
   */
  url?: string;
  /**
   * 授权回调链接中的授权code
   * @ignore
   */
  code?: string;
  /**
   * 授权回调链接中的授权状态
   * @ignore
   */
  state?: string;
  /**
   * 启动的程序模式
   * @ignore
   *
   */
  type?: APP_RUN_TYPE;
  /**
   * jwt
   * @ignore
   */
  jwt?: string;
  /**
   * 明确指定禁用预览工具条
   * 指定后即使是在预览模式下也不会显示预览标记横幅
   * @ignore
   */
  ban_preview_bar?: string;
  /**
   * 调试伪造接口时本地服务端口，当有该参数时，会尝试调用本地服务该端口上的真实接口
   * 方便调试伪造接口
   */
  fake_port?: string;
  /**
   * 调试真实接口时本地服务端口，当有该参数时，会尝试调用本地服务该端口上的真实接口
   * 方便调试真实接口
   */
  real_port?: string;
}

/**
 * 标准参数名称列举
 */
type CFParamNames = keyof CFQueryParams;

//#endregion
