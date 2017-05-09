var path = require('path')
var webpack = require('webpack')

module.exports = {

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scene-pager.js',
    library: 'ScenePager',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'stage-1']
      },
      exclude: '/index.js'
    }]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ]

}

if (process.env.NODE_ENV.trim() === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}
