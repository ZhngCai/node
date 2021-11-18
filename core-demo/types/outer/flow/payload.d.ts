/**
 * 下载问卷概要数据
 * @ignore
 */
interface ICFSmallPayload {
  version: number;
  /**
   * 媒体库内容
   */
  mediaLibrary: {
    /**
     * 图片列表
     */
    imageList: ICFImage[];
    /**
     * 视频列表
     */
    videoList: CFVideo[];
  };
  /**
   * 节点数据
   */
  nodes: ICFNode[];
  /**
   * 问卷id
   */
  surveyId: string;
  /**
   * 主题信息
   */
  theme: ICFThemeConfig;
  /**
   * 变量列表
   */
  variables: ICFVarRaw[];
  /**
   * 节点组信息
   */
  nodeGroups: ICFNodeGroup[];
  /**
   * 内置接口数据
   */
  embedApis: ICFEmbedApi[];
  /**
   * 变量样式
   */
  varStyles: CFVarStyleGroup;
  /**
   * 外置语言
   */
  langs?: ICFRemoteLang[];
  /**
   * 内置语言
   */
  langPack?: { [key: string]: ICFLangStore }
  /**
   * 已禁用的语言
   */
  disabledLangs: string[];
  /**
   * 测试用例数据
   */
  testCases: ICFTestCase[];
}
