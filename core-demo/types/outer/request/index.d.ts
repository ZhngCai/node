/**
 * 验证节点调用验证接口时提交的数据格式
 * @ignore
 */
interface ICFPostValidationData {
  /**
   * 回复id
   */
  response_id: string;
  /**
   * 验证节点id
   */
  question_id: string;
  /**
   * 手机号码
   */
  phone_num?: string;
  /**
   * 验证码/密码
   */
  code?: string;
}

/**
 * @ignore
 */
interface ICFIntroMeta {
  collector: ICFCollector;
  channel: ICFChannelConfig;
  authorized: boolean;
  interviewee: ICFInterviewee;
  smaller_diagram_url: string;
  payload_digest: string;
  diagram_url: string;
  langs: ICFRemoteLang[];
}

/**
 * @ignore
 */
interface ICFParsedSmallPayload {
  imageList: ICFImage[];
  videoList: CFVideo[];
  nodeList: ICFNode[];
  /**
   * 问卷原始id
   */
  surveyId: string;
  theme: ICFThemeConfig;
  variables: ICFVarRaw[];
  basicConfig: ICFIntroMeta;
  nodeGroups: ICFNodeGroup[];
  embedApis: ICFEmbedApi[];
  varStyles: CFVarStyleGroup;
  langs: ICFLang[];
  language: string;
  langStore: any;
  langTable: CFLangTableItem[];
  langResume: boolean;
  testCases: ICFTestCase[];
  disabledLangs: string[];
}

/**
 * @ignore
 */
interface ICFResponseInfo {
  /**
   * 此次提交id
   */
  id: string;
  /**
   * 设备平台信息
   */
  platform: string;
  /**
   * 状态
   */
  status: RESPONSE_STATUS;
}

/**
 * @ignore
 */
interface ICFTranMiniState {
  transactionID: string;
  status: string;
  platform: string;
  digest: string;
  channel: ICFChannelConfig;
}

/**
 * 收集器信息
 * @ignore
 */
interface ICFCollector {
  /**
   * 收集器名称
   */
  name: string;
  /**
   * 收集器渠道配置
   */
  channel_configs: ICFChannelConfig[];
  /**
   * 是否允许多次回复
   */
  multiple_response: boolean;
  /**
   * 收集器id
   */
  id: string;
  /**
   * 样本数据转移配置
   */
  sampler_config: { [key in DATA_TRANSFER_NAME]: string };
}

/**
 * @ignore
 */
interface ICFInterviewee {
  raw_data: CFUserInfo;
  id: string;
}
/**
 * 受访者信息
 */
interface CFUserInfo {
  /**
   * 受访者昵称
   */
  nickname?: string;
  /**
   * 受访者id
   */
  openid?: string;
  /**
   * 受访者联合授权id
   */
  unionid?: string;
  /**
   * 头像
   */
  headimgurl?: string;
}

/**
 * @ignore
 */
interface ICFChannelConfig {
  type: ENV_NAME;
  allow_response?: boolean;
  app_id?: string;
  component_appid?: string;
  authorizer_id?: string;
}

/**
 * 验证节点调用验证接口后返回的数据格式
 * @ignore
 */
interface ICFPostValidationResponse {
  /**
   * 验证id
   */
  id?: string;
  /**
   * 验证码图片
   */
  image?: string;
  /**
   * 该手机在该份问卷中是否被使用过
   */
  phone_num_used?: boolean;
}

/**
 * 正式提交答案后返回的信息
 * @ignore
 */
interface ICFFormalResult extends ICFResponseInfo {
  /**
   * 该此答题的事务信息
   * 注:后台返回的数据格式,当是一个简单的提交时
   * 事务信息直接摊开在当前对象上,所以上面可以看到本身就继承了CFTransaction
   * 但是当有授权或奖励等情况下,这些事务信息会被收起到该response属性上
   * 有这两个形态
   * 不过当前并没没有使用这些数据,所以无大碍,此处指做标记
   */
  response: ICFResponseInfo;
  /**
   * 奖励信息
   */
  reward: ICFRewardRaw;
  /**
   * 授权信息
   */
  authorizer: ICFChannelConfig;
}

/**
 * 微信分享信息
 * @ignore
 */
interface ICFWxShareInfo {
  /**
   * 分享标题
   */
  title: string;
  /**
   * 分享描述
   */
  desc: string;
  /**
   * 分享链接地址
   */
  shareLink: string;
  /**
   * 图片地址
   */
  imageUrl: string;
}

/**
 * 微信签名信息
 * @ignore
 */
interface ICFWxSign {
  /**
   * 应用id
   */
  appid: string;
  /**
   * 时间戳
   */
  timestamp: string;
  /**
   * ^_^
   */
  noncestr: string;
  /**
   * 签名
   */
  signature: string;
}
