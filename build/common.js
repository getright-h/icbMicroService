const path = require('path');
const fs = require("fs");
const inquirer = require("inquirer");

const util = require("util");

function runExec(type, action) {
    const spawn = require("child_process").spawn;
    const allApp = path.resolve();
    let appDir = fs.readdirSync(allApp).filter((dir) => /sub|master*/.test(dir));
    const promptList = [{
        type: "checkbox",
        message: `选择需要${action}的项目:`,
        name: "projects",
        choices: [...appDir]
    }];
    inquirer.prompt(promptList).then(answers => {
        
        console.log(answers);
        appDir = answers.projects;
        appDir.forEach((dir) => {
            let projectPath = path.resolve(dir);
            console.log(`开始${action} ${dir}`);
            const {stdout} = spawn(`yarn`, [type], {cwd: projectPath, shell: process.platform === 'win32'});
            stdout.on("data", (data) => {
                console.log(data.toString()); 
            })
        })
    })
    // await exec('start chrome http://localhost:8080/');
}

module.exports = {
    runExec
}