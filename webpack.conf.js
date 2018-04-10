const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const px2rem = require('postcss-px2rem')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const autoprefixer = require('autoprefixer')({ browsers: ['iOS >= 7', 'Android >= 4.1'] })
const config = require('./config')
const pxOpts = {
  remUnit: 75,
  threeVersion: true
}

module.exports = env => {
  const {NODE_ENV, VERSION_CODE} = env
  if (NODE_ENV === 'pro' && !VERSION_CODE) {
    throw new Error('please input argv VERSION_CODE')
  }
  const webpackConfig = {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, `${NODE_ENV === 'pro' ? `pro/${VERSION_CODE}` : 'dist'}`),
      filename: 'bundle.js',
      publicPath: NODE_ENV === 'local' ? '/' : NODE_ENV === 'dev' ? '/dist/' : `${config.cdn}${VERSION_CODE}/`,
      chunkFilename: '[hash].[id].chunk.js'
    },
    module: {
      rules: [
      // js,jsx
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'babel-loader?cacheDirectory=true'
            }
          ]
        },
        // css
        {
          test: /\.css$/,
          exclude: /path.resolve(__dirname, node_modules)/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader?minimize',
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [px2rem(pxOpts), autoprefixer]
                }
              }
            ]
          })
        },
        // less
        {
          test: /\.less/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader?minimize',
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [px2rem(pxOpts), autoprefixer]
                }
              },
              'less-loader'
            ]
          })
        },
        // 字体文件
        {
          test: /\.(eot|woff|ttf|woff2|svg)(\?|$)/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'iconfont/[name].[ext]'
              }
            },
            {
              loader: 'svg-inline-loader',
              options: {
                name: 'iconfont/[name].[ext]'
              }
            }
          ]
        },
        // 图片
        {
          test: /\.(png|jpg|gif)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,
                name (file) {
                  if (file.indexOf('/incss') > -1) {
                    return 'cssImg/[name].[ext]'
                  } else {
                    return 'jsImg/[name].[ext]'
                  }
                },
                publicPath (file) {
                  if (file.indexOf('cssImg') > -1) {
                    return `./${file}`
                  } else {
                    return `${config.publicPath}${file}`
                  }
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/template/index.ejs'),
        filename: NODE_ENV === 'local' ? 'index.html' : '../../index.html',
        title: config.title,
        // headScripts: [config.localDll],
        hash: true
      }),
      new ExtractTextPlugin({
        filename: '[name].css'
      })
    ],
    resolve: {
      alias: {
        components: path.join(__dirname, 'src/components'),
        mock: path.join(__dirname, 'src/mock'),
        model: path.join(__dirname, 'src/model'),
        pages: path.join(__dirname, 'src/pages'),
        utils: path.join(__dirname, 'src/utils'),
        public: path.join(__dirname, 'src/public'),
        services: path.join(__dirname, 'src/services')
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'initial', // 必须三选一： "initial" | "all"(默认就是all) | "async"
        minSize: 0, // 最小尺寸，默认0
        minChunks: 1, // 最小 chunk ，默认1
        maxAsyncRequests: 1, // 最大异步请求数， 默认1
        maxInitialRequests: 1, // 最大初始化请求书，默认1
        name: function () {}, // 名称，此选项可接收 function
        cacheGroups: { // 这里开始设置缓存的 chunks
          priority: '0', // 缓存组优先级
          vendor: { // key 为entry中定义的 入口名称
            chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            test: /react|react-dom|react-router|react-router-dom|mobx|mobx-react/, // 正则规则验证，如果符合就提取 chunk
            name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
            minSize: 0,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 1, // 最大异步请求数， 默认1
            maxInitialRequests: 1, // 最大初始化请求书，默认1
            reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
          }
        }
      }
    },
    devServer: {
      contentBase: path.join(__dirname, '/'),
      port: config.port,
      host: '127.0.0.1',
      compress: true,
      publicPath: '',
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://mdev.cd8.me'
          // target: 'http://172.81.203.159:3181'
          // target: 'http://127.0.0.1:3181'
        }
      }
    }
  }
  if (NODE_ENV === 'local') {
    webpackConfig.plugins.push(new OpenBrowserPlugin({
      url: `http://localhost:${config.port}`,
      browser: 'Google Chrome'
    }))
    webpackConfig.devtool = 'source-map'
  } else if (NODE_ENV === 'dev') {
    webpackConfig.devtool = 'source-map'
  } else {
    // webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }
  return webpackConfig
}
