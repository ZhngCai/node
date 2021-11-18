/**
 * 用于渲染的富文本节点
 */
interface CFRichTextNode {
  /**
   * 节点类型
   */
  type: RICH_NODE_TYPE;
  /**
   * 节点名
   */
  name: RICH_NODE_NAME;
  /**
   * 文本值
   */
  text?: string;
  /**
   * 属性表
   */
  attrs: SignStrStr;
  /**
   * 子节点列表
   */
  children?: CFRichTextNode[];
}
