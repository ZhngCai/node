//#region 题目分类说明

/**
 * 两种矩阵组装结果
 * @ignore
 */
interface ICFFlatResult {
  /**
   * 摊开的矩阵
   */
  flatten: CFFlatItem[];
  /**
   * 网格矩阵
   */
  options: CFMatrixOption[];
  /**
   * 全部矩阵网格
   */
  fullOptions: CFMatrixOption[];
}

/**
 * 网格矩阵
 * @ignore
 */
interface ICFMatrixResult {
  /**
   * 矩阵
   */
  matrix: CFMatrixOption[][];
}

/**
 * 图标题
 * 渲染规则和选择题一样,参考[[CFSelectQuestion]]
 * 特殊点:
 * 图标题的选项是[[CFSelectIconOption]]类型,可能包含图标.
 * 需要根据[[CFSelectIconOption.normalIconUrl]]和[[CFSelectIconOption.activeIconUrl]]渲染
 */
interface CFSelectIconQuestion extends CFSubjectQuestion {
  /**
   * 图标选项列表
   */
  options: CFSelectIconOption[];
}

/**
 * 排序题
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:排序题的选项不是选择类型,也不是输入类型,是用于排序的.
 * 排序题的普通排序选项,渲染出来以后,应该能让答题者改变选项的顺序来进行排序.
 * 排序选项时[[CFSequenceOption]]类型,[[CFSequenceOption.sortNo]]代表排序后的位置.
 *
 * 排序题使用 live 动态模版渲染不同类型的排序，主要逻辑也放到 UI 中。
 * 所有排序方式都使用[[CFUIEventHandler.handleSequenceInput]]方法。
 *
 * 其他选项渲染方式和选择题一样
 */
interface CFSequenceQuestion extends CFSubjectQuestion {
  /**
   * 排序选项列表
   */
  options: CFSequenceOption[];
  /**
   * 最小排序数
   * @ignore
   */
  rankCount: number;
}

/**
 * 矩阵题
 * 基本内容请参考选择题[[CFSelectQuestion]]
 * 特殊点:矩阵题的选项渲染一般不是使用[[CFMatrixQuestion.options]]属性来渲染
 *
 * 而是使用[[CFMatrixQuestion.matrix]]渲染矩阵表格方式的选项
 *
 * 或者使用[[CFMatrixQuestion.flatten]]渲染层级排布方式的选项
 *
 * 使用哪种方式由[[CFMatrixQuestion.displayType]]决定
 *
 * 矩阵题的普通选项也是选择类型的,点击后调用[[CFUIEventHandler.handleOptionClick]]方法
 *
 * 其他选项和选择题的方式一样
 */
interface CFMatrixQuestion extends ICFMatrixNode, CFSubjectQuestion {
  /**
   * 矩阵选项
   */
  options: CFMatrixOption[];
  /**
   * 原始节点
   * @ignore
   */
  origin: ICFMatrixNode;
  /**
   * 渲染时用于参照的列选项
   */
  renderOptionsX: CFMatrixXOption[];
  /**
   * 渲染时用于参照的行选项
   */
  renderOptionsY: CFMatrixYOption[];
  /**
   * 矩阵选择类型
   * @ignore
   */
  matrixSelect: MATRIX_SELECT;
  /**
   * 矩阵多选限制类型
   * @ignore
   */
  multiType: MATRIX_MULTI;
  /**
   * 选择最小数量
   * @ignore
   */
  multiMin: string | number;
  /**
   * 选择最大数量
   * @ignore
   */
  multiMax: string | number;
  /**
   * 矩阵随机类型
   * @ignore
   */
  randomType: MATRIX_RANDOM;
}

/**
 * 验证题
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:验证题没有也不需要渲染选项和其他选项
 *
 * 而是要渲染一下内容
 *
 * 分三种验证类型:由[[CFVerifyQuestion.validateType]]属性决定
 *
 * 1. 短信验证:sms
 *
 * 渲染手机号码输入框, 输入手机号码时后调用[[CFUIEventHandler.handleInputPhone]]方法
 *
 * 渲染获取短信验证码的按钮,点击以后调用[[CFUIEventHandler.handleGetCodeClick]]方法
 *
 * 渲染验证码输入框,答题者手机上收到验证码后可以在此输入验证码,输入验证码后调用[[CFUIEventHandler.handleInputCode]]方法
 *
 * 2. 图像验证码验证:captcha
 *
 * 渲染获图形验证码按钮,点击以后调用[[CFUIEventHandler.handleGetCodeClick]]方法,点击后获取到的验证码会
 * 放到[[CFVerifyQuestion.captcha]]属性中,是一个图片地址url,需要渲染这个图片.
 *
 * 渲染验证码输入框,答题者看到了图形验证码后,可以在这里输入验证码,输入后调用[[CFUIEventHandler.handleInputCode]]方法
 *
 * 3. 密码验证
 * 只需渲染密码输入框,答题者可以在此输入密码,输入密码后调用[[CFUIEventHandler.handleInputCode]]方法
 *
 */
