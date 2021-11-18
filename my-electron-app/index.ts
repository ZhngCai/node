const { app, BrowserWindow } = require('electron')
const path = require('path')
const inquirer = require("inquirer");

const questions = [
  {
    type: 'input',
    name: 'first_name',
    message: "What's your first name",
  },
];

inquirer.prompt(questions).then(answers => {
  console.log('window=>>>>>>>',window);
  
  console.log(JSON.stringify(answers, null, '  '));
});
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

