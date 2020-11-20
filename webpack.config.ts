import webpack from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import CssoWebpackPlugin from 'csso-webpack-plugin';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const NODE_ENV = process.env.NODE_ENV || 'development';
const ROOT_URL = process.env.ROOT_URL || '';
const isProduction = NODE_ENV === 'production';
const nodePath = path.join(__dirname, './node_modules');
const sourcePath = path.join(__dirname, './src/');

const PORT = process.env.PORT || 8080;

interface Configuration extends webpack.Configuration {
  devServer?: WebpackDevServerConfiguration;
}

const CONFIG = {
  production: {
    localIdentName: '[hash:base64:5]',
    watch: false,
    FOLDER: `${__dirname}/build`,
    minifyHTML: {
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeRedundantAttributes: true,
      collapseWhitespace: true,
    },
    alias: {
      invariant: 'lodash/noop',
    },
  },
  development: {
    localIdentName: '[local]',
    watch: true,
    FOLDER: `${__dirname}/deploy`,
    minifyHTML: {
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeRedundantAttributes: true,
    },
    alias: {},
  },
}[NODE_ENV];

let cssLoaders = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: CONFIG.localIdentName,
      },
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [autoprefixer()],
    },
  },
];

let stylusLoaders = cssLoaders.concat('stylus-loader');

const webpackConfig: Configuration = {
  entry: {
    app: './src/app.tsx',
  },

  mode: isProduction ? 'production' : 'development',

  optimization: {
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        parallel: false,
        sourceMap: false,
        terserOptions: {
          ecma: 8,
          toplevel: true,
          output: {
            comments: false,
          },
          compress: {
            // https://github.com/mishoo/UglifyJS2/pull/2325
            unsafe_methods: true,
            unsafe_arrows: true,
            drop_console: true,
            passes: 3,
            pure_funcs: ['invariant'],
          },
        },
      }) as any,
      new CssoWebpackPlugin(),
    ],
  },

  // context: sourcePath,
  output: {
    path: CONFIG.FOLDER,
    publicPath: '/',
    filename: `${ROOT_URL}/static/[name].[hash].bundle.js`.replace(/^\//, ''),
  },
  resolve: {
    modules: [sourcePath, 'node_modules'],
    // modulesDirectories: [nodePath],
    extensions: ['.js', '.ts', '.tsx', '.json', '.mp3', '.opus'],
    // This is default param
    enforceExtension: false,
    alias: CONFIG.alias,
  },
  watch: CONFIG.watch,
  node: {
    console: false,
    global: true,
    process: false,
    __filename: false,
    __dirname: false,
    Buffer: false,
    setImmediate: false,
  },
  module: {
    // noParse: [/\.min\.js$/],
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [nodePath],
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.styl$/,
        use: stylusLoaders,
      },
      {
        test: /\.(png|jpg|gif|ico|woff2?|eot|mp3|opus)$/,
        loader: 'file-loader',
        options: {
          name: `${ROOT_URL}/static/[hash].[ext]`.replace(/^\//, ''),
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
          },
          {
            loader: 'svgo-loader',
          },
        ],
      },
    ],
  },
  // devtool: CONFIG.sourceMap,
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head',
      minify: CONFIG.minifyHTML,
      scriptLoading: 'defer',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        ROOT_URL: JSON.stringify(ROOT_URL),
      },
    }),
    new MiniCssExtractPlugin({
      filename: `${ROOT_URL}/static/[hash].css`.replace(/^\//, ''),
      chunkFilename: `${ROOT_URL}/static/[id][hash].css`.replace(/^\//, ''),
    }),
  ] as any,
  devServer: {
    host: 'localhost',
    port: Number(PORT),
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: 'minimal',
  },
};

export default webpackConfig;
