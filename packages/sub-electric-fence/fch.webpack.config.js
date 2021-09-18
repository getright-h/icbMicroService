const path = require('path')
const forFileName = ".min";
module.exports = {
    entry: {
        index: './src/index.tsx',
        indexSimple: './src/index.simple.tsx'
    },
    plugins: [
        {
            plugin: 'html-webpack-plugin',
            option: {
                template: process.argv[2] == '--build' ? path.resolve(__dirname, './public/index.html') : path.resolve(__dirname, './public/indexMap.html'),
                title: '风控三期',
                chunks: ['index']
            }
        },
        {
            plugin:'html-webpack-plugin',
            option: {
                filename: 'user-action-report-component.html',
                template: path.resolve(__dirname, './public/index.simple.html'),
                title: '今日用车报告',
                chunks: ['indexSimple']
            }
        }
    ],
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