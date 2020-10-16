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

import path from 'path';
import webpack from 'webpack';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// cspell: ignore devtool
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const config = {
    context: path.join(__dirname, '../'),
    devtool: 'eval',
    debug: true,
    entry: {
        libs: [
            'moment',
            'lodash',
            'react',
            'react-dom',
            'react-',
            'react-router',
            'create-react-class',
            'prop-types',
            'history',
            'classnames',
            'keycode',
            'hoist-non-react-statics',
            'react-notifications',
            'store',
            'validate.js',
            'babel-polyfill',
            'react-hot-loader'
        ]
    },
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'libs.js',
        library: 'libs'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, './libs-manifest.json'),
            name: 'libs'
        })
    ]
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default config;