interface CFVerifyQuestion extends ICFValidateNode, CFQuestion {
  /**
   * 输入值
   * @ignore
   */
  value: string;
  /**
   * 手机号码,仅验证类型为短信验证时才有用.
   *
   * UI渲染:
   *
   * 当为短信验证类型时:UI需要提供输入框给用户输入手机号码
   * 并将输入框的的值绑定为该值,当用户输入的内容发生变化后
   * 需要回调[[CFUIEventHandler.handleInputPhone]]方法
   * 非短信验证类型时,UI中无视该属性.
   */
  phoneNumber: string;
  /**
   * 验证码
   * 当是短信验证的时候,代表接受到的短信验证码
   * 当是图像验证的时候,代表的是图形显示的验证码
   * 当是密码验证的时候,代表的是密码
   *
   * UI渲染:
   *
   * UI需要提供输入框给用户输入验证码
   * 并将输入框的的值绑定为该值,当用户输入的内容发生变化后
   * 需要回调[[CFUIEventHandler.handleInputCode]]方法
   */
  code: string;
  /**
   * 服务端验证结果
   * @ignore
   */
  serverValidations: ICFPostValidationResponse;
  /**
   * 是否获取短信失败
   * @ignore
   */
  messageGetFailed: boolean;
  /**
   * 验证码图片地址
   * 仅当验证类型为图形验证码验证时有用,其他验证类型时无视该属性
   *
   * UI渲染:
   *
   * 渲染出该图片给用户观察以识别验证码
   * 初始场合为空,用户点击获取验证码按钮后,调用回调函数后,该值就会更新
   */
  captcha: string;
}

/**
 * 图片框选题
 * 基本内容请参考选择题[[CFSelectQuestion]]
 * 特殊点,图片框选题的选项不是以列表方式渲染的,而是以覆盖在图片上的区域点的方式渲染
 * 图片框选题的选项是[[CFHotSpotOption]]类型
 *
 * 渲染图片框选题的选项再渲染时,先使用[[CFHotSpotQuestion.mapImage]]渲染出底图.
 *
 * 在根据每个选项的路径[[CFHotSpotOption.pathD]]和位置[[CFHotSpotOption.transform]]在底图上方绘制选项区域.
 *
 * 然后还需要参考[[CFHotSpotQuestion.mapImgHeight]]和[[CFHotSpotQuestion.mapImgWidth]]属性和渲染之后的图片的真实大小
 * 得出比例,需要按这个比例调整选项区域的位置和大小
 *
 * 选项区域被点击后,调用[[CFUIEventHandler.handleOptionClick]]方法
 *
 * 其他选项的渲染方式和选择题一样
 *
 */
interface CFHotSpotQuestion extends ICFHotSpotNode, CFSubjectQuestion {
  /**
   * 图片热点选项
   */
  options: CFHotSpotOption[];
}

/**
 * 图片热力题
 *
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点,图片热热力题的选项的选项是[[CFHeatMapOption]],UI上关注[[CFHeatMapOption.point]]，如果有值，则需要在图片上渲染出这个point。
 *
 * 当选项有值的时候，需要参照[[CFHeatMapQuestion.pointColor]]和[[CFHeatMapQuestion.pointRadius]]将该选项以点的方式渲染在图片上
 *
 * 需要[[CFHeatMapQuestion.mapImage]]渲染出底图，允许答题者随意点击图片的任何地方。
 *
 * 每次图片被点击后，需要参考[[CFHeatMapQuestion.mapImgHeight]]和[[CFHeatMapQuestion.mapImgWidth]]属性和渲染之后的图片的真实大小
 * 得出比例,需要按这个比例得出被点击地方的真实坐标，然后调用[[CFUIEventHandler.handleQuestionInput]]方法,
 *
 * 传入的data就是代表真实坐标的[[ICoords]]，随后核心包总会把这个坐标分配给某个选项的[[CFHeatMapOption.point]]
 *
 * 分配规则：有M个选项，第N次点击产生的值会分配给第`N%M`个选项。
 *
 * 其他选项的渲染方式和选择题一样，
 *
 */
