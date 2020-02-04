const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'index': './src/index/index.js',
    'login': './src/login/index.js',
  	'weipage/index': './src/weipage/index/index.js',
    'weipage/editMobile': './src/weipage/editMobile/index.js',
    'weipage/list': './src/weipage/list/index.js',
    'weipage/view': './src/weipage/view/index.js',
    'weipage/mobile': './src/weipage/mobile/index.js',
    'weipage/upload': './src/weipage/upload/index.js'
  },
  devtool: 'inline-source-map',
  plugins: [
      new webpack.DefinePlugin({
        'process.evn':{
          NODE_ENV:"Development"
        }
      }),
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname, './')
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, ".", "./src/index/index.html"),
        chunks: ["index"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "login.html",
        template: path.resolve(__dirname, ".", "./src/login/index.html"),
        chunks: ["login"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "weipage/index.html",
        template: path.resolve(__dirname, ".", "./src/weipage/index/index.html"),
        chunks: ["weipage/index"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "weipage/editMobile.html",
        template: path.resolve(__dirname, ".", "./src/weipage/editMobile/index.html"),
        chunks: ["weipage/editMobile"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "weipage/list.html",
        template: path.resolve(__dirname, ".", "./src/weipage/list/index.html"),
        chunks: ["weipage/list"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "weipage/view.html",
        template: path.resolve(__dirname, ".", "./src/weipage/view/index.html"),
        chunks: ["weipage/view"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "weipage/mobile.html",
        template: path.resolve(__dirname, ".", "./src/weipage/mobile/index.html"),
        chunks: ["weipage/mobile"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "weipage/upload.html",
        template: path.resolve(__dirname, ".", "./src/weipage/upload/index.html"),
        chunks: ["weipage/upload"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new webpack.ProvidePlugin({ $: "jquery" }),
      new uglify()
  ],
  output: {
    filename: '[name].bundle.js',
    path:__dirname + '/dist',
		publicPath: '/dist/'
  },  
  devServer: {
    contentBase: __dirname
  },
  module: {
     rules: [
        {
          test: /\.vue$/,
          use: ['vue-loader']
        },
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: ['html-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }]
        },
       {
          test: require.resolve('jquery'),
          use: [{
              loader: 'expose-loader',
              options: 'jQuery'
          },{
              loader: 'expose-loader',
              options: '$'
          }]
        },
        {
          test: require.resolve('vue'),
          use: [{
              loader: 'expose-loader',
              options: 'Vue'
          }]
        }
     ]
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'assets/'),
      '@config': path.resolve(__dirname, 'config/'),
      '@plugin': path.resolve(__dirname, 'plugin/'),
      '@src': path.resolve(__dirname, 'src/')
    }
  }
};