import { start } from "./src/util";

const readline = require('readline');
let ReaLine:any;
export  const addReadLineListener = ()=>{
  ReaLine = readline.createInterface({
    input: process.stdin,
    // output: process.stdout
  });
  ReaLine.on('line', (input:any) => {
    if(input==='答题'|| input==='DT'){
      start()
      ReaLine.close()
    }
  });
  ReaLine.on('pause', () => {
    // console.log('Readline paused.');
  });
}

// const inquirer = require("inquirer");
// const questions = [
//   {
//     type: 'input',
//     name: 'first_name',
//     message: "What's your first name",
//   },
//   {
//     type: 'input',
//     name: 'last_name',
//     message: "What's your last name",
//     default() {
//       return 'Doe';
//     },
//   },
// ];

// inquirer.prompt(questions).then((answers:any) => {
//   console.log(JSON.stringify(answers, null, '  '));
// });

addReadLineListener();



export default addReadLineListener