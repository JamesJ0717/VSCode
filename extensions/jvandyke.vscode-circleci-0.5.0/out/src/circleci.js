"use strict";
var vscode_1 = require('vscode');
var git_1 = require('./git');
var CircleCiApi = require('circleci');
var _ = require('lodash');
var apiKey = getApiKey();
vscode_1.workspace.onDidChangeConfiguration(function () {
    apiKey = getApiKey();
});
function getApiKey() {
    var circleCiConfig = vscode_1.workspace.getConfiguration('circleci');
    return circleCiConfig.get('apiKey');
}
function _getInstance(apiKey) {
    if (!apiKey) {
        vscode_1.window.showErrorMessage("No CircleCI API key available. Set \"circleci.apiKey\" to fix this.", 'Open config');
    }
    return new CircleCiApi({
        auth: apiKey
    });
}
var getInstance = _.memoize(function () {
    return _getInstance(apiKey);
}, function () {
    // Make sure a new instance is returned when
    // the API key has changed
    return apiKey;
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new (function () {
    function CircleCI() {
    }
    CircleCI.prototype.getBranchBuilds = function (limit, offset) {
        return getInstance().getBranchBuilds({
            username: git_1.getUsername(),
            project: git_1.getRepoName(),
            branch: git_1.getBranch(),
            limit: limit || 30,
            offset: offset || 0,
        });
    };
    CircleCI.prototype.getLatestBranchBuild = function () {
        return this.getBranchBuilds(1)
            .then(function (builds) {
            return _.first(builds);
        });
    };
    return CircleCI;
}());
//# sourceMappingURL=circleci.js.map