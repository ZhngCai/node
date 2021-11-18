/**
 * 答案验证结果
 */
interface CFValidateResult extends ICFRequestResult {
  /**
   * 答案是否符合要求
   */
  valid?: boolean;
  /**
   * 结果类型
   */
  type?: MSG_LEVEL;
  /**
   * 验证未通过归咎的题目
   */
  dueToNode?: CFQuestion;
  /**
   * 验证未通过归咎的选项
   */
  dueToOption?: CFOption;
}
