//#region 节点组说明
/**
 * 节点组数据结构
 * @ignore
 */
interface ICFNodeGroup {
  /**
   * 组id
   * @ignore
   */
  id?: string;
  /**
   * 组颜色
   * @ignore
   */
  color?: string;
  /**
   * 组名称
   * @ignore
   */
  title?: string;
  /**
   * 是否为单页组
   * @ignore
   */
  singlePage?: boolean;
  /**
   * 所包含节点id的列表
   * @ignore
   */
  nodes?: string[];
  /**
   * 上一题按钮文字
   * @ignore
   */
  prevText: string;
  /**
   * 下一题按钮文字
   * @ignore
   */
  nextText: string;
  /**
   * 组内节点排列方向
   */
  displayDirection: GROUP_DISPLAY_DIRECTION;
  /**
   * 是否需要渲染成单页表格的样式
   * @param
   */
  renderAsTable?: boolean;
  /**
   * 如果需要渲染成单页表格，则这个就是表格上方的标题
   */
  tableTitle?: string;
}
//#endregion
