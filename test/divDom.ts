import { jsDocument } from ".";

let divDomTestProto = jsDocument.createElement('div').__proto__;


class DivDom extends divDomTestProto {
    get innerText(){
        return this.textContent;
    }
    set innerText(arg){
        this.textContent = arg;
    }
}
const divDom = new DivDom();
export default divDom