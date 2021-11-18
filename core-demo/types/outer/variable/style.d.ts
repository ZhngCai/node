/**
 * 自定义样式
 */
interface CFVarStyle {
  /**
   * 是否粗体
   */
  bold?: boolean;
  /**
   * 是否斜体
   */
  italic?: boolean;
  /**
   * 是否携带下划线
   */
  underline?: boolean;
  /**
   * 是否携带中划线
   */
  lineThrough?: boolean;
  /**
   * 背景颜色
   */
  backgroundColor?: string;
  /**
   * 字体颜色
   */
  color?: string;
  /**
   * 字体大小
   */
  fontSize?: string;
  /**
   * 对其方式
   */
  textAlign?: string;
}

/**
 * 样式组
 */
interface CFVarStyleGroup {
  /**
   * 通用样式，对应var-light
   */
  allJson: CFVarStyle;
  /**
   * 字符串变量样式，对应var-string
   */
  strJson: CFVarStyle;
  /**
   * 数值变量样式，对应var-expression
   */
  expJson: CFVarStyle;
  /**
   * 接口请求变量，对应var-request
   */
  reqJson: CFVarStyle;
  /**
   * 循环变量，对应var-loop
   */
  loopJson: CFVarStyle;
}
