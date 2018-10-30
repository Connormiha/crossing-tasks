'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const autoprefixer = require('autoprefixer');
const NODE_ENV = process.env.NODE_ENV || 'development';
const ROOT_URL = process.env.ROOT_URL || '';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const nodePath = path.join(__dirname, './node_modules');
const sourcePath = path.join(__dirname, './src/');

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
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                localIdentName: CONFIG.localIdentName,
                modules: true,
            }
        }
    ]
    .concat(
        NODE_ENV === 'production'
            ? []
            : {
                loader: 'typed-css-modules-loader',
                options: {
                    camelCase: true,
                },
            }
    )
    .concat(
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer({browsers: ['Chrome 62', 'Firefox 56', 'Safari 11']})
                ]
            }
        }
    )

let stylusLoaders = cssLoaders.concat('stylus-loader');

// cssLoaders = extractStyle(cssLoaders);
// stylusLoaders = extractStyle(stylusLoaders);

module.exports = {
    entry: {
        app: './src/app.tsx',
    },

    mode: NODE_ENV,

    optimization: {
        concatenateModules: true,
        minimizer: [
            new TerserPlugin({
                parallel: false,
                sourceMap: false,
                terserOptions: {
                    ecma: 8,
                    toplevel: true,
                    compress: {
                        // https://github.com/mishoo/UglifyJS2/pull/2325
                        unsafe_methods: true,
                        unsafe_arrows: true,
                        drop_console: true,
                        passes: 3,
                        pure_funcs: ['invariant'],
                    },
                },
            }),
            new CssoWebpackPlugin(),
            // Waiting for support Webpack 4
            //   new PreloadWebpackPlugin({
            //       rel: 'preload',
            //       as(entry) {
            //           if (/\.css$/.test(entry)) return 'style';
            //           if (/\.woff$/.test(entry)) return 'font';
            //           if (/\.(svg|png)$/.test(entry)) return 'image';

            //           return 'script';
            //       }
            //   })
        ],
        
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
        extensions:         ['.js', '.ts', '.tsx', '.json', '.mp3', '.opus'],
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
                sideEffects: false,
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
                ]
            }
        ],
    },
    //devtool: CONFIG.sourceMap,
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head',
            minify: CONFIG.minifyHTML
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV),
                'ROOT_URL': JSON.stringify(ROOT_URL),
            },
        }),
        new MiniCssExtractPlugin({
            filename: `${ROOT_URL}/static/[hash].css`.replace(/^\//, ''),
            chunkFilename: `${ROOT_URL}/static/[id][hash].css`.replace(/^\//, ''),
        }),
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
