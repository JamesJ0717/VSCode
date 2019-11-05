'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var openUrl = require('./open-url');
var extContext = require('./context');
// Commands we'll use
var getBranchBuilds_1 = require('./commands/getBranchBuilds');
var setStatusBar = require('./commands/setStatusBar');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // For debugging purposes
    // vscode.commands.getCommands().then((commands) => {
    //   commands.forEach((command) => {
    //     if (/git/.test(command)) {
    //       console.log(command);
    //     }
    //   })
    // });
    extContext.setContext(context);
    openUrl.registerCommands();
    setStatusBar.startUpdate();
    context.subscriptions.push(vscode.commands.registerCommand('extension.branchBuilds', getBranchBuilds_1.default));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    setStatusBar.stopUpdate();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map