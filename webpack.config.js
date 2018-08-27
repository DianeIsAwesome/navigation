const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const ENTRY_POINT = path.resolve(__dirname, 'client/index.jsx');

// const OUTPUT_PATH = path.resolve(__dirname, 'public/dist');

// const LOADER_OBJECT = [
//   {
//     test: /\.jsx?$/,
//     exclude: /node_modules/,
//     loader: 'babel-loader',
//     query: {
//       presets: ['react', 'env'],
//     },
//   },
//   {
//     test: /\.css$/,
//     loader:
//       'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
//   },
// ];

// module.exports = {
//   entry: ENTRY_POINT,
//   output: {
//     filename: 'bundle-server.js',
//     path: OUTPUT_PATH,
//   },
//   devtool: 'source-map',
//   module: {
//     rules: LOADER_OBJECT,
//   },
//   resolve: { extensions: ['.js', '.jsx'] },
// };

// See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

const common = {
  context: __dirname + '/client',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
  ],
};

const client = {
  entry: './index.jsx',
  output: {
    path: __dirname + '/public/dist2',
    filename: 'app.js'
  }
};

const server = {
  entry: './server.jsx',
  target: 'node',
  output: {
    path: __dirname + '/public/dist2',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];