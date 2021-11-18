/**
 * @ignore
 */
interface ICFRealtimeNode extends ICFStartNode, ICFGiftNode {
  groupNodes?: CFQuestion[];
  group: ICFNodeGroup;
}
/**
 * @ignore
 */
interface ICFRealtimeContent {
  content: ICFRealtimeNode;
  globalSetting: {
    theme: CFTheme;
    templates: string[];
    fakedServers: string[];
    progressBarRequired: boolean;
    limitTime: number;
    restTime: string;
    langTable: CFLangTableItem[];
    fullLangStore: any;
    autoCpltGroups: ICFAutoCpltGroup[];
    language: string;
    variables: ICFVarRaw[];
    imageList: ICFImage[];
    nodeList: CFQuestion[];
    nextBtnText: string;
    prevBtnText: string;
    varStyles: CFVarStyleGroup;
    embedApis: ICFEmbedApi[];
  };
  regionList: CFRegionDict[];
}

/**
 * 实时预览路由的数据模型
 */
interface CFRealtime {
  /**
   * 真正的数据藏在这个属性里
   */
  data: CFRealtimeState;
}

/**
 * 实时预览数据的真正数据
 * 这是一个混合对象,依据设计端实施预览时选中的节点
 * 不同场合下分别可以充当普通题目,题目组,开始页面和奖励页面的渲染数据
 * 具体请看各个属性的说明
 *
 * + 当[[CFRealtimeState.isStart]]为true,就可以当成[[CFStartState]]来渲染开始页面
 * + 当[[CFRealtimeState.isGift]]为true,就可以当成[[CFRewardState]]来渲染奖励页面
 * + 否则,就当成[[CFSurveyState]]来渲染答题页面
 */
interface CFRealtimeState extends CFSurveyState, CFStartState {
  /**
   * 奖励类型,预览奖励页面时才存在
   */
  rewardType?: GIFT_TYPE;
  /**
   * 奖励数量,预览奖励页面时才存在
   */
  rewardValue?: string;
  /**
   * 是否需要奖励短信,预览奖励页面时才存在
   */
  rewardToMessage?: boolean;
  /**
   * 奖励二维码文字,如有则需要依次渲染二维码
   * 预览奖励页面时才存在
   */
  qrCode?: string;
  /**
   * 布局对象，只有预览开始页面和奖励页面的时候才会存在。
   */
  layout?: CFNodeLayout;
  /**
   * 是否预览开始页面,如果是则按开始页面渲染
   */
  isStart?: boolean;
  /**
   * 是否预览奖励页面,如果是则按奖励页面渲染
   */
  isGift?: boolean;
  /**
   * 微信头像地址,预览奖励页面是才存在
   */
  wechatImage: string;
  /**
   * 微信名称,预览奖励页面的时候才存在
   */
  wechatID: string;
  /**
   * 奖励名称,预览奖励页面的时候才存在
   */
  rewardName?: string;
  /**
   * 奖励图标,预览奖励页面时才存在
   */
  icon?: string;
  /**
   * 中奖时间,预览奖励页面时才存在
   */
  rewardTime?: string;
}
