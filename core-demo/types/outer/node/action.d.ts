/**
 * 发送邮件的动作
 * @ignore
 */
interface IEmailActionJson {
  /**
   * 邮箱地址
   */
  address: string;
  /**
   * 邮件标题
   */
  title: string;
  /**
   * 邮件内容
   */
  content: string;
}

/**
 * 发送短信的动作
 * @ignore
 */
interface ISmsActionJson {
  /**
   * 短信服务商api地址
   */
  url: string;
  /**
   * 附加替换参数
   */
  params: CFParamItem[];
}

/**
 * 节点动作JSON数据
 * @ignore
 */
interface ICFNodeAction {
  /**
   * 是否禁用
   */
  disabled: string;
  /**
   * UI上展示的名称
   */
  name: string;
  /**
   * 动作触发时机/事件名
   */
  event: ACTION_EVENT;
  /**
   * 要触发的行为类型
   */
  type: ACTION_TYPE;
  /**
   * 动态激活逻辑条件，如果有这个配置，则当这个条件为真的时候才会触发动作
   * 使用的是通用逻辑条件设置，同逻辑节点，选项选中，选项显示中的逻辑条件一样
   */
  activeConfig?: ICFLogicConfig;
  /**
   * 发送短信相关设置，只有type为sms才会存在
   */
  sms?: ISmsActionJson;
  /**
   * 发送邮件相关配置，只有type为email才会有存在
   */
  email?: IEmailActionJson;
  /**
   * 接口请求相关配置，只有type为http_request的时候才会存在
   */
  request?: ICFRequest;
}

/**
 * 发起动作时传递的参数基础
 * @ignore
 */
interface ICFActionPostParamBase {
  /**
   * 当前回复id
   */
  response_id: string;
  /**
   * 题目id
   */
  question_id: string;
  /**
   * 语言
   */
  locale: string;
  /**
   * 触发时机
   */
  event: ACTION_EVENT;
  /**
   * 触发的行为
   */
  type: ACTION_TYPE;
}

/**
 * 发起邮件动作时传递的参数基础
 * @ignore
 */
interface ICFActionPostEmailParam extends ICFActionPostParamBase {
  /**
   * 邮件标题
   */
  title: string;
  /**
   * 邮箱地址
   */
  email: string;
  /**
   * 邮件内容
   */
  content: string;
}

/**
 * 发起短信时传递的参数基础
 * @ignore
 */
interface ICFActionPostSmsParam extends ICFActionPostParamBase {
  /**
   * 短信配置内容
   */
  content: SignStrStr;
  /**
   * 短信服务商api地址
   */
  url: string;
}
