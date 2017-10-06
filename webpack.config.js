'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');
const SvgStorePlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const autoprefixer = require('autoprefixer');
const NODE_ENV = process.env.NODE_ENV || 'development';
const ROOT_URL = process.env.ROOT_URL || '';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const nodePath = path.join(__dirname, './node_modules');
const sourcePath = path.join(__dirname, './src/');

function extractStyle(use) {
    return ExtractTextPlugin.extract({
        fallback: "style-loader",
        use
    });
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
            collapseWhitespace: true
        },
        alias: {
            'invariant': 'lodash/noop',
        },
    },
    development: {
        localIdentName: '[local]',
        watch: true,
        FOLDER: `${__dirname}/deploy`,
        minifyHTML: {
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeRedundantAttributes: true
        },
        alias: {},
    }
}[NODE_ENV];

let cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                localIdentName: CONFIG.localIdentName,
                root: sourcePath,
                modules: true,
            }
        }
    ]
    .concat(NODE_ENV === 'production' ? [] : 'typed-css-modules-loader')
    .concat(
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer({browsers: ['Chrome 59', 'Firefox 54', 'Safari 10']})
                ]
            }
        }
    )

let stylusLoaders = cssLoaders.concat('stylus-loader');

cssLoaders = extractStyle(cssLoaders);
stylusLoaders = extractStyle(stylusLoaders);

module.exports = {
    entry: {
        app: './src/app.tsx'
    },

    //context: sourcePath,
    output: {
        path: CONFIG.FOLDER,
        publicPath: '/',
        filename: `${ROOT_URL}/static/[name].[hash].bundle.js`.replace(/^\//, '')
    },
    resolve: {
        modules: [
            sourcePath,
            'node_modules'
        ],
        //modulesDirectories: [nodePath],
        extensions:         ['.js', '.ts', '.tsx', '.json', '.mp3'],
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
        setImmediate: false
    },
    module: {
        // noParse: [/\.min\.js$/],
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [nodePath],
                loader: 'tslint-loader',
                enforce: 'pre'
            },
            {
                test: /\.tsx?$/,
                exclude: [nodePath],
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: cssLoaders
            },
            {
                test: /\.styl$/,
                use: stylusLoaders
            },
            {
                test: /\.(png|jpg|gif|ico|woff2?|eot|mp3)$/,
                loader: 'file-loader',
                options: {
                    name: `${ROOT_URL}/static/[hash].[ext]`.replace(/^\//, ''),
                },
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'external-svg-sprite-loader',
                        options: {
                            name: `${ROOT_URL}/static/[hash].svg`.replace(/^\//, ''),
                        },
                    }
                ]
            }
        ],
    },
    //devtool: CONFIG.sourceMap,
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head',
            minify: CONFIG.minifyHTML
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new SvgStorePlugin(),
        new ExtractTextPlugin(`${ROOT_URL}/static/[hash].css`.replace(/^\//, '')),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV),
                'ROOT_URL': JSON.stringify(ROOT_URL),
            },
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    devServer: {
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
        // It suppress error shown in console, so it has to be set to false.
        quiet: false,
        // It suppress everything except error, so it has to be set to false as well
        // to see success build.
        noInfo: false,
        stats: 'minimal'
    }
};


if (NODE_ENV === 'production') {
  module.exports.plugins = module.exports.plugins.concat(
      new UglifyEsPlugin({
          ecma: 8,
          compress: {
              // https://github.com/mishoo/UglifyJS2/pull/2325
              unsafe_methods: true,
              unsafe_arrows: true,
              unsafe_math: true,
              drop_console: true,
              passes: 2,
              pure_getters: true,
              pure_funcs: ['invariant'],
          },
      }),
      new CssoWebpackPlugin(),
      new PreloadWebpackPlugin({
          rel: 'preload',
          as(entry) {
              if (/\.css$/.test(entry)) return 'style';
              if (/\.woff$/.test(entry)) return 'font';
              if (/\.(svg|png)$/.test(entry)) return 'image';

              return 'script';
          }
      }),
  )
}
