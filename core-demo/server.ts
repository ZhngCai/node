// const Koa = require('koa'),
// app = new Koa();
// app.use(async (ctx: any) => {
//   ctx.body = 'Hello World1';
// });

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
}





addReadLineListener();

ReaLine.on('pause', () => {
  console.log('Readline paused.');
});

export default addReadLineListener
// 监听端口、启动程序
// app.listen(3000, (err: any) => {
//  if (err) throw err;
//  console.log('服务器启动在3000端口');
// })