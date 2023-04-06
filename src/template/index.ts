import * as vscode from 'vscode';
import * as path from 'path';
const t = require('lodash/template');

import { Commit } from '../models';

function compile(webview: vscode.Webview) {
    return t(`
    <html>
        <link rel="stylesheet" href="${assetPath(webview, 'css', 'commit.css')}" >
        <body>
            <div id="container" class="ag-theme-blue"></div>

            <script>
            window.rows = <%= JSON.stringify(obj.tags) %>
            </script>
            <script src="${assetPath(webview, 'js', 'aggrid.js')}"></script>
            <script src="${assetPath(webview, 'js', 'app.js')}"></script>
        </body>
    </html>
`, { variable: 'obj' });
}


export function html(commits: Array<Commit>, webview: vscode.Webview) {
    return compile(webview)({
        commits
    });
}

function assetPath(webview: vscode.Webview, ...args: string[]) {
    return webview.asWebviewUri(vscode.Uri.file(path.join(__dirname, '..', '..', 'assets', ...args)));
}