interface CFHeatMapQuestion extends ICFHeatMapNode, CFSubjectQuestion {
  /**
   * @ignore
   */
  clickTimes: number;
  /**
   * 热力图选项
   */
  options: CFHeatMapOption[];
}

/**
 * 填空题
 * 基本内容请参考选择题[[CFSelectQuestion]]
 * 特殊点,填空题的普通选项,都是输入型的选项[[CFValidateOpt.inputType]]为`input`
 *
 * 关注[[CFValidateOpt.fillType]]的值,它定义了很多输入方式,在该属性上说明了每种方式应该渲染成什么样子
 *
 * 选项被输入后,需要调用[[CFUIEventHandler.handleOptionInput]]方法
 *
 * 其它选项的渲染方式和选择题一样
 */
interface CFFillQuestion extends ICFFillNode, CFSubjectQuestion {
  options: CFFillOption[];
}

/**
 * 连续评价题
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:连续评价题通过[[CFSlideRateQuestion.rateType]]属性区分有两种评分方式的UI：
 *
 * 1. slide-演示评价
 *
 * 它的普通选项不是直接以列表的方式展示出来,而是一页一个逐一展示出来的.
 * 它的选项是[[CFSlideRateOption]]类型的数组
 * 每次只渲染一个选项,选项中如有有文字和图片需要渲染
 * 同时关注[[CFSlideRateQuestion.rateOptions]]属性,为该选项渲染出几个打分图形和打分文字.
 * 每个图形和文字代表不同的分值,当答题者点击这些图形的时候就是为该选项评分
 * 评分后需要调用[[CFUIEventHandler.handleOptionInput]]方法
 *
 * 需要进行分页控制：
 * - 初始渲染[[CFSlideRateQuestion.currentOption]];
 * - 渲染上一页，下一页按钮，点击后分别调用[[CFSlideRateQuestion.gotoNextOption]]方法
 * 或[[CFSlideRateQuestion.gotoPrevOption]]方法要求核心包来切换当前选项，[[CFSlideRateQuestion.gotoOption]]跳转到指定的选项
 * - 当前是几分之几项如：1/6，每次切任务后更新进度，当前索引可以到靠查询当前选项在总选项表中的位置获取到。
 *
 * 2. table-表格评价
 *
 * 使用[[CFSlideRateQuestion.options]]与[[CFSlideRateQuestion.rateOptions]]组成生成表格
 * [[CFSlideRateQuestion.options]]当行，[[CFSlideRateQuestion.rateOptions]]当列。
 *
 * 比如下面的水果是选项，喜欢不喜欢是评价项，
 * 这UI看起来和矩阵题的行列单选简直一模一样，但其实是个打分题，提交数据的结构和矩阵题是不一样的。
 *
 *
 * |  |非常不喜欢|比较不喜欢|一般|比较喜欢|非常喜欢|
 * | :-: |  :-:  |  :-:  | :-: |  :-:  | :-: |
 * |    | 1  | 2  |3   | 4  | 5  |
 * |苹果| ○  |  ⊙ | ○  | ○  | ○  |
 * |香蕉| ○  |  ○ | ○  | ○  | ⊙  |
 * |雪梨| ○  |  ○ | ○  | ⊙  | ○  |
 * |菠萝| ○  |  ○ | ○  | ○  | ⊙  |
 *
 *
 *
 * 默认表头会显示两行，第一行是评价项的文字，第二行是评价项的分值
 * 参照[[CFSlideRateQuestion.tableHead]]的值来控制表头的展示方式，有以下可能：
 *
 * + none: 不显示表头
 * + text: 仅显示文字表头
 * + value: 仅显示分值表头
 * + text_value 同时显示文字表头和分值表头，文字表头在上。
 *
 *
 * 点击某个网格时调用[[CFUIEventHandler.handleOptionInput]]方法
 * 传入的分值就是该网格所在列对应的评价项的分值，传入的选项就是该网格所在的行所对应的选项。
 *
 * 渲染网格时检查网格所在行的选项的分值是否和网格所在列的评价项的分值一致，如果一致，则这个网格要被选中。
 *
 * 如果相邻的评价项是一样的（包含都是空字符串的情况）则相邻的的文字表头网格需要合并
 *
 * 如：五个评价项的文字分别是 讨厌-无感-无感-无感-喜欢，则中间三个无感要合并成一个单元格
 *
 * 分值表头则不需要合并
 *
 * 表格评价模式下表头和选项的文字中可能有富文本，需要能支持。
 *
 * 表格评价模式下选项的图片和评价项的图标无视掉，无需支持。
 *
 * 这个情况一般是在较大屏上使用，简单起见对小屏的是适配暂无要求
 * 如果在手机上存在评价项较多即使尽量挤压也在水平方向上显示不下的情况，
 * 这时候让它自动超出屏幕触发系统滚动条也是可以的。
 *
 * 其他选项的渲染方式和选择题一样
 *
 */
