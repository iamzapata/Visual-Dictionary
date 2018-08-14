const path = require("path")
const webpack = require("webpack")
const DotenvPlugin = require("webpack-dotenv-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          { loader: "postcss-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".sass"],
    modules: ["node_modules"],
    alias: {
      Components: path.resolve(__dirname, "src/Components"),
      reducers: path.resolve(__dirname, "src/reducers"),
      actions: path.resolve(__dirname, "src/actions"),
      actionTypes: path.resolve(__dirname, "src/actionTypes/"),
      utils: path.resolve(__dirname, "src/utils")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new DotenvPlugin({
      sample: "./.env.dist",
      path: "./.env"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      API_URL: JSON.stringify(process.env.API_URL),
      APP_ID: JSON.stringify(process.env.APP_ID),
      APP_KEY: JSON.stringify(process.env.APP_KEY),
      GOOGLE_SEARCH_KEY: JSON.stringify(process.env.GOOGLE_SEARCH_KEY),
      GOOGLE_SEARCH_ENGINE: JSON.stringify(process.env.GOOGLE_SEARCH_ENGINE)
    })
  ]
}
