import * as vscode from 'vscode';
import { simpleGit, SimpleGit } from 'simple-git';

import { Commit } from '../models/commit';

const gitpath = vscode.workspace.getConfiguration('git').get('path') || 'git';


export async function commits(cwd: string): Promise<Array<Commit>> {
    console.log('call commits(), cwd:', cwd);
    const git: SimpleGit = simpleGit(cwd);

    const logs = await git.log();
    const commits: Array<Commit> = logs.all.map((log) => {
        return {
            hash: log.hash,
            date: log.date,
            message: log.message,
        };
    });
    console.log('commits:', commits);
    return commits;
}

export async function pull(cwd: string): Promise<void> {
    console.log('call pull(), cwd:', cwd);
    const git: SimpleGit = simpleGit(cwd);
    await git.pull();
}


export async function push(cwd: string): Promise<void> {
    console.log('call push(), cwd:', cwd);
    const git: SimpleGit = simpleGit(cwd);
    await git.push();
}
