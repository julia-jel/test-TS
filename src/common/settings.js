/* eslint-disable */

'use strict';

const fs = require('fs');
const _ = require('lodash');
import logger from './logger';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function processError(message) {
    logger.error('settings: ' + message);
    throw Error(message);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.read = () => {
    let defaultSettingsString = null;
    try {
        logger.verbose('settings.read(): reading default config file...');
        defaultSettingsString = fs.readFileSync('./config.json');
    } catch(error) {
        processError('cannot read default settings file - ' + error.toString());
    }

    let settings = null;
    try {
        settings = JSON.parse(defaultSettingsString);
    } catch(error) {
        processError('cannot parse default settings file - ' + error.toString());
    }

    settings.getValue = (name, defaultValue) => {
        if(!settings.hasOwnProperty(name)) {
            logger.warn('settings.getValue(): no ' + name + ' record in settings.');
            return defaultValue;
        }
        return settings[name];
    };

    const overridePath = './config.local.json';

    if(!fs.existsSync(overridePath)) {
        return settings;
    }

    let localSettingsString = null;
    try {
        logger.verbose('settings.read(): reading local config file...');
        localSettingsString = fs.readFileSync(overridePath);
    } catch(error) {
        processError('cannot read local settings file - ' + error.toString());
    }

    let localSettings = null;
    try {
        localSettings = JSON.parse(localSettingsString);
    } catch(error) {
        processError('error on local settings file parsing - ' + error.toString());
    }

    settings = _.defaults(localSettings, settings);
    return settings;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.readFromFile = path => {
    try {
        logger.verbose('settings.readFromFile(): reading config file - ' + path);
        return JSON.parse(fs.readFileSync(path));
    } catch(error) {
        processError('cannot read settings file - ' + error.toString());
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let settings = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.get = () => {
    if(!settings) {
        settings = exports.read();
    }
    return settings;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
