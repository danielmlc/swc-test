const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // 入口文件路径
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'bundle.js', // 输出文件名
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')()
                ]
              }
            }
          },
          'less-loader'
        ],
        sideEffects: true
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(jsx?|js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: "swc-loader"
        }
      }
    ],
   
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'), // 指定模板文件
      filename: 'index.html', // 生成的HTML文件名
    }),
  ],
  resolve: {
    extensions: ['.js', '.vue'], // 可以省略的扩展名
    alias: {
      '@': path.resolve(__dirname, 'src'), // 用于导入模块时的别名
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true, // 启用 gzip 压缩
    port: 8080, // 服务器端口
    hot: true, // 启用热重载
    open: true, // 自动打开浏览器
  },
};
