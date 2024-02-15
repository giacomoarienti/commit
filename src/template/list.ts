import * as vscode from 'vscode';

import { Commit } from '../models/commit';
import { assetPath, html } from '.';

function template(webview: vscode.Webview, commits: Array<Commit>) {
    return `
        <h3>Commits</h3>
        <div id="container" class="ag-theme-dark"></div>

        <script>
            window.rows = ${JSON.stringify(commits)}
        </script>
        <script src="${assetPath(webview, 'js', 'aggrid.js')}"></script>
        <script src="${assetPath(webview, 'js', 'list.js')}"></script>
    `;
}

export function listTemplate(commits: Array<Commit>, webview: vscode.Webview) {
    return html(webview, template(webview, commits));
}

