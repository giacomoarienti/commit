import * as vscode from 'vscode';

import { CommitViewProvider } from '../commitViewProvider';

let panel: vscode.WebviewPanel;

export function list(context: vscode.ExtensionContext, provider: CommitViewProvider, refreshView: Function): vscode.Disposable {
    return vscode.commands.registerCommand('commit.list', async function () {
        // The code you place here will be executed every time your command is executed

        if (!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders.length) {
            return vscode.window.showWarningMessage(`Commit cannot be actived since no code repo opened`);
        }
        if (vscode.workspace.workspaceFolders.length !== 1) {
            return vscode.window.showWarningMessage(`Commit cannot be actived in multiple workspace mode`);
        }

        refreshView();

        try {
            if (!panel) {
                createWebPanel(context, provider);
            } else if (!panel.visible) {
                panel.reveal();
            }
            provider.panel = panel;
            provider.refreshView();
        } catch (err) {
            console.error(err);
            vscode.window.showErrorMessage("Failed to create web panel");
        }

    });
}

function createWebPanel(context: vscode.ExtensionContext, provider: CommitViewProvider) {
    panel = vscode.window.createWebviewPanel('commit', 'commit', vscode.ViewColumn.One, {
        enableScripts: true
    });
    panel.onDidDispose(
        () => {
            // When the panel is closed, cancel any future updates to the webview content
            // panel = null;
            provider.panel = panel;
        },
        null,
        context.subscriptions
    );

    panel.webview.onDidReceiveMessage(
        message => {
            switch (message.command) {
                case 'deleteTag':
                    // vscode.commands.executeCommand('extension.deleteGitTag', message.text);
                    return;
            }
        },
        undefined,
        context.subscriptions
    );
}