interface CFSlideRateQuestion extends ICFSlideRateNode, CFSubjectQuestion {
  /**
   * 是否显示评价结果，针对演示评价有效
   */
  slideRateResult: boolean;
  /**
   * 演示评价选项
   */
  options: CFSlideRateOption[];
  /**
   * 当前选项
   */
  currentOption: CFSlideRateOption;
  /**
   * 切换到前一个选项
   */
  gotoNextOption(): void;
  /**
   * 切换到后一个选项
   */
  gotoPrevOption(): void;
  /**
   * 切换到指定选项
   */
  gotoOption(option: CFSlideRateOption): void;
  /**
   * 表格评价时的表头展示方式
   */
  tableHead: RATE_TABLE_HEAD;
}

/**
 * 数值分配题
 *
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:数值分配题的普通选项要以可评分的方式渲染出来,输入框输入分值,或滑杆拖动输入分值等等都可,UI自行决定.
 *
 * 当输入分值后,需要调用[[CFUIEventHandler.handleOptionInput]]方法
 *
 * 同时还需要一个总结性的区域展示每个选项在所有选项的总分中占用的比例(权重)
 *
 * 可选的渲染权重单位[[CFWeightQuestion.unit]]
 *
 * 其他选项的渲染方式和选择题一样
 *
 */
interface CFWeightQuestion extends CFSubjectQuestion {
  /**
   * 权重选项列表
   */
  options: CFWeightOption[];
  /**
   * 权重总值
   */
  weightTotal: number;
  /**
   * 权重单位
   */
  unit: string;
  /**
   * 权重总值,解析前的值
   * @ignore
   */
  total: number | string;
  /**
   * 是否严格要求权重打满
   * @ignore
   */
  relax: boolean;
  /**
   * 是否显示分值输入框
   * @deprecated 功能改造废除，改用distributeBy属性
   */
  showInput: boolean;
  /**
   * 权重输入方式
   */
  distributeBy: WEIGHT_DISTRIBUTE_BY;
}



/**
 * 拖拽打分题
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:拖拽打分题的每个选项是用于评分的,一般渲染一个滑杆让答题者拖动滑杆评分
 * 选项是[[CFValueMarkOption]]类型,其中定义了最大分支,最小分值限制,每次拖动滑杆时的分值步进
 * 还有最大分值描述,和最小分值描述,这些内容可以选择性的渲染.
 * 答题者给选项评分后需要回调[[CFUIEventHandler.handleOptionInput]]方法
 *
 * 其他选项的渲染方式和选择题一样
 */
interface CFValueMarkQuestion extends ICFValueMarkNode, CFSubjectQuestion {
  /**
   * 分值打分选项
   */
  options: CFValueMarkOption[];
}

/**
 * 图形打分题
 *
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:图形打分题的每个选项是用于评分的,一般渲染一组图形让答题点击图形进行评分
 * 选中的图形数量就代表评分的分值.
 * 选项是[[CFIconMarkOption]]类型,在这个选项类型上定义了要渲染的图形名称和图形数量.
 *
 * 答题者点击图形进行评分后需要调用[[CFUIEventHandler.handleOptionInput]]方法
 *
 *
 *
 * 其他选项的渲染方式和选择题一样
 */
interface CFIconMarkQuestion extends ICFIconMarkNode, CFSubjectQuestion {
  /**
   * 图形打分选项列表
   */
  options: CFIconMarkOption[];

  /**
   * 数值分值是否反向显示，只有在选择数字图形的时候有效
   * 默认：是从左往右从小到大显示
   * 开启后：从左往右从大到小显示
   */
  inverseValue: boolean;
}

