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

/* eslint-disable @typescript-eslint/no-var-requires */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const postcssCommonPlugins = [
    require('postcss-use')({
        modules: [
            'lost',
            'postcss-inline-svg',
            'postcss-initial',
            'postcss-css-reset'
        ]
    }),
    require('postcss-import')({
        root: path.join(__dirname, '..'),
        path: ['src/styles']
    }),
    require('postcss-nested'),
    require('postcss-preset-env')({
        stage: 0
    }),
    require('cssnano')({
        safe: true,
        autoprefixer: false,
        normalizeUrl: false,
        svgo: true,
        discardComments: {
            removeAll: true
        },
        discardUnused: false
    })
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default postcssCommonPlugins;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
