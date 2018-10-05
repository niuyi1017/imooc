const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLPlugin = require('html-webpack-plugin') 
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV ==='development'
const config = {
    target:'web',
    entry: path.resolve(__dirname,'src/index.js'),
    devServer:{
        contentBase:'./dist'
    },
    output:{
        filename:'bundle.[hash:8].js',
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
            // {
            //     test: /\.css$/,
            //     use: [
            //         'vue-style-loader',                //可以不要
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            
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
    config.module.rules.push(
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
    )
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
}else{
    config.entry = {
        app: path.resolve(__dirname, 'src/index.js'),
        vendor:['vue']
    }
    config.mode = 'production',
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
                test:/\.styl/,
                
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            
                        }
                    },
                    'stylus-loader'
                    ]

                })
    config.plugins.push(
        new MiniCssExtractPlugin({
           filename:'styles.[contenthash:8].css'
        }))
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2, maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: true
    }

}
module.exports = config;