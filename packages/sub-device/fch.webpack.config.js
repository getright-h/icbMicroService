const path = require('path')
module.exports = {
    mergeCoustomConfig: () => ({
        customizeArray: (a, b , key) => {
            // a 是webpack原本的配置 b是后来在chain上更改过的webpack配置
            if(key == "plugins") {
                let returnArray = [];
                a = [...a, ...b].map(element => {
                    if(element.constructor && element.constructor.name == "WebpackCdnPlugin") {
                        element.pathToNodeModules = path.join(process.cwd(), "../../")
                        return element
                    } else {
                        return element
                    }
                });
                return a;     
            }
            return undefined;
        }
    }),
}