const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  entry: {
    index: ['./src/index.js'],
  },

  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/env', {
                  modules: false,
                }],
                '@babel/react',
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
                ['@babel/plugin-transform-runtime', { corejs: 2 }],

                // zarm/zarm-web
                ['import', { libraryName: 'zarm', libraryDirectory: 'es', style: true }, 'zarm'],
                // ['import', { libraryName: 'zarm-web', libraryDirectory: 'es', style: true }, 'zarm-web'],
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?limit=1&name=images/[name].[hash:8].[ext]',
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[hash:8].[ext]',
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [' ', '.ts', '.tsx', '.js', '.jsx', '.scss'],
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    compress: true,
    noInfo: true,
    inline: true,
    hot: true,
    progress: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'stylesheet/[name].[contenthash:8].css',
      chunkFilename: 'stylesheet/[id].[contenthash:8].css',
    }),
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
    }),
    new webpack.optimize.RuntimeChunkPlugin({
      name: 'manifest',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['manifest', 'index'],
    }),
  ],
};
