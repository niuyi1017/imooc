const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLPlugin = require('html-webpack-plugin') 
const webpack = require('webpack')

const isDev = process.env.NODE_ENV ==='development'
const config = {
    target:'web',
    entry: path.resolve(__dirname,'src/index.js'),
    devServer:{
        contentBase:'./dist'
    },
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                use: ['vue-loader'],
               
            },
            {
                test: /\.jsx$/,
                use: ['babel-loader'],

            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',                //可以不要
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test:/\.gif|jpg|jpeg|svg|png$/,
               use:{
                   loader:'url-loader',
                   options:{
                       limit:1024,
                       name:'[name]-aaa.[ext]',
                   }
               }

            }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new HTMLPlugin()

    ],
  
   
}

if(isDev){
    config.devtool = "#cheap-moudule-eval-source-map"
    config.mode= 'development',
    config.devServer = {
        port:'8000',
        host:'127.0.0.1',
        overlay:{
            errors:true
        },
        hot:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config;