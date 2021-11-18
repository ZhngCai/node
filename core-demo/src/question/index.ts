import addReadLineListener from "../../server";
import cfSurvey from "../survey";
import QTip from "./tip";

const inquirer = require("inquirer");


interface IInquirerJson{
    [p : string]:any
}

interface IDealAnswer{
    status:boolean;
    message:string
}


class Question {
    constructor() {}
    // 答题
    //TODO 目前先渲染一个题目
    inquirerPrompt(data:CFQuestion){
        const inquirerJson = this.getInquirerJson(data);
        if(!inquirerJson){
            console.log("==============end==============");
            addReadLineListener()
            return;
        }
        inquirer.prompt([inquirerJson]).then(async (result:any)=>{
            // 用户输入的结果最终会在这里输出
            const {answer} = result;
            const quest = cfSurvey.survey.nodes[0];
            await this.dealAnswer(answer,<CFSubjectQuestion>quest,quest.type);
        });
    }
    // 获得选项
    getInquirerJson(data:CFQuestion):IInquirerJson | undefined{
        let prev = ''
        if(data.prev){
            prev = QTip.pre+','
        }
        switch (data.type) {
            case NODE_TYPE.FILL:
                return {
                    type:'input',
                    message:`${data.title}\n(${QTip.quit},${prev}${QTip.next})`,
                    name:'answer',
                }
            case NODE_TYPE.SELECT:
                let optionMessage = '\n';
                const subQuest = <CFSubjectQuestion>data;
                subQuest.options.forEach((res:CFOption,index:number)=>{
                    optionMessage+= index+') '+res.text +'\n'
                })
                return {
                    type: 'input',
                    message:`${data.title}\n(${QTip.quit},${prev}${QTip.next})${optionMessage}`,
                    name:'answer',
                }
            default:
                return ;
        }
    }
    // 开始答题
    async startAnswer(){
        const suvery: CFStartState = await cfSurvey.getStartSurvey();
        const inquirerJson = {
            type:"input",
            message:`${suvery.title}\n(${QTip.quit},${QTip.start})`,
            name:'start',
        }
        const result = await inquirer.prompt([inquirerJson]);
        // 用户输入的结果最终会在这里输出
        const start = result.start;
        // 处理结果
        const dealResult =await this.dealStartAnswer(start);
        if(!dealResult.status){
            console.log(`============${dealResult.message}============`);
            return;
        }
        await cfSurvey.getAnswerSurvey()
        //TODO 目前先渲染一个题目
        this.inquirerPrompt(cfSurvey.survey.nodes[0])
    }

    // 处理答案
    async dealAnswer(answer:string,quest:CFSubjectQuestion,type:NODE_TYPE){
        const dealResult = await this.dealTipAnswer(answer,quest)
        if(!dealResult.status){
            console.log(`============${dealResult.message}============`);
            return;
        }
        
        if(type === NODE_TYPE.FILL){
            await cfSurvey.survey.handleEvents.handleOptionInput!(answer,quest.options[0],quest);
        }else if(type === NODE_TYPE.SELECT){
            const num=parseInt(answer);
            if(isNaN(num)||num>quest.options.length||num<0){
                console.log('--------------请输入正确的序号--------------');
                const prevNode = cfSurvey.survey.nodes[0].parent.nodes[0]
                this.inquirerPrompt(prevNode)
                return;
            }
            const opt = quest.options[num];
            //下一题
            await cfSurvey.survey.handleEvents.handleOptionClick!(opt,quest)
        }
        await cfSurvey.survey.handleEvents.handleNextClick!();
        this.inquirerPrompt(cfSurvey.survey.nodes[0])
    }
    // 处理开始节点回答
    async dealStartAnswer(answer:string):Promise<IDealAnswer>{
        
         // 退出
        if(answer==='Q'){
            addReadLineListener()
            return {status:false,message:'退出答题'}
        };
        // 开始答题
        if(answer==='S')return {status:true,message:''};
        await this.startAnswer() ;
        return {status:false,message:''};
    }
    // 处理输入回答
    async dealTipAnswer(answer:string,quest:CFSubjectQuestion):Promise<IDealAnswer>{
        // 退出
        if(answer==='Q'){
            addReadLineListener()
            return {status:false,message:'退出答题'}
        };
        // 上一题
        if(answer==='P'&&quest.prev){
            await cfSurvey.survey.handleEvents.handlePrevClick!();
            this.inquirerPrompt(cfSurvey.survey.nodes[0])
            return {status:false,message:''};;
        }
        // 下一题
        if(answer==='N'){
            await cfSurvey.survey.handleEvents.handleNextClick!();
            this.inquirerPrompt(cfSurvey.survey.nodes[0])
            return {status:true,message:''};
        }
        return {status:true,message:''};
    }
}

const question = new  Question();
export default question;