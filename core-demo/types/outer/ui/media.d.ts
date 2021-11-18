/**
 * 视频信息
 */
interface CFVideo {
  /**
   * 是否已播放完
   */
  ended: boolean; // anti-readonly
  /**
   * 视频地址
   */
  url: string;
  /**
   * 加载前可用的封面地址
   */
  poster: string;
  /**
   * 是否被使用了
   */
  used: boolean;
}

/**
 * 节点中的图片信息
 */
interface CFImageInNode {
  /**
   * 高宽比列
   */
  ratio?: number;
  /**
   * 无后缀的原始图片地址
   */
  url?: string;
  /**
   * 加后缀的常规尺寸图片地址
   */
  natural?: string;
  /**
   * 加后缀的小图地址
   */
  thumbnail?: string;
  /**
   * 加后缀的大图地址
   */
  large?: string;
  /**
   * 高度
   */
  width: number;
  /**
   * 宽度
   */
  height: number;
  /**
   * @ignore
   */
  reformed?: boolean;
  /**
   * id
   */
  id: string;
  /**
   * 原始图片名称
   */
  originName?: string;
  /**
   * @ignore
   */
  name: string;
  /**
   * @ignore
   */
  type?: string;
}

/**
 * 图片信息
 * @ignore
 */
interface ICFImage {
  fileName: string;
  id: string;
  originHeight: number;
  originWidth: number;
  serverFileName: string;
  reformed: boolean;
  /**
   * 是否被使用了
   */
  used: boolean;
}
