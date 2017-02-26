'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const NODE_ENV = process.env.NODE_ENV || 'development';
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
       csso: true,
       localIdentName: '[hash:base64:5]',
       watch: false,
       sourceMap: '',
       FOLDER: `${__dirname}/build`
   },
   development: {
       csso: false,
       localIdentName: '[local]_[hash:base64:5]',
       watch: true,
       sourceMap: 'inline-source-map',
       FOLDER: `${__dirname}/deploy`
   }
}[NODE_ENV];

let cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                localIdentName: CONFIG.localIdentName,
                modules: true
            }
        },
        'typed-css-modules-loader',
    ]
    .concat(CONFIG.csso ? 'csso-loader' : [])
    .concat(
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer({browsers: ['last 2 versions']})
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
        filename: '[name].[hash].bundle.js'
    },
    resolve: {
        modules: [
            sourcePath,
            'node_modules'
        ],
        //modulesDirectories: [nodePath],
        extensions:         ['.js', '.ts', '.tsx', '.json'],
        // This is default param
        enforceExtension: false
    },
    watch: CONFIG.watch,
    module: {
        noParse: [/\.min\.js$/],
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
                test: /\.(png|svg|jpg|gif|ico|woff2?|eot)$/,
                loader: 'file-loader'
            }
        ],
    },
    //devtool: CONFIG.sourceMap,
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            immutable: 'seamless-immutable'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head',
            minify: {
                //removeComments: true
            }
        }),
        new ExtractTextPlugin('app.[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        })
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
        stats: {
            // Config for minimal console.log mess.
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    }
};


// UglifyJs doensn't support ES6. Temporary switched off
if (NODE_ENV === 'production' && false) {
  module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            // don't show unreachable variables etc
            warnings:     false,
            drop_console: true,
            unsafe:       true
        }
      })
  );
}
