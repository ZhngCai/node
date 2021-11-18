//#region 自动填充功能相关的说明

/**
 * 自动提示的数据
 */
interface CFAutoCpltData {
  [key: string]: any;
  /**
   * 要显示的图标
   */
  icon: string;
  /**
   * 要显示的名称
   */
  name: string;
  /**
   * 用于匹配用户输入的数据集合
   */
  triggers: string[];
}

/**
 * 自动提示数据
 * @ignore
 */
interface ICFAutoCpltGroup {
  /**
   * id
   */
  id: string;
  /**
   * 数据
   */
  data: CFAutoCpltData[];
}

/**
 * 自动提示匹配结果
 */
interface CFAutoCptlResult {
  /**
   * 已选择的列表
   */
  existed: string[];
  /**
   * 匹配列表
   */
  results: CFAutoCpltData[];
}

/**
 * 自动提示可选模块
 */
interface CFAtcp {
  /**
   * 获取自动提示数据
   * @param text 关键字
   * @param existed 已使用的项目，用来从结果中排除，防止结果中再次出现
   * @param source 自动提示数据源
   * @param rule 匹配规则
   * @param strict 是否严格匹配，严格匹配值检查是否完全相等，不进行模糊匹配和拼音推测匹配
   */
  getAutoCompleteData(
    text: string,
    existed: string[],
    source: CFAutoCpltData[],
    rule: PINYIN_MATCH,
    strict?: boolean
  ): CFAutoCptlResult;
}

//#endregion
