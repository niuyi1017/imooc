const path = require('path')
const { VueLoaderPlugin } = require('vue-loader');  
module.exports = {
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
                test: /.vue$/,
                use: ['vue-loader'],
               
            },
            {

                test: /\.css$/,

                use: [

                    'vue-style-loader',                //可以不要

                    'style-loader',

                    'css-loader'

                ]

            },
        ]
    },
    plugins: [

        new VueLoaderPlugin()

    ],
  
   
}