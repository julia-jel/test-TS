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
import express from 'express';
import moment from 'moment';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import logger from './src/common/logger';
import webpackConfig from './webpack/config.babel';
import settings from './src/common/settings';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const projectConfig = settings.get();
const port = projectConfig.WWW_PORT || 8080;
const devServerHostname = projectConfig.DEV_SERVER_HOSTNAME;
let lastTime = moment();

const compiler = webpack(webpackConfig);
const server = express();

server.use(express.static(path.join(__dirname, 'build')));
server.use(
    webpackDevMiddleware(
        compiler,
        {
            hot: true,
            stats: {colors: true},
            historyApiFallback: false,
            watchOptions: {
                aggregateTimeout: 100
            },

            reporter(middlewareOptions, {state, stats}) {
                if(state) {
                    const time = moment() - lastTime;
                    if(stats.hasErrors() || stats.hasWarnings()) {
                        logger.info(stats.toString({color: true}));
                    }

                    logger.info(`Bundle ready in ${time}ms.`);
                } else {
                    lastTime = moment();
                    logger.info('Updating bundle.');
                }
            }
        }
    )
);
server.use(webpackHotMiddleware(compiler));
server.listen(port, devServerHostname, error => {
    if(error) {
        logger.info(error);
    }
    logger.info(`Listening at ${devServerHostname}:${port}\n\nWaiting for bundle...`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
