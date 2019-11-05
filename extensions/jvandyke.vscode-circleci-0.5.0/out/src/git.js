"use strict";
var vscode = require('vscode');
var gitBranch = require('git-branch');
var gitUsername = require('git-username');
var gitRepoName = require('git-repo-name');
function getUsername() {
    var username = gitUsername(vscode.workspace.rootPath);
    return username.split(":")[1] || username;
}
exports.getUsername = getUsername;
function getBranch() {
    return gitBranch.sync(vscode.workspace.rootPath);
}
exports.getBranch = getBranch;
function getRepoName() {
    return gitRepoName.sync(vscode.workspace.rootPath);
}
exports.getRepoName = getRepoName;
//# sourceMappingURL=git.js.map