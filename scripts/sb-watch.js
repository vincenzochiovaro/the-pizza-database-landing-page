'use strict';

const _ = require('lodash');
const chokidar = require('chokidar');
const upath = require('upath');
const renderAssets = require('./render-assets');
const renderScripts = require('./render-scripts');
const renderSCSS = require('./render-scss');

const watcher = chokidar.watch('src', {
    persistent: true,
});

let READY = false;

process.stdout.write('Loading');


watcher.on('add', filePath => _processFile(upath.normalize(filePath), 'add'));
watcher.on('change', filePath => _processFile(upath.normalize(filePath), 'change'));
watcher.on('ready', () => {
    READY = true;
    console.log(' READY TO ROLL!');
});


function _processFile(filePath, watchEvent) {

    if (!READY) {
        if (filePath.match(/\.scss$/)) {
            if (watchEvent === 'change') {
                return renderSCSS();
            }
            return;
        }

        if (filePath.match(/src\/js\//)) {
            return renderScripts();
        }

        if (filePath.match(/src\/assets\//)) {
            return renderAssets();
        }

    }


}