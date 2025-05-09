const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3002,
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
      name: 'sarhan',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App', // Expose your component
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "16.4.0",
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: "16.4.0",
          eager: true,
        },
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 3004
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};