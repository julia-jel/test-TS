////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (C) 2008 Quantron Systems LLC.
//  All Rights Reserved.
//
//  This file is part of the private project.
//  For conditions of distribution and use,
//  please contact sales@quantron-systems.com
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import gracefulFs from 'graceful-fs';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import StylelintPlugin from 'stylelint-webpack-plugin';
import settings from '../src/common/settings';
import postcssCommonPlugins from './postcssCommonPlugins';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
gracefulFs.gracefulify(fs);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const projectConfig = settings.get();
const isDev = process.env.NODE_ENV == 'development';
const isHot = !!process.env.HOT;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const config = {
    mode: process.env.NODE_ENV || 'production',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: _.compact([
            isHot && 'webpack-hot-middleware/client?path=/__webpack_hmr',
            path.join(__dirname, '../src/main.js')
        ])
    },
    output: {
        path: path.join(__dirname, '../build'),
        filename: '[name]-[hash].js'
    },
    plugins: _.compact([
        isHot && new webpack.HotModuleReplacementPlugin(),
        !isDev && new MiniCssExtractPlugin({
            filename: '[name]-[hash].css'
        }),

        // new webpack.NoErrorsPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: true,
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                SERVER_URL: JSON.stringify(projectConfig.SERVER_URL),
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
                ..._.mapValues(
                    projectConfig.BUNDLE_PARAMS,
                    value => JSON.stringify(value)
                )
            }
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            filename: 'index.html',
            template: path.join(__dirname, '../src/template.html')
        }),
        new WebpackMd5Hash(),
        new StylelintPlugin({
            configFile: './.stylelintrc.yaml',
            files: '**/*.css'
        })
    ]),
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                include: path.join(__dirname, '../src'),
                use: [

                    // {
                    //     loader: 'thread-loader',
                    //     options: {
                    //         workers: 4
                    //     }
                    // },
                    {
                        loader: 'babel-loader',
                        options: {compact: false}
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [

                    // {
                    //     loader: 'thread-loader',
                    //     options: {
                    //         workers: 4
                    //     }
                    // },
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {

                            // localsConvention: 'camelCase',
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]___[hash:base64:5]'
                            },
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: postcssCommonPlugins
                        }
                    }
                ]
            },
            {
                test: /node_modules.*\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: postcssCommonPlugins
                        }
                    }
                ]
            },
            {
                test: /\.(jpeg|jpg|woff|woff2|eot|ttf|gif|svg)(\?.*$|$)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './common/[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: _.pickBy({
            'react-dom': isHot && '@hot-loader/react-dom'
        })
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default config;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