/**
 * 选择题
 * 需要渲染的内容:
 * 这里借用选择题的文档做了一个总结性的说明,其他题型中有很多部分是和选择题类似的
 * 都参考该选择题的说明
 * 在其他题目中不会重复描述这些类似的功能,而是只描述他们独特的地方.
 *
 * 1. 基本信息,大部分的题目基本上都需要考虑渲染以下内容
 *  + 问题标题:[[CFSelectQuestion.title]]
 *  + 问题描述:[[CFSelectQuestion.description]]
 *  + 问题图片:[[CFSelectQuestion.images]]
 *  + 图片位置:[[CFSelectQuestion.imgPosition]]
 *  + 问题视频:[[CFSelectQuestion.video]]
 *  + 必答标星:[[CFSelectQuestion.asterisks]]
 *  + 问题编号:[[CFSelectQuestion.number]]
 *  + 错误消息:[[CFSelectQuestion.errorMessage]]
 *  + 布局风格参照:[[CFSelectQuestion.layout]]
 *  + 只读模式: [[CFSelectQuestion.readonly]]
 *
 *
 * 2. 普通选项,各种不同的题目的普通选项形态各异,会在各自的题目中单独说明
 *  + [[CFSelectQuestion.options]]是一个数组,其中的每一项是[[CFOption]]类型
 *     遍历该数组渲染出选项列表,需要渲染的内容请参考[[CFOption]]中的各种属性说明
 *
 *  + 当某个选项被答题者点击以后,需要回调[[CFUIEventHandler.handleOptionClick]]方法
 *
 *  + 选中与否是由[[CFOption.selected]]属性来表明的来表明的,选中和未选中的选项再UI上应该
 *     使用不同的方式展现
 *
 *  + 关注[[CFOption.inputType]]属性,该属性决定了选项可能是有三种状态的:
 *    1.纯选择选项:select
 *    2.纯输入选项:input
 *    3.选择+输入的选项:select-input
 *
 *    选择题的普通选项值只可能有上述的所说的`纯选择选项`和`选择+输入的选项`两种形态
 *    如果是`纯选择选项`的,根据上面所描述的答题者点击后,调用回调,选中和未选中的选项使用不同的
 *    的展现方式展现出来即可
 *
 *    如果`选择+输入的选项`:则选项被选中后,还需为该选项渲染一个额外的输入框,允许答题者输入额外的
 *    备注内容,当答题者输入内容时,应该回调[[CFUIEventHandler.handleOptionClick]]方法
 *
 * 3. 其他选项:所有题目的其他选项都是一样性质的,这里做详细说明
 *  + [[CFSelectQuestion.otherOptions]]是一个数组,其中的每一项是[[CFOption]]类型
 *     遍历该数组渲染出选项列表,需要渲染的内容请参考[[CFOption]]中的各种属性说明
 *  + 关注[[CFOption.inputType]]属性,该属性决定了选项可能是有三种状态的:
 *
 *    1.纯选择选项:select
 *      + 渲染与事件回调参照普通选项中的说明
 *
 *    2.纯输入选项:input
 *      + 渲染成一个输入框,输入内容时回调[[CFUIEventHandler.handleOptionInput]]方法
 *
 *    3.选择+输入的选项:select-input
 *      + 渲染与事件回调参照普通选项中的说明
 *
 * 4. 布局风格
 *   + [[CFSelectQuestion.layout]]里面有很多布局相关的设置,可以选择性的参考一下.
 *
 * 5. 总结,上述都是常规的建议,至于UI想怎么渲染,完全是UI的自由,UI上也不一定要全部渲染出上述的
 * 所有内容,但是有几个部分是非常重要的,无论如何也不能少的,在下面说明:
 *  + 无论你的UI怎么渲染,必须要让用户能选中选项或对某个选项进行输入,具体以什么操作选中或输入
 *    都无所谓
 *  + 选中选项和选项输入时,一定主要正确回调核心包[[CFUIEventHandler]]中提供的各个回调函数
 *  + UI中只能读取核心包中提供的数据,不能更改核心包数据源上的任何内容
 *    这点在[强化UI和逻辑分离的概念](#强化UI和逻辑分离的概念)中有更详细的解释.
 *
 * 其他细节参照API中的各个属性的注释,多看才能了解更深入.
 */
interface CFSelectQuestion extends ICFMultiSelectNodeMixin, CFSubjectQuestion {
  options: CFValidateOpt[];
}

/**
 * 菜单题
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:选项以下拉菜单的方式渲染出来
 * 在菜单中点击某项后需要回调[[CFUIEventHandler.handleMenuClick]]方法
 *
 * 其他选项的渲染方式和选择题一样
 */
interface CFMenuQuestion extends ICFMenuNode, CFSubjectQuestion {
  options: CFValidateOpt[];
}

