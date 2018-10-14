const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      }
    ],
  },
  optimization: {
    namedModules: true,
    runtimeChunk: {
      name: 'webpack.runtime',
    },
    splitChunks: {
      minChunks: 2,
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: module => module.context && module.context.includes('node_modules'),
        },
      }
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
      new CleanWebpackPlugin(['dist']),
      new CopyWebpackPlugin([
        { from: "./src/static/index.html", to: "index.html" },
      ]),
  ]
};
