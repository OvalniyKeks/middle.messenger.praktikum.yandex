const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Chat',
      template: "src/index.html"
    })
  ],
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js'
    },
    fallback: { crypto: false }
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    compress: true,
    open: true,
    hot: true
  }
}
