/**
 * 单页组表格
 * 主要用于在答题过程中，如果是单页组并且开始了 renderAsTable 这个选项的时候
 * 需要优先使用这个字段来渲染，
 * 在这种模式下，单页组中的题目按照表格的形式渲染题目
 */
interface ISinglePageGroupTable {
  /**
   * 表格标题
   */
  title: string
  /**
   * 表格头部数据
   */
  header: ISinglePageGroupTableHeaderCell[]
  /**
   * 每一行的数据
   */
  rows: ISinglePageGroupTableRow[]

}

/**
 * 单页组的某一列的数据结构
 */
interface ISinglePageGroupTableHeaderCell {
  /**
   * 列的标题
   */
  title: string
  /**
   * 列的uuid
   */
  uuid: string
}

/**
 * 单页组的一行的数据结构
 */
interface ISinglePageGroupTableRow {
  /**
   * uuid
   */
  uuid: string
  /**
   * 行头需要显示的文本
   */
  title: string;
  /**
   * 每一行所关联的问题，横向排布。
   */
  cells: ISinglePageGroupTableRowCell[]
}

/**
 * 单页组的一行的数据结构
 */
interface ISinglePageGroupTableRowCell {
  /**
   * cell 的 uuid
   * 在有node 的情况下，会使用node的renderId 
   * 如果没有的家。则自动生成一个uuid
   */
  uuid: string
  /**
   * 单元格子内的关联问题
   */
  node?: CFQuestion
}