var path = require("path");
var webpack = require("webpack");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Webpack Plugins
var plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      drop_console: true,
      drop_debugger: true
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new ExtractTextPlugin({
    filename: "assets/css/style.css",
    allChunks: true
  })
];

// Webpack Loaders
var rules = [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"]
      }
    }
  },
  {
    test: /\.(css|scss)$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: "css-loader",
          options: {
            minimize: process.env.NODE_ENV === "production",
            sourceMap: "inline"
          }
        },
        {
          loader: "postcss-loader",
          options: { sourceMap: "inline" }
        },
        {
          loader: "sass-loader",
          options: { sourceMap: "inline" }
        },
        {
          loader: "autoprefixer-loader?browsers=last 2 version"
        },
        {
          loader: "resolve-url-loader",
          options: { sourceMap: "inline" }
        }
      ]
    })
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "file-loader?publicPath=/&name=assets/fonts/[name].[ext]"
  },
  {
    test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "file-loader?publicPath=/&name=assets/fonts/[name].[ext]"
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: /(node_modules|bower_components)/,
    loader:
      "url-loader?prefix=font/&limit=10000&publicPath=/&name=assets/fonts/[name].[ext]"
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader:
      "url-loader?limit=10000&publicPath=/&name=assets/fonts/[name].[ext]&mimetype=application/octet-stream"
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components|fonts)/,
    loader:
      "url-loader?limit=10&publicPath=/&name=assets/images/[name].[ext]&context=./src/images&mimetype=image/svg+xml"
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components|images)/,
    loader:
      "url-loader?limit=10&publicPath=/&name=assets/fonts/[name].[ext]&context=./src/fonts&mimetype=image/svg+xml"
  },
  {
    test: /\.gif/,
    exclude: /(node_modules|bower_components)/,
    loader:
      "url-loader?limit=10000&publicPath=/&name=assets/images/[name].[ext]&mimetype=image/gif"
  },
  {
    test: /\.jpg/,
    exclude: /(node_modules|bower_components)/,
    loader:
      "url-loader?limit=10000&publicPath=/&name=assets/images/[name].[ext]&mimetype=image/jpg"
  },
  {
    test: /\.png/,
    exclude: /(node_modules|bower_components)/,
    loader:
      "url-loader?limit=10000&publicPath=/&name=assets/images/[name].[ext]&mimetype=image/png"
  }
];

if (process.env.NODE_ENV === "development") {
  plugins.push(
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./dist directory is being served
      host: "localhost",
      port: 3000,
      server: { baseDir: ["dist"] }
    })
  );
}

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/app.js"
  },
  module: {
    rules: rules
  },
  plugins: plugins
};
