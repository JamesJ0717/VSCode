"use strict";
var vscode = require('vscode');
var extContext = require('./context');
var open = require('open');
function openUrlFromBuild(build) {
    openUrl(build.build_url);
}
function openUrlFromCurrentBuild() {
    openUrlFromBuild(extContext.getCurrentBuild());
}
function registerCommands() {
    vscode.commands.registerCommand('circleci.openUrl.fromBuild', openUrlFromCurrentBuild);
}
exports.registerCommands = registerCommands;
function openUrl(url) {
    try {
        open(url);
    }
    catch (error) {
        vscode.window.showErrorMessage('Couldn\'t open URL. ' + url);
        console.error(error.stack);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = openUrl;
//# sourceMappingURL=open-url.js.map