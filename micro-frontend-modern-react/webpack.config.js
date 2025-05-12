const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    // server: {
    //   type: 'https',
    // },
    static: path.join(__dirname, 'public'),
    port: 3005,
    host: '0.0.0.0',
    allowedHosts: 'all',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'sarhanModern',
      filename: 'remoteEntry.js',
      exposes: {
        './App2': './src/App2', // Expose your component
      },
      shared: {
        react: {
          singleton: false, // Важно! Разрешаем разные экземпляры React
          requiredVersion: '^18.0.0',
          eager: true
        },
        'react-dom': {
          singleton: false, // Важно! Разрешаем разные экземпляры React
          requiredVersion: '^18.0.0',
          eager: true
        }
      }
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 3006
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};