/**
 * 自定义logo
 * @ignore
 */
interface ICFCustomLogo {
  /**
   * 是否使用自定义logo
   * @ignore
   */
  useCustomLogo: boolean;
  /**
   * 自定logo文字
   */
  customText: string;
  /**
   * 自定logo图片地址
   */
  customLogo: string;
}

/**
 * @ignore
 */
interface ICFRewardRaw {
  id?: number;
  gift_id?: string;
  code: string;
  type: GIFT_TYPE;
  lottery_id: string;
  lottery_option_id: string;
}

/**
 * @ignore
 */
interface ICFLotteryResult {
  rewardTitle?: string;
  rewardDescribe?: string;
  rewardImage?: CFImageInNode;
}

/**
 * @ignore
 */
interface ICFRewardResult {
  recipient?: CFUserInfo;
  gift?: {
    locale: string;
    id: string;
    title: string;
    description: string;
    config: {
      gift_name: string;
    };
  };
  amount?: number;
  type?: GIFT_TYPE;
}

/**
 * 奖励信息
 * @ignore
 */
interface ICFRewardInfo extends ICFGiftNode, ICFLotteryResult, ICFCustomLogo {
  core?: CFCore;
  /**
   * @ignore
   */
  goal: boolean;
  /**
   * @ignore
   */
  goalId: string;
  /**
   * @ignore
   */
  origin: ICFGiftNode;
  /**
   * 奖励标题
   */
  rewardTitle: string;
  /**
   * 奖励描述
   */
  rewardDescribe: string;
  /**
   * @ignore
   */
  noWxShare: boolean;
  /**
   * @ignore
   */
  wxShareInfo: ICFWxShareInfo;
  /**
   * @ignore
   */
  quesTitle: string;
  /**
   * 图片列表
   */
  images: CFImageInNode[];
  /**
   * 奖励名称
   */
  rewardName: string;
  /**
   * 奖励数量
   */
  rewardCount: number;
  /**
   * @ignore
   */
  lotteryCount: number;
  /**
   * @ignore
   */
  sendTime: string;
  /**
   * 奖励类型,UI根据此决定渲染方式
   */
  rewardType: GIFT_TYPE;
  /**
   * @ignore
   */
  verifyCode: string;
  /**
   * @ignore
   */
  rewardNodeId: string;
  /**
   * @ignore
   */
  logoUrl: string;
  /**
   * @ignore
   */
  transactionID: string;
  /**
   * @ignore
   * 问卷原始id
   */
  surveyId: string;
  /**
   * 标题
   */
  title: string;
  /**
   * @ignore
   */
  companyID: string;
  /**
   * 活动名称
   */
  activityName: string;

  summary: string;

  language: string;
}

/**
 * 奖励页面数据模型
 *
 * 渲染奖励信息
 */
interface CFRewardState extends ICFRewardInfo, CFStateBase {
  /**
   * 奖励类型,包含以下两种类型
   * 需要根据该类型渲染不同的内容.
   * 参考其他属性.
   *
   */
  rewardType: GIFT_TYPE;
  /**
   * 奖励领取者的微信头像图片地址
   * 只有微信红包奖励的时候渲染
   */
  wechatImage: string;
  /**
   * 奖励领取者微信名称
   * 只有微信红包奖励的时候渲染
   */
  wechatID: string;
  /**
   * 节点描述
   */
  description: string;
  /**
   * 同description
   */
  summary: string;
  /**
   * 奖励时间
   */
  rewardTime: string;
  /**
   * 奖励金额
   */
  rewardValue: string;
  /**
   * 是否需要奖励短信
   * 自定义奖励时需要渲染
   * 如果有该属性则需要手机号码输入框和获取验证码的按钮
   */
  rewardToMessage: boolean;
  /**
   * 二维码文本数据,自定义奖励时需要渲染
   */
  qrCode: string;
  /**
   * 继续按钮文字,如果该属性有值,则需要渲染一个继续按钮,按钮上的文字就是这个文字.
   * 点击后应该调用[[CFUIEventHandler.handleNextClick]]方法
   */
  nextButton: string;
  /**
   * 后退按钮文字,如果该属性有值,则需要渲染一个后退按钮,按钮上的文字就是这个文字.
   * 点击后应该调用[[CFUIEventHandler.handlePrevClick]]方法
   */
  prevButton: string;
  /**
   * 语言代号
   * @ignore 该属性只在此核心项目中编程时使用,不会包含到发布后的包中
   */
  language: string;
}
