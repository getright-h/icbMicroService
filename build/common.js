const path = require('path');
const fs = require("fs");

const util = require("util");


function runExec(type, action) {
    const spawn = require("child_process").spawn;
    const allApp = path.resolve();
    const appDir = fs.readdirSync(allApp).filter((dir) => /sub|master*/.test(dir));

    appDir.forEach((dir) => {
        let projectPath = path.resolve(dir);
        console.log(`开始${action} ${dir}`);
        const {stdout} = spawn(`yarn`, [type], {cwd: projectPath});
        stdout.on("data", (data) => {
            console.log(data.toString()); 
        })
        
    })
    // await exec('start chrome http://localhost:8080/');
}

module.exports = {
    runExec
}