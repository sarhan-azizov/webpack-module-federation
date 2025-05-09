const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3001,
    host: '0.0.0.0',
    allowedHosts: 'all',
  },
  output: {
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'NuORDER',
      remotes: {
        'sarhan': 'sarhan@http://localhost:3002/remoteEntry.js',
        'sarhanModern': 'sarhanModern@http://localhost:3005/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: false, // Важно! Разрешаем разные экземпляры React
          requiredVersion: '^16.13.1',
          eager: true
        },
        'react-dom': {
          singleton: false, // Важно! Разрешаем разные экземпляры React
          requiredVersion: '^16.13.1',
          eager: true
        }
      }
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 3003,
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};