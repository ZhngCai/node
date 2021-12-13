import question from ".";
import addReadLineListener from "../../server";
import { IDealAnswer } from "./type";


class QStart {
    data!:CFFillQuestion;
    constructor() {}
    // 处理开始节点回答
    async dealStartAnswer(answer:string):Promise<IDealAnswer>{
        // 退出
       if(answer==='Q'){
           addReadLineListener()
           return {status:false,message:'退出答题'}
       };
       // 开始答题
       if(answer==='S')return {status:true,message:''};
       await question.startAnswer() ;
       return {status:false,message:''};
   }
}


const qStart = new QStart();
export default qStart;