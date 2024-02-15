import * as vscode from 'vscode';
import * as path from 'path';
import t = require('lodash/template');

function compile(webview: vscode.Webview) {
    return t(`
        <html>
            <meta http-equiv="Content-Security-Policy" content="default-src self; img-src vscode-resource:; script-src vscode-resource: 'self' 'unsafe-inline'; style-src vscode-resource: 'self' 'unsafe-inline'; "/>
            <link rel="stylesheet" href="${assetPath(webview, 'css', 'commit.css')}" >
            <body>
               <%= data.body %>
            </body>
        </html>
    `, { variable: 'data' });
}

export function html(webview: vscode.Webview, body: string) {
    return compile(webview)({
        body
    });
}

export function assetPath(webview: vscode.Webview, ...args: string[]): vscode.Uri {
    return webview.asWebviewUri(vscode.Uri.file(path.join(__dirname, '..', 'assets', ...args)));
}

