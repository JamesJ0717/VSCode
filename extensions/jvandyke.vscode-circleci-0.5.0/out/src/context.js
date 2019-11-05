"use strict";
/// <reference path="../typings/vscode-typings.d.ts"/>
var context;
function setContext(c) {
    context = c;
}
exports.setContext = setContext;
function getContext() {
    return context;
}
exports.getContext = getContext;
function setCurrentBuild(build) {
    getContext().workspaceState.update("currentBuild", build);
}
exports.setCurrentBuild = setCurrentBuild;
function getCurrentBuild() {
    return getContext().workspaceState.get("currentBuild");
}
exports.getCurrentBuild = getCurrentBuild;
//# sourceMappingURL=context.js.map