/**
 * 级联菜单题
 *
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:级联题的选项不是使用[[CFCascadeQuestion.options]]来渲染
 * 而是使用[[CFCascadeQuestion.cascade]]这个级联数据来渲染,这是一个树形结构.
 *
 * 顶层先使用[[CFCascade.list]]这个数组来渲染一个下拉列表.供答题者选择.
 * 下拉列表中的每项中显示的文字就是[[CFCascade.option]]的文字
 *
 * 当列表项被点击之后需要回调[[CFUIEventHandler.handleCascadeClick]]方法
 *
 * 如果某一项[[CFCascade]]被选中,同时它的选项[[CFCascade.option]]又是`选择+输入`类型的,则需要额外再下拉列表下方为该项显示一个输入框.
 *
 * 当该输入框被输入内容后需要回调[[CFUIEventHandler.handleCascadeInput]]方法
 *
 * 如果某一项[[CFCascade]]被选中,它还有子项[[CFCascade.list]],则还需展示自己的子项下拉列表,供答题者继续往里层选择
 *
 * 然后继续重复上面的规则,一直往里层渲染,一般最多只有三层.
 *
 * 其他选项的渲染规则和选择题一样
 *
 */
interface CFCascadeQuestion extends ICFCascadeNode, CFSubjectQuestion {
  /**
   * 级联菜单选项,不包括其他选项
   * 此道题的选项UI不需要渲染,而是转为渲染[[CFCascadeQuestion.cascade]]属性
   */
  options: CFCascadeOption[];
  /**
   * 级联层级关系,UI需要根据该数据渲染出多级列表供答题者选择
   */
  cascade: CFCascade;
  /**
   * 级联变量引用映射表
   * @ignore
   */
  casVarMaps: ICFVarMapItem[];
  /**
   * 缓存的级联组菜单节点解析后的选项结果
   * 由于同一个组内菜单节点会被分析多次
   * 但是希望每次在相同条件下分析得到的结果一样
   * 为了解决随机抽取和随机顺序所导致的不确定性
   * 使用了缓存策略
   * 如果该级联题重新生成,则缓存会重开.
   * @ignore
   */
  cachedCasMenuOpts: { [key: string]: CFOption[] };
}

/**
 * 素材展示页面
 *
 * 没有选项，其他方面同选择题[[CFSelectQuestion]]
 *
 *
 */
interface CFDescribePage extends CFQuestion, ICFValidationNodeMixin, CFMediaNodeMixin { }

/**
 * 结束页面
 *
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:结束页面没有选项,不需要渲染.
 *
 * 如果由[[CFEndPage.qrCode]]属性有值,需要把这个值渲染成二维码
 * 并提示,微信扫描这个二维码可以领取奖励.
 *
 * 如有自定以logo信息,也需要渲染
 *
 */
interface CFEndPage extends ICFEndNode, CFQuestion, CFMediaNodeMixin {
  /**
   * 是否携带奖励
   * @ignore
   */
  useReward: boolean;
  /**
   * 是否中奖
   * @ignore
   */
  hasReward: boolean;
  /**
   * 自定义logo文字
   */
  logoText: string;
  /**
   * 自定义logo图片地址
   */
  logoImage: string;
  /**
   * 领奖二维码
   */
  qrCode: string;
}

/**
 * 抽奖题目
 *
 * 主要用于渲染抽奖结果
 *
 * 具体查看各个属性的说明
 *
 * 如果有[[CFLotteryPage.qrCode]]属性,则需要将他渲染成二维码,并提示用户微信扫描二维码可以领奖
 */
interface CFLotteryPage extends ICFLotteryNode, CFQuestion {
  /**
   * 中奖节点id
   * @ignore
   */
  rewardNodeId: string;
  /**
   * 二维码信息,如有值,则需要渲染成二维码,并提示微信扫码可领取奖励.
   */
  qrCode: string;
  /**
   * 跳转链接
   * @ignore
   */
  linkUrl: string;
  /**
   * 结束按钮文字
   * @ignore
   */
  endBtnText: string;
  /**
   * 是否已中奖
   * @ignore
   */
  goal: boolean;
  /**
   * 活动名称
   */
  activityName: string;
  /**
   * 奖励名称
   */
  rewardName: string;
  /**
   * 奖励时间
   */
  rewardTime: string;
  /**
   * 奖励数量
   */
  rewardCount: number;
  /**
   * 奖励图片
   */
  rewardImage: CFImageInNode;
  /**
   * 奖励标题
   */
  rewardTitle: string;
  /**
   * 奖项描述
   */
  rewardDescribe: string;
  /**
   * 奖项列表
   */
  rewardList: ICFRewardItem[];
}

