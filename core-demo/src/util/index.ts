import { Core,EventHub } from "../node";
import question from "../question";

const host = {
    sentryKey: 'https://c2a21df7b3794fc6a8854f0a51e0e790@sentry.choiceform.io/8',
    recordUrl: 'https://tracking.choiceform.io/api/records',
    host: 'https://osapi.choiceform.io',
    wsHost: 'wss://osapi.choiceform.io',
    cdnHost: 'https://media.choiceform.io',
    publicHost: 'https://public.choiceform.io',
    dictUrl: 'https://media.choiceform.io/os-editor/assets/UploadFiles/Dictionary/Dictionary.js',
  }
  
  
export const start = async ()=>{
    Core.reset();
    const data = {
      useWxSdk: true,
      hostConfig:host,
      notify:(message: string)=>{
        console.log('notify:>>>>>>',message);
        
      },
      alert:(message: string)=>{},
      error:(message: string)=>{
        console.log('error:>>>>>>',message);
      },
    };
    await Core.setup(data);
    await question.startAnswer();
  }
  
