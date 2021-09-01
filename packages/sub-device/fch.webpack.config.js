const path = require('path')
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const forFileName = ".min";
module.exports = {
    chainWebpack: (chain) => {
        chain
            .plugin("WebpackCdnPlugin")
            .use(WebpackCdnPlugin, [{
                prodUrl: 'https://staticcdn.i-cbao.com/globcdn/:name/:path',
                modules: [{
                        name: 'react',
                        var: 'React',
                        path: `16.14.0/react.${process.env.NODE_ENV}${forFileName}.js`
                    },
                    {
                        name: 'react-dom',
                        var: 'ReactDOM',
                        path: `16.14.0/react-dom.${process.env.NODE_ENV}${forFileName}.js`
                    },
                    {
                        name: 'react-router',
                        var: 'ReactRouter',
                        path: `5.2.0/react-router${forFileName}.js`
                    },
                    {
                        name: 'axios',
                        var: 'axios',
                        path: `0.21.1/axios${forFileName}.js`
                    },
                ],
                pathToNodeModules: path.join(process.cwd(), "../../") + "",
            }])
            .end()
    }
}