/**
 * 手动定位题
 *
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:手动定位题的选项和其他选项都不要渲染出来
 *
 * 而是,渲染出[[CFRegionQuestion.regions]]中的省市县下拉列表,让答题者选择省市区.
 *
 * 要考虑[[CFRegionQuestion.infoRange]]属性,它决定询问地区的级别,则只渲染到该级别的列表.
 *
 * 答题者选择地区列表后,需要回调[[CFUIEventHandler.handleManualLocate]]方法
 */
interface CFRegionQuestion extends CFSubjectQuestion {
  /**
   * 结果值
   * 这些题在定位成功后,会把定位结果放到该属性中
   * 这时候UI可以按需要渲染该属性让答题者看到定位结果
   */
  value: string;
  /**
   * 占位符
   */
  placeholder: string;
  /**
   * 地域列表,需要将这几层地域信息渲染成一个多层列表供答题者选择
   */
  regions: CFRegionProvince[];
  /**
   * 定位结果
   * @ignore
   */
  position?: CFMapLocation;
  /**
   * 手动定位索引列表
   */
  indexes: string;
  /**
   * 地域等级
   */
  infoRange: REGION_RANGE;
}

/**
 * 自动定位题
 *
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:自动定位题的选项和其他选项都不要渲染
 *
 * 而是渲染一个按钮,让用户点击该按钮自动定位
 *
 * 定位功能需要UI自己准备,一般可以使用百度地图,谷歌地图等定位api
 *
 * 当定位成功以后,需要回调[[CFUIEventHandler.handleAutoLocate]]方法
 * 调用该回调方法之后[[CFLocationQuestion.value]]的值会变成定位后的地址
 * UI需要渲染出这个地址.
 *
 *
 * 当定位失败以后,需要回调[[CFUIEventHandler.handleLocateFailed]]方法.
 *
 */
interface CFLocationQuestion extends CFRegionQuestion {
  /**
   * 是否定位失败并可以跳过
   * @ignore
   */
  failedSkip: boolean;
  /**
   * 是否开启了定位失败并可以跳过的功能
   * @ignore
   */
  failedSkipActivated: boolean;
  /**
   * 是否定位失败,UI需要渲染出失败状态
   */
  failed: boolean;
  /**
   * 是否定位成功,UI需要渲染出失败状态
   */
  succeed: boolean;
}

/**
 * 范围定位题
 *
 * 使用自动定位题[[CFLocationQuestion]]一样的方式渲染
 */
interface CFAreaQuestion extends CFLocationQuestion {
  /**
   * 地域范围匹配选项
   * 这些选项在UI中无需被渲染
   */
  options: CFAreaOption[];
}

/**
 * 图片选择题目
 *
 * 使用选择题[[CFSelectQuestion]]一样的方式渲染
 * 特殊点:选项中包含图片,需要额外渲染
 */
interface CFSelectImageQuestion extends CFSelectQuestion {
  /**
   * 图片选择选项列表,包含其他选项
   */
  options: CFSelectImageOption[];
  /**
   * 图片适应方式
   */
  picFitType: PIC_FIT_TYPE;
  /**
   * 是否开启图片缩放
   */
  optImgScale: boolean;
}

/**
 * 上传题
 *
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点:上传题的每个选项不是用于选择的
 * 而是用于点击后上传文件,被点击后需要调用[[CFUIEventHandler.handleOptionClick]]方法,这样会触发文件文件选择
 * 当选择好文件后,上传结果会放到[[CFUploadOption]]中,包含图片,文件描述的内容,可以将这些内容渲染到选项中
 *
 * 如果你要清除已上传的内容,可以在选项中渲染一个删除按钮,点击后调用[[CFUIEventHandler.handleOptionInput]]方法
 * 第一个参数设置为null,即可清空内容.
 *
 * 其他选项的渲染方式和选择题一样
 */
interface CFUploadQuestion extends CFSubjectQuestion {
  /**
   * 上传题选项
   */
  options: CFUploadOption[];
  /**
   * @ignore
   */
  fullUploaded: boolean;
  /**
   * 是否有上传数目限制
   * @ignore
   */
  limitEnabled: boolean;
  /**
   * 最小上传限制数
   * @ignore
   */
  minUploadCount: string | number;
  /**
   * 最大上传限制数
   * @ignore
   */
  maxUploadCount: string | number;
}

/**
 * 最大差分任务中的项目
 */
interface CFMaxDiffTaskItem {
  /**
   * 关联的选项，显示该选项的文字
   */
  option: CFMaxDiffOption;
  /**
   * 评价的分值
   */
  value: MAX_DIFF_VALUE;
  /**
   * 处于第几轮
   */
  round: number;
}

/**
 * 最大差分任务
 */
interface CFMaxDiffTask {
  /**
   * 展示的项目列表
   */
  items: CFMaxDiffTaskItem[];
  /**
   * 该任务是否已完成做答
   */
  done: boolean;
}

/**
 * MaxDiff问题
 * 基本内容请参考选择题[[CFSelectQuestion]]
 *
 * 特殊点：
 *
 *
 * MaxDiff问题不直接渲染选项，而是渲染任务:其中总任务列表时[[CFMaxDiffQuestion.tasks]]，不直接渲染这个列表，
 *
 * 而是像连续评价题一样一次只显示一个任务卡片[[CFMaxDiffQuestion.currentTask]]。
 *
 * 卡片展示成下面这样：
 *
 * |最喜欢||最不喜欢|
 * | :-:| :-:| :-:|
 * |○|宝马|○|
 * |○|雪佛兰|○|
 * |○|奔驰|○|
 * |○|凯迪拉克|○|
 *
 * 其中头部是正向和反向评价说明文字，分别使用[[CFMaxDiffQuestion.positiveDesc]]和[[CFMaxDiffQuestion.negativeDesc]]渲染
 *
 * 中间是项目文字，使用[[CFMaxDiffTaskItem.option]]的text渲染，如果有[[CFMaxDiffTaskItem.option]]的image，则图片也许渲染
 *
 *
 * 当在这个任务卡片上进行作答时，回到[[CFUIEventHandler.handleMaxDiffInput]]方法，当选择左侧的checkbox是传1作为值，
 * 选择右侧的checkbox时传-1作为值。
 *
 * 渲染的时候也是当[[CFMaxDiffTaskItem.value]]为1时，左侧checkbox被选中，如果为-1时，右侧checkbox被选中。
 *
 * 由于一个MaxDiff问题包含多一个任务页，所以需要提供切换任务的功能
 *
 * 1. 渲染当前[[CFMaxDiffQuestion.currentTask]]任务卡片
 *
 * 2. 渲染`上一页`,`下一页`按钮，点击后分别调用[[CFMaxDiffQuestion.gotoPrevTask]]方法或[[CFMaxDiffQuestion.gotoNextTask]]方法来要求
 * 核心包切换当前任务, [[CFMaxDiffQuestion.gotoTask]]跳转到指定的任务。
 *
 * 3. 同时像连续评价题一样显示当前是几分之几项如：1/6，每次切任务后更新进度。当前索引可以到靠查询当前任务在总任务中的位置获取到。
 *
 */
interface CFMaxDiffQuestion extends CFSubjectQuestion, ICFMaxDiffNode {
  /**
   * 要展示的最大差分任务列表
   */
  tasks: CFMaxDiffTask[];
  /**
   * 当前页的任务
   */
  currentTask: CFMaxDiffTask;
  /**
   * 要求核心包切换到上一页
   */
  gotoNextTask(): void;
  /**
   * 要求核心包切换到下一页
   */
  gotoPrevTask(): void;
  /**
   * 要求核心包切换到某一页
   */
  gotoTask(task: CFMaxDiffTask): void;
  options: CFMaxDiffOption[];
}

/**
 * 数据节点
 * @ignore
 */
interface ICFDataHub extends ICFSubjectNode, CFSubjectQuestion {
  options: ICFDataOption[];
}

/**
 * 虚拟循环题
 * @ignore
 */
interface ICFLoopHub extends ICFLoopNode, CFQuestion , ICFOptNodeMixin{
  /**
   * 包含的循环变量列表
   */
  varList: ICFLoopVar[];
}

/**
 * 虚拟随机题
 * @ignore
 */
interface ICFRandomHub extends ICFRandomNode, CFQuestion {
  origin: ICFRandomNode;
}

/**
 * 虚拟奖励问题
 * @ignore
 */
interface ICFGiftHub extends ICFGiftNode, CFQuestion {
  /**
   * 是否获取短信失败
   */
  messageGetFailed: boolean;
}

/**
 * @ignore
 * 虚拟逻辑题
 */
interface ICFLogicHub extends ICFLogicNode, CFQuestion {
  logicResult: boolean;
}
//#endregion
