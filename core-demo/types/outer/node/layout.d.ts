//#region 节点布局说明

/**
 * 每个节点自有布局与主题信息数据结构
 *
 * 其中来自于[[CFThemeBase]]中的属性是和[[CFTheme]]是一样的。
 *
 * 关于这些属性：
 *
 * 可以看成是对[[CFTheme]]全属性的一个覆盖，
 * 当自己没有指定属性时，就是用全局的属性，
 * 当自己有指定属性时，就使用自己的属性
 */
interface CFNodeLayout extends CFThemeBase {
  /**
   * 选项排列方式
   */
  optAlign: OPT_ALIGN;
  /**
   * 以指定列数排列时的选项显示列数
   */
  columns: number;
  /**
   * 选项标记与展示方式
   */
  optMark: OPT_MARK;
  /**
   * 选项数值方式对齐规则
   */
  verticalAlign?: VERTICAL_ALIGN;
  /**
   * 选项水平方向对齐规则
   */
  horizontalAlign?: HORIZONTAL_ALIGN;
  /**
   * 是否自适应控制列数
   */
  responsiveColumn?: boolean;
  /**
   * 自适应控制列数时移动设备上的列数，
   * 如果有该属性，则移动端上优先使用该属性决定列数，
   * 如果没有则使用[[CFNodeLayout.columns]]决定列数
   */
  mobileColumns?: number;
  /**
   * 自适应控制列数时桌面设备上的列数，
   * 如果有该属性，则PC端上优先使用该属性决定列数，
   * 如果没有则使用[[CFNodeLayout.columns]]决定列数
   */
  desktopColumns?: number;
  /**
   * 图标字体大小
   */
  iconFontSize?: string;
}

//#endregion
