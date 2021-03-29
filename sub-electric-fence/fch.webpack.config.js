const path = require('path')
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
    ]
}