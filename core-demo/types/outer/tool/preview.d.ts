/**
 * 预览历史工具
 *
 * 该工具可以用来恢复之前的预览书签,快速跳回到之前预览过的某道题.
 *
 * [[CFPreviewBookmark.bookmarks]]中包含了之前保存的所有预览书签
 * 需要使用一个列表将这些书签渲染出来,每个列表项中显示书签名称,一个删除按钮,一个导入按钮
 * 点击删除按钮后调用[[CFPreviewBookmark.deleteBookmark]]方法,可以删除该书签
 * 点击导入按钮后调用[[CFPreviewBookmark.applyBookmark]]方法,可以加载该书签,加载书签后会恢复到该书签最后预览的地方
 *
 * 导入书签需要一定的时间,在该时间内[[CFPreviewBookmark.loading]]属性会变成true,同时[[CFPreviewBookmark.progress]]会是一个一直
 * 变化的导入进度,导入的时候,可以渲染这个导入中的状态以及导入进度.
 *
 * 需要渲染一个输入框一个保存按钮,允许用户输入一个书签命并且点击保存书签
 * 点击保存后,需要调用[[CFPreviewBookmark.saveBookmarks]]方法,会将当前的预览进度保存为一个书签,以供后续使用.
 *
 * [[CFPreviewBookmark.uploadBookmark]]用来从某个书签文件导入书签
 *
 * [[CFPreviewBookmark.downloadBookmark]]用来将某个书签导出为文件
 *
 * 在[[CFPreviewBookmark.nodeList]]保存了当前所有预览过的题目,需要将这些题目渲染成一个列表.
 * 列表中的每一项显示题目的编号和一个调转按钮,点击改跳转按钮后调用[[CFPreviewBookmark.jumpToNode]]方法
 * 之后将会调转到该题.
 *
 */
interface CFPreviewBookmark {
  /**
   * 是否正在加载历史
   */
  loading: boolean;
  /**
   * 加载进度
   */
  progress: string;
  /**
   * 当前预览进度节点列表
   */
  nodeList: CFQuestion[];
  /**
   * 预览的历史书签数据列表
   */
  bookmarks: CFPreviewBookmarkData[];
  /**
   * 跳转当前预览进度中某个节点时
   * 可以回到该节点
   * @param node 节点
   */
  jumpToNode(node: CFQuestion): Promise<void>;
  /**
   * 取到某个书签
   * @param item 预览历史项
   */
  applyBookmark(item: CFPreviewBookmarkData): Promise<void>;
  /**
   * 删除某个预览历史书签
   * @param item 预览历史项
   * @param event 时间参数
   */
  deleteBookmark(item: CFPreviewBookmarkData): Promise<void>;
  /**
   * 点击保存当前预览记录为历史项的按钮时的回调
   * @param name 用户填入的项目名
   */
  saveBookmarks(name: string): Promise<void>;
  /**
   * 选择从文件系统上传导入书签
   */
  uploadBookmark(): Promise<void>;
  /**
   * 导出某个书签下载到为文件系统
   */
  downloadBookmark(item: CFPreviewBookmarkData): Promise<void>;
}

/**
 * 预览时间工具
 * 在[[CFPreviewTime.timeInfo]]中包含了预览到当前进度下的时间消耗细节
 *
 * 其中[[CFPreviewTimeInfo.allTime]]是总共已经消耗的时间
 *
 * [[CFPreviewTimeInfo.displayList]]中则存储了每道题消耗的时间信息
 *
 * 需要渲染一个输入框和一个上传按钮,允许预览者输入自己的名字,然后点击上传按钮将预览的时间信息上传
 *
 * 点击上传按钮后要调用[[CFPreviewTime.uploadTime]]方法
 */
interface CFPreviewTime {
  /**
   * 预览时间相关信息
   */
  timeInfo: CFPreviewTimeInfo;
  /**
   * 点击上传按钮时的回调
   * @param name 用户填写的名称
   */
  uploadTime(name: string): Promise<void>;
}

/**
 * 预览工具
 * 答题页面在预览模式([[CFSurveyState.preview]]取值为真)下,需要渲染一个预览工具
 * 这时候[[CFSurveyState.previewTool]]属性会有值,就是当前类型.
 *
 * 一开是一般只渲染一个开关按钮,点击开关后调用[[CFPreviewTool.handleToggleOpen]]方法
 * 当[[CFPreviewTool.opened]]为true的时候,需要渲染预览工具面板,其中应该包含以下两部分功能
 * 1. 预览历史工具,参照[[CFPreviewBookmark]]进行渲染
 * 2. 预览时间工具,参照[[CFPreviewTime]]进行渲染
 */
interface CFPreviewTool {
  /**
   * 预览历史工具
   */
  bookmark: CFPreviewBookmark;
  /**
   * 预览时间工具
   */
  time: CFPreviewTime;
  /**
   * 是否已经开启
   */
  opened: boolean;
  /**
   * 打开
   */
  open(): void;
  /**
   * 点击关闭的回调函数
   */
  close(): void;
  /**
   * 切换打开/关闭的回调函数
   */
  handleToggleOpen(): void;
}

/**
 * 预览历史书签
 */
interface CFPreviewBookmarkData {
  /**
   * @ignore
   */
  result: ICFResumeHolder;
  /**
   * id
   */
  id: string;
  /**
   * 名称
   */
  name: string;
}

/**
 * 用于展示的某个节点的预览时间信息
 */
interface CFPreviewTimeDisplay {
  /**
   * 节点名称
   */
  name: string;
  /**
   * 节点描述
   */
  title: string;
  /**
   * 耗时
   */
  time: number;
}

/**
 * @ignore
 */
interface ICFPreviewTimePost {
  ques_id: string;
  time: number;
  inLoop: boolean;
}

/**
 * 预览时间信息
 */
interface CFPreviewTimeInfo {
  /**
   * 需要提交的内容
   * ui渲染不用理会
   * @ignore
   */
  postList: ICFPreviewTimePost[];
  /**
   * 需要渲染的内容
   */
  displayList: CFPreviewTimeDisplay[];
  /**
   * 问卷id
   * @ignore
   */
  surveyId: string;
  /**
   * 总耗时
   */
  allTime: number;
}
