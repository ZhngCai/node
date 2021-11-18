import MessageFormat from 'messageformat';
import { jsDocument } from '../../../jsdom';
// import UAParser from 'ua-parser-js';
// export const UAParsed = UAParser();
/**
 * 翻译工具
 */
const mf = new MessageFormat();

export const nodeEnvSystem: CFEnvSystem = {
  // device: UAParser(),
  newDiv(): HTMLElement{
    return jsDocument.createElement('div');
  },
  newSpan():HTMLSpanElement{
    return jsDocument.createElement('span')
  },
  newTextNode(text:string): Text{
    return jsDocument.createTextNode(text);
  },
  decodeBase64(text): string {
    return atob(text)
  },
};
