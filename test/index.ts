const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const jsWindow = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    
</body>
</html>`).window;
const jsDocument = jsWindow.document;
let divDomTest = jsDocument.createElement('div')
let spanDomTest = jsDocument.createElement('span')
Object.defineProperties(
    divDomTest.__proto__,
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

Object.defineProperties(
    spanDomTest.__proto__,
    {
        innerText:{
            get:function(){
                return this.textContent
            },
            set:function(arg){
               this.textContent = arg;
            }
        }
    }
)


let divDom = jsDocument.createElement('div')
divDom.innerHTML = '<span class="var-tag var-string">123</span>'
console.log(
    'innerHTML:>>',divDom.innerHTML + '\n',
    'innerText:>>',divDom.innerText + '\n',
    'textContent:>>',divDom.textContent + '\n'
);
let spanTag = divDom.querySelectorAll(".var-tag")[0];
spanTag.innerHTML = '123'
console.log(
    'innerHTML:>>',spanTag.innerHTML,
    'innerText:>>',spanTag.innerText,
    'textContent:>>',spanTag.textContent
);

spanTag.innerText = 'abc'
console.log(
    'innerHTML:>>',spanTag.innerHTML,
    'innerText:>>',spanTag.innerText,
    'textContent:>>',spanTag.textContent
);

export {
    jsWindow,
    jsDocument
}