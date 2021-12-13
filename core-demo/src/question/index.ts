/** @format */

import addReadLineListener from "../../server";
import cfSurvey from "../survey";
import qFill from "./fill";
import qIconMark from "./icon-mark";
import qMenu from "./menu";
import qSelect from "./select";
import qStart from "./start";
import QTip from "./tip";
import { IDealAnswer } from "./type";
import qUpload from "./upload";
import qValueMark from "./value-mark";
import qVerify from "./verify";

const inquirer = require("inquirer");

interface IInquirerJson {
  [p: string]: any;
}

class Question {
  type!: NODE_TYPE;
  optionType!: OPTION_GROUP_CHILD_TYPE;
  constructor() {}
  /**
   * 答题
   * @param data
   * @returns
   */
  //TODO 目前先渲染一个题目
  inquirerPrompt() {
    let data: CFQuestion = cfSurvey.survey.nodes[0];
    // debugger;
    const inquirerJson = this.getInquirerJson(data);
    if (!inquirerJson) {
      console.log("==============end==============");
      addReadLineListener();
      return;
    }
    inquirer.prompt([inquirerJson]).then(async (result: any) => {
      // 用户输入的结果最终会在这里输出
      const { answer } = result;
      const quest = cfSurvey.survey.nodes[0];
      await this.dealAnswer(answer, quest, quest.type);
    });
  }
  // 获得选项
  getInquirerJson(data: CFQuestion): IInquirerJson | undefined {
    this.type = data.type;
    switch (data.type) {
      case NODE_TYPE.FILL:
        qFill.data = <CFFillQuestion>data;
        return {
          type: "input",
          message: qFill.getMessage(),
          name: "answer",
        };
      case NODE_TYPE.SELECT:
        qSelect.data = <CFSelectQuestion>data;
        return {
          type: "input",
          message: qSelect.getMessage(),
          name: "answer",
        };
      case NODE_TYPE.MENU:
        qMenu.data = <CFMenuQuestion>data;
        return {
          type: "input",
          message: qMenu.getMessage(),
          name: "answer",
        };

      case NODE_TYPE.ICON_MARK:
        qIconMark.data = <CFIconMarkQuestion>data;
        return {
          type: "input",
          message: qIconMark.getMessage(),
          name: "answer",
        };
      case NODE_TYPE.VALUE_MARK:
        qValueMark.init(<CFValueMarkQuestion>data);
        return {
          type: "input",
          message: qValueMark.getMessage(),
          name: "answer",
        };
      case NODE_TYPE.UPLOAD:
        qUpload.init(<CFUploadQuestion>data);
        return {
          type: "input",
          message: qUpload.getMessage(),
          name: "answer",
        };
      case NODE_TYPE.VERIFY:
        qVerify.init(<CFVerifyQuestion>data);
        return {
          type: "input",
          message: qVerify.getMessage(),
          name: "answer",
        };
      default:
        return;
    }
  }
  // 开始答题
  async startAnswer() {
    const suvery: CFStartState = await cfSurvey.getStartSurvey();
    const inquirerJson = {
      type: "input",
      message: `${suvery.title}\n(${QTip.quit},${QTip.start})`,
      name: "start",
    };
    const result = await inquirer.prompt([inquirerJson]);
    // 用户输入的结果最终会在这里输出
    const start = result.start;
    // 处理结果
    const dealResult = await qStart.dealStartAnswer(start);
    if (!dealResult.status) {
      console.log(`============${dealResult.message}============`);
      return;
    }
    await cfSurvey.getAnswerSurvey();
    //TODO 目前先渲染一个题目
    this.inquirerPrompt();
  }

  // 处理答案
  async dealAnswer(answer: string, quest: CFQuestion, type: NODE_TYPE) {
    const dealResult = await this.dealTipAnswer(answer, quest);
    if (!dealResult.status) {
      console.log(`============${dealResult.message}============`);
      return;
    }
    if (type === NODE_TYPE.FILL) {
      let option = (<CFFillQuestion>quest).options[0];
      await cfSurvey.survey.handleEvents.handleOptionInput!(
        answer,
        option,
        quest
      );
    } else if (type === NODE_TYPE.SELECT) {
      let option = qSelect.dealAnswer(answer, <CFSelectQuestion>quest);
      if (!option) {
        // 输入格式错误重新答题
        this.inquirerPrompt();
        return;
      }
      //下一题
      await cfSurvey.survey.handleEvents.handleOptionClick!(option, quest);
    } else if (type === NODE_TYPE.MENU) {
      let option = qMenu.dealAnswer(answer, <CFSelectQuestion>quest);
      if (!option) {
        // 输入格式错误重新答题
        this.inquirerPrompt();
        return;
      }
      //下一题
      await cfSurvey.survey.handleEvents.handleOptionClick!(option, quest);
    } else if (type === NODE_TYPE.ICON_MARK) {
      let iconMarkQuest = <CFIconMarkQuestion>quest;
      let _answer = qIconMark.dealAnswer(answer, iconMarkQuest);
      if (!_answer) {
        // 输入格式错误重新答题
        this.inquirerPrompt();
        return;
      }
      await cfSurvey.survey.handleEvents.handleOptionInput!(
        _answer,
        iconMarkQuest.options[0],
        quest
      );
    } else if (type === NODE_TYPE.UPLOAD) {
      let option = (<CFUploadQuestion>quest).options[0];
      await cfSurvey.survey.handleEvents.handleOptionInput!(
        answer,
        option,
        quest
      );
    } else if (type === NODE_TYPE.VERIFY) {
      await qVerify.dealAnswer(answer);
    }
    await cfSurvey.survey.handleEvents.handleNextClick!();
    this.inquirerPrompt();
  }
  // 处理输入回答
  async dealTipAnswer(answer: string, quest: CFQuestion): Promise<IDealAnswer> {
    // 退出
    if (answer === "Q") {
      addReadLineListener();
      return { status: false, message: "退出答题" };
    }
    // 上一题
    if (answer === "P" && quest.prev) {
      await cfSurvey.survey.handleEvents.handlePrevClick!();
      this.inquirerPrompt();
      return { status: false, message: "" };
    }
    // 下一题
    if (answer === "N") {
      await cfSurvey.survey.handleEvents.handleNextClick!();
      this.inquirerPrompt();
      return { status: true, message: "" };
    }
    return { status: true, message: "" };
  }
}

const question = new Question();
export default question;
