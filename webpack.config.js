var path = require('path')
var webpack = require('webpack')

var globalConfig = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
              // the "scss" and "sass" values for the lang attribute to the right configs here.
              // other preprocessors should work out of the box, no loader config like this necessary.
              'scss': 'vue-style-loader!css-loader!sass-loader',
              'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map'
}

module.exports = [
  {
    name: 'main',
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: './dist/',
      filename: 'build.js'
    },
    module: globalConfig.module,
    resolve: globalConfig.resolve,
    performance: globalConfig.performance,
    devServer: globalConfig.devServer,
    devtool: globalConfig.devtool
  },
  {
    name: 'other',
    entry: './src/other.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
      filename: 'other.js'
    },
    module: globalConfig.module,
    resolve: globalConfig.resolve,
    performance: globalConfig.performance,
    devServer: globalConfig.devServer,
    devtool: globalConfig.devtool
  }
]

if (process.env.NODE_ENV === 'production') {
  let modules = module.exports;

  for (var i = modules.length - 1; i >= 0; i--) {

    modules[i].devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    modules[i].plugins = (modules[i].plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
  }
}
