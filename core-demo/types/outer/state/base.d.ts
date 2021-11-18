/**
 * @ignore
 */
interface CFStateBase {
  /**
   * UI交互回调函数
   */
  handleEvents: CFUIEventHandler;
  /**
   * 主题信息
   */
  theme: CFTheme;
  /**
   * 事件处理器
   */
  eventHub: CFEventHub;
}

/**
 * 微信分享状态
 * @ignore
 */
interface ICFWxShareState {
  /**
   * 是否禁用微信分享
   */
  noWxShare: boolean;
  /**
   * 分享标题
   */
  title: string;
  /**
   * 分享描述
   */
  summary: string;
  /**
   * 分享图片
   */
  images: CFImageInNode[];
  /**
   * 微信分享信息
   */
  wxShareInfo?: ICFWxShareInfo;
}
