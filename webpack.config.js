// webpack.config.js
// eslint-disable-next-line no-undef
const path = require("path");
// eslint-disable-next-line no-undef
const HtmlWebpackPlugin = require("html-webpack-plugin");

// eslint-disable-next-line no-undef
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    filename: "main.js",
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // eslint-disable-next-line no-dupe-keys
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
