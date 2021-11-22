// import MessageFormat from 'messageformat';
import { jsDocument } from '../../../jsdom';
// import UAParser from 'ua-parser-js';
// export const UAParsed = UAParser();
/**
 * 翻译工具
 */
// const mf = new MessageFormat();

function createDivElement() {
  let divDom = jsDocument.createElement('div')
    if(!divDom.__proto__.hasOwnProperty('innerText')){
      Object.defineProperties(
        divDom.__proto__,
        {
            innerText:{
                enumerable: true,
                get:function(){
                    return this.textContent
                },
                set:function(arg){
                    this.textContent = arg;
                    this.innerText = arg
                }
            }
        }
      )
    }
    let spanDom = jsDocument.createElement('span')
    if(!spanDom.__proto__.hasOwnProperty('innerText')){
      Object.defineProperties(
        spanDom.__proto__,
        {
            innerText:{
                enumerable: true,
                get:function(){
                    return this.textContent
                },
                set:function(arg){
                    this.textContent = arg;
                }
            }
        }
      )
    }
    return divDom
}


function createSpanElement() {
    let spanDom = jsDocument.createElement('span')
    if(!spanDom.__proto__.hasOwnProperty('innerText')){
      Object.defineProperties(
        spanDom.__proto__,
        {
            innerText:{
                enumerable: true,
                get:function(){
                    return this.textContent
                },
                set:function(arg){
                    this.textContent = arg;
                }
            }
        }
      )
    }
    return spanDom
}
export const nodeEnvSystem: CFEnvSystem = {
  newDiv(): HTMLElement{
    return createDivElement();
  },
  newSpan():HTMLSpanElement{
    return createSpanElement();
  },
  newTextNode(text:string): Text{
    return jsDocument.createTextNode(text);
  },
  decodeBase64(text): string {
    return atob(text)
  },
};
