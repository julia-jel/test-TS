/* eslint-disable */
'use strict';

require('babel-core/register');

const webpack          = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config           = require('./webpack/webpack.config.dev');
const path             = require('path');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const server = new WebpackDevServer(webpack(config), {
    hot: true,
    stats: {colors: true},
    historyApiFallback: false,
    publicPath: config.output.publicPath,
    contentBase: path.join(__dirname, 'build')
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(3000, function(err) {
    if(err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000\n\nWaiting compile bundle...');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
