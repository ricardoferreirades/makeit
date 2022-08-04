const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[hash].js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "public/index.html",
    }),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|svg|gif|jpeg)$/,
        use: ["file-loader"],
      },
    ],
  },
  performance: {
    hints: false,
  },
  devServer: {
    host: "localhost",
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
};
