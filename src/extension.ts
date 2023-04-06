import * as vscode from 'vscode';
import { list } from './commands/list';
import { CommitViewProvider } from './commitViewProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "commit" is now active!');

	const provider = new CommitViewProvider();

	async function refreshView() {
		try {
			await provider.refreshView();
		} catch (err) {
			console.error(err);
			vscode.window.showErrorMessage("Failed to refresh view");
		}
	}

	context.subscriptions.push(list(context, provider, refreshView));
}

// This method is called when your extension is deactivated
export function deactivate() { }
