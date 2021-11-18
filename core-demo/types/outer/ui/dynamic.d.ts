//#region 动态组件说明
/**
 * 节点动态组件信息
 */
interface CFNodeTemplate {
  /**
   * 组件id
   * @ignore
   */
  id: string;
  /**
   * 名称
   * @ignore
   */
  name: string;
  /**
   * 组件的额外参数,在设计端中选择适用哪个动态组件渲染题目后
   * 还可以额外为该组件传输一些自定义的参数
   * 渲染的时候可以按需使用这些参数
   */
  param?: SignStrStr;
  /**
   * 原始的参数,转
   * @ignore
   */
  params?: CFParamItem[];
  /**
   * 真实组件,动态加载组件的客户端
   * 需要通过该属性来获得的真实的组件对象来渲染
   */
  component: any;
}

/**
 * 动态加载的组件叶子
 * @ignore
 */
interface ICFTemplateItem {
  /**
   * 文件名
   */
  file: string;
  /**
   * id
   */
  id: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 节点类型
   */
  type?: string;
  /**
   * 依赖项
   */
  dependencies: string[];
}

/**
 * 动态加载组件树
 * @ignore
 */
interface ICFTemplateTree {
  /**
   * 标准问题入口模板组
   */
  standards: ICFTemplateItem[];
  /**
   * 共用分部模板组
   */
  partials: ICFTemplateItem[];
}
//#endregion
