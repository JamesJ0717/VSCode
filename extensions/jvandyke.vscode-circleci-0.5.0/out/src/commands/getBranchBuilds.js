"use strict";
var vscode_1 = require('vscode');
var format = require('../format');
var circleci_1 = require('../circleci');
var _ = require('lodash');
var open_url_1 = require('../open-url');
function execute() {
    var buildsPromise = circleci_1.default.getBranchBuilds()
        .then(function (builds) {
        return builds.map(format.quickPickItemFromBuild);
    });
    return vscode_1.window.showQuickPick(buildsPromise, {
        placeHolder: 'Select a build to open it in a browser',
        matchOnDescription: true,
        matchOnDetail: true
    })
        .then(function (item) {
        item = item;
        if (item && item.build.build_url) {
            open_url_1.default(item.build.build_url);
        }
    }, 
    // Error
    function (error) {
        var openUserSettings = 'Open user settings';
        vscode_1.window.showErrorMessage("There was an error connecting to CircleCI. Make sure your API key is valid.", openUserSettings)
            .then(function (action) {
            if (action == openUserSettings) {
                vscode_1.commands.executeCommand('workbench.action.openGlobalSettings');
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = execute;
//# sourceMappingURL=getBranchBuilds.js.map