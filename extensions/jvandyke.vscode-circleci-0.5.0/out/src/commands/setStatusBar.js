"use strict";
var vscode = require('vscode');
var _ = require('lodash');
var circleci_1 = require('../circleci');
var extContext = require('../context');
var updateTimeout;
var rate = getRefreshRate();
var statusBarItem = undefined;
var statusSymbols = {
    canceled: 'circle-slash',
    running: 'sync',
    failed: 'alert',
    success: 'check',
    fixed: 'check',
    queued: 'clock',
    scheduled: 'clock',
};
var statusSentences = {
    canceled: 'was canceled',
    running: 'is currently running',
    failed: 'failed',
    success: 'was successful',
    fixed: 'was fixed',
    queued: 'is queued',
    scheduled: 'is scheduled',
};
vscode.workspace.onDidChangeConfiguration(function () {
    rate = getRefreshRate();
});
function getRefreshRate() {
    var circleCiConfig = vscode.workspace.getConfiguration('circleci');
    return circleCiConfig.get('rate') || 10 * 1000;
}
function setStatusBarItem(build) {
    if (!statusBarItem) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    }
    var status = build.status;
    var icon = statusSymbols[status];
    var tooltip = "Latest build for " + build.branch + " (#" + build.build_num + ") " + statusSentences[status] + ".";
    statusBarItem.text = icon ? "CircleCI $(" + icon + ")" : "CircleCI " + status;
    statusBarItem.tooltip = tooltip;
    statusBarItem.command = 'circleci.openUrl.fromBuild';
    statusBarItem.show();
}
function startUpdate() {
    var buildsPromise = circleci_1.default.getLatestBranchBuild()
        .then(function (build) {
        extContext.setCurrentBuild(build);
        setStatusBarItem(build);
        updateTimeout = setTimeout(startUpdate, rate);
    });
}
exports.startUpdate = startUpdate;
function stopUpdate() {
    if (updateTimeout) {
        clearTimeout(updateTimeout);
        updateTimeout = undefined;
    }
}
exports.stopUpdate = stopUpdate;
//# sourceMappingURL=setStatusBar.js.map