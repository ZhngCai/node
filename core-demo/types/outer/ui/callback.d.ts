//#region UI操作回调相关说明
/**
 * 验证题输入内容
 */
interface CFValidateData {
  /**
   * 验证码
   */
  code?: string;
  /**
   * 电话号码
   */
  phoneNumber?: string;
}

/**
 * 问题输入内容
 */
type CFQuestionInputData = string | CFValidateData | CFMapLocation | ICoords;

/**
 * 选项输入内容
 */
type CFOptionInputData = string | number | ICFUploadResult | null;

/**
 * UI端进行某些操作是需要进行回调的回调函数规格集合
 */
interface CFUIEventHandler {
  /**
   * 选择语言后的回调
   * @param item 多语言项
   */
  handleLangChange(item: CFLangTableItem): Promise<void>;
  /**
   * 输入手机号码后的回调
   * @param number 手机号码
   * @param target: 关联的问题或奖励页面数据模型
   */
  handleInputPhone?(number: string, question: CFQuestion | CFRewardState): Promise<void>;
  /**
   * 输入验证码后的回调
   * @param code 验证码
   * @param question 关联的问题
   */
  handleInputCode?(code: string, question: CFQuestion): Promise<void>;
  /**
   * 系统自动定位后的回调
   * @param location 定位信息
   * @param question 关联的问题
   */
  handleAutoLocate?(location: CFMapLocation, question: CFQuestion): Promise<void>;
  /**
   * 手动选择省市区位置后的回调
   * @param indexes 省市区分别在各自列表中的序号,用一个空格分隔,序号从零开始计算
   *                如`0 2 4` 代表 省份列表中的第1个省级项目,该省的第三个市级项目,该市的第5个县级项目
   * @param question 关联的问题
   */
  handleManualLocate?(indexes: string, question: CFQuestion): Promise<void>;

  /**
   * 选项点击回调,适用题型:
   * 选择题/图标题/图片选择题/矩阵题/图片框选题/图片上传题点击上传
   * @param option 点击的选项
   * @param question 所在题目
   */
  handleOptionClick?(option: CFOption, question: CFQuestion): Promise<void>;

  /**
   * 菜单项选择变化回调,适用题型:菜单题
   * @param index 点击列表项的序号,从0开始计数
   * @param question 所在题目
   * @returns 由逻辑层控制后真正使用的项目文字列表
   */
  handleMenuClick?(index: number, question: CFMenuQuestion): Promise<string[]>;

  /**
   * 级联菜单项选择变化回调,适用题型:级联菜单题
   * @param index 点击列表项的序号,从零开始计数
   * @param cascade 级联菜单项所在的级联组
   * @param question 所在题目
   * @returns 由逻辑层控制后真正使用的项目文字列表
   */
  handleCascadeClick?(
    index: number,
    cascade: CFCascade,
    question: CFCascadeQuestion
  ): Promise<void>;

  /**
   * 级联菜单项被输入时的回调,适用题型:级联菜单题
   * @param text 输入的内容
   * @param index 菜单项的序号,从零开始计数
   * @param cascade 菜单项所在的级联组
   * @param question 所在题目
   */
  handleCascadeInput?(
    text: string,
    index: number,
    cascade: CFCascade,
    question: CFCascadeQuestion
  ): Promise<void>;

  /**
   * 获取验证码按钮点击回调,适用题目,验证节点,奖励节点
   * 回调中逻辑层会去获取短信验证码或者图片验证码
   * @param question 所在题目
   */
  handleGetCodeClick?(question: CFQuestion): Promise<void>;

  /**
   * 选项输入回调函数:适用题目填空题,打分题,数值分配题,连续评价题,上传题,输入方式排序或挑选方式排序的排序题以及有其他选项需要输入的题型
   * 对与挑选排序的排序题，如果是要放弃序号，data参数传入-1即可
   * @param data 输入的数据
   * @param option 所在的选项
   * @param question 所在的题目
   */
  handleOptionInput?(
    data: CFOptionInputData,
    option: CFOption,
    question: CFQuestion
  ): Promise<void>;
  /**
   * 选项辅助输入回调函数
   * @param data 输入数据
   * @param key 使用的辅助属性
   * @param option 选项
   */
  handleOptionAssistInput?(
    data: string,
    key: CFAssistPropKeys,
    option: CFOption,
    question: CFQuestion
  ): Promise<void>;
  /**
   * 自动提示的提示文字输入时触发
   * @param value 输入搜索关键字
   * @param option 所在的选项
   * @param question 所在的题目
   */
  handleAutoCpltInput?(value: string, option: CFOption, question: CFQuestion): Promise<void>;
  /**
   * 问题级别的输入回调函数 适用题目 定位题 精准定位题 地域题 验证节点 奖励节点，图片热力图
   * @param data 输入的数据,对于不同的题型内容稍有不同
   *            对于定位题和精准定位题,内容为定位的结果position
   *            对于地域题而言,是选中的省市区列表项索引字符串,形如: 1 1 1
   *            对于验证节点和奖励节点是一个对象可能包含一个手机号码属性?和一个验证码属性?
   *            对于图片热力题，是一个[[ICoords]]坐标
   * @param question 所在题目,或奖励页面数据模型
   */
  handleQuestionInput?(
    data: CFQuestionInputData,
    question: CFQuestion | CFRewardState
  ): Promise<void>;
  /**
   * 定位失败回调函数
   * @param question 相关问题
   */
  handleLocateFailed?(question: CFQuestion): Promise<void>;
  /**
   * 点击上一题按钮回调
   */
  handlePrevClick?(): Promise<void>;
  /**
   * 点击下一题按钮回调
   */
  handleNextClick?(): Promise<void>;
  /**
   * 排序题排序后的回调函数，适用目前 「拖拽排序」「挑选排序」「挑选跌落排序」「穿梭拖拽排序」所有四种排序方式。
   * 真正的排序逻辑在 UI 中处理，这里接受的两个参数为预期达成的排序结果。
   * 操作前后，单个选项自身的 `sortNo`, `selected` 以及在 `otpions` 中的位置可能会发生变化。
   * `option` 在 `options` 中的索引代表了选项在 UI 中的展示顺序。
   * @param uiIndexesMap 各个选项排序后在 UI 中的顺序。
   * 如果传入空 tuple，那么表示 UI 中选项展示顺序不发生变化。
   * 举例：假如有选项 a, b, c, 排序后在 UI 上的顺序为 c, a, b，那么 `uiIndexesMap` 为 {a->1, b->2, c->0}
   * @param sortNosMap 各个选项排序后新的排序值，即 `sortNo`。`sortNo` 要么是正整数, 要么是 -1。
   * @param sortTargetOpt 此次排序被操作的选项
   * @param question 关联的题目
   */
  handleSequenceInput?(
    uiIndexesMap: Map<CFSequenceOption, number> | [],
    sortNosMap: Map<CFSequenceOption, number>,
    question: CFSequenceQuestion,
    sortTargetOpt: CFSequenceOption,
  ): Promise<void>;
  /**
   * MaxDiff问题评分后的回调
   * @param value 分值，只能是-1或者1
   * @param item 被评价的项目
   * @param task 关联的任务
   * @param question 关联的题目
   */
  handleMaxDiffInput?(
    value: MAX_DIFF_VALUE,
    item: CFMaxDiffTaskItem,
    task: CFMaxDiffTask,
    question: CFMaxDiffQuestion
  ): Promise<void>;
  /**
   * 处理快速答题
   * @param question
   */
  handleQuickAnswer?(question: CFQuestion): Promise<void>;
}

//#endregion
