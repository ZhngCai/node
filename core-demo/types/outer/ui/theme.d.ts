/**
 * 全局主题[[CFTheme]]和节点自有主题信息[[CFNodeLayout]]共通继承的数据基础，
 * 其中关于背景图片相关的属性，如果全局有背景图片，
 * 但是某个节点没有设置背景图片，
 * 则这个节点也使用全局的背景图片，如果这个节点设置了背景图片。
 * 则这个节点使用自己的背景图片。
 */
interface CFThemeBase {
  /**
   * 背景图片展示方式
   */
  bgLayout?: BG_IMG_LAYOUT;
  /**
   * 背景图片大小
   * 如果[[CFThemeBase.bgLayout]]是cover的时候，这个值将会是cover，因为cover模式下是无视大小的，
   * 其他时候，是以百分比的或者px为单位的尺寸大小
   */
  bgSize?: string;
  /**
   * 背景图片透明度
   */
  bgOpacity?: number;
  /**
   * 背景图片地址
   */
  bgImageUrl?: string;
  /**
   * 背景图片原始高度
   */
  bgImageHeight?: number;
  /**
   * 背景图片原始宽度
   */
  bgImageWidth?: number;
  /**
   * 问题字体大小
   */
  fontSize: string;
  /**
   * 问题字体粗细
   */
  fontWeight: FONT_WEIGHT;
  /**
   * 描述字体大小
   */
  descFontSize: string;
  /**
   * 描述字体粗细
   */
  descFontWeight: FONT_WEIGHT;
  /**
   * 选项字体大小
   */
  optFontSize: string;
  /**
   * 选项字体粗细
   */
  optFontWeight: FONT_WEIGHT;
}

/**
 * 全局主题信息
 * 每个答题页面需要绑定这些属性，实现支持动态调整样式的UI
 */
interface CFTheme extends CFThemeBase {
  /**
   * 是否动态加载模板的主题
   */
  dynamic: boolean;
  /**
   * 要求的客户端名称
   */
  client: string;
  /**
   * @ignore
   */
  default: string;
  /**
   * 主颜色
   */
  primary: string;
  /**
   * 辅助色
   */
  secondary: string;
  /**
   * 对比色
   */
  contrast: string;
  /**
   * 背景色
   */
  background: string;
  /**
   * 错误色
   */
  error: string;
  /**
   * 按钮颜色
   */
  button: string;
  /**
   * 按钮字体大小
   */
  btnFontSize: string;
  /**
   * 按钮字体粗细
   */
  btnFontWeight: FONT_WEIGHT;
  /**
   * @ignore
   */
  name: string;
  /**
   * 字体
   */
  fontFamily: string;
  /**
   * 问卷标题字体大小
   */
  titleFontSize: string;
  /**
   * 问卷标题字体粗细
   */
  titleFontWeight: FONT_WEIGHT;
  /**
   * 容器宽度
   */
  boxWidth: string;
  /**
   * 选项点击效果
   */
  effect: OPT_EFFECT;
}

/**
 * @ignore
 */
interface ICFThemeConfig {
  usingTheme: CFTheme;
}
