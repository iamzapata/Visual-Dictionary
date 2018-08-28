const path = require("path")
const webpack = require("webpack")
const DotenvPlugin = require("webpack-dotenv-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const devMode = process.env.NODE_ENV !== "production"

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "client"),
    compress: true,
    port: 9000,
    https: true,
    index: "index.html",
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      "/api": {
        target: "http://localhost:8080"
      }
    },
    publicPath: "/"
  },
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "client"),
    filename: devMode
      ? "[name].[hash].bundle.js"
      : "[name][contenthash].bundle.js"
  },
  optimization: {
    namedChunks: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          { loader: "postcss-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
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
      template: "./src/index.html"
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
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    devMode ? () => ({}) : new CleanWebpackPlugin(["client"]),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$/
    })
  ]
}

if (process.env.BUNDLE_ANALYZER) {
  module.exports.plugins.push(new BundleAnalyzerPlugin())
}
