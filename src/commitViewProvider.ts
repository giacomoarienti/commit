import { reject } from 'lodash';
import * as vscode from 'vscode';

import { commits, pull } from './services/git';
import { html } from './template';


export class CommitViewProvider {
    private _panel?: vscode.WebviewPanel;
    private _fsPath?: string;

    constructor() {
        if (!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders.length) {
            vscode.window.showWarningMessage(`Commit cannot be actived since no code repo opened`);
            return;
        }
        if (vscode.workspace.workspaceFolders.length !== 1) {
            vscode.window.showWarningMessage(`Commit cannot be actived in multiple workspace mode`);
            return;
        }

        this._fsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        pull(this._fsPath);
    }

    set panel(panel: vscode.WebviewPanel) {
        this._panel = panel;
    }

    private async getInitHtml(webview: vscode.Webview): Promise<string> {
        if (this._fsPath) {
            // const cwd = vscode.workspace.rootPath;
            await pull(this._fsPath);
            // const tagList = await tags(cwd);
            const tagList = await commits(this._fsPath);
            return html(tagList, webview);
        }

        vscode.window.showWarningMessage(`Failed to get fsPath`);
        return new Promise(() => reject("Failed to get fsPath"));
    }

    public async refreshView() {
        if (!this._panel) {
            return;
        }
        const html = await this.getInitHtml(this._panel.webview);
        this._panel.webview.html = html;
    }
}