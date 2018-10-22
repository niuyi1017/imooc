const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry:[
    './src/app.js'
  ],
  output:{
    path: path.resolve(__dirname,'./build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader','sass-loader']
      },
      { 
        test: /\.(png|jpg)$/, 
        use: {
          loader:'url-loader',
          // name: '[name]-aaa.[ext]',
        }
      }
    ]
  }
}