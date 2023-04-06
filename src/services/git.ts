import * as child_process from 'child_process';
import * as vscode from 'vscode';

import { GitExtension } from './api/git';
import { Commit } from '../models';

const gitpath = vscode.workspace.getConfiguration('git').get('path') || 'git';


export function commits(cwd: string): Promise<Array<Commit>> {
    return new Promise((resolve, reject) => {

        child_process.exec(gitpath + ' log --tags --decorate --simplify-by-decoration --oneline', {
            cwd: cwd
        }, (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
            if (stderr) {
                return reject(stderr);
            }

            const commits: Array<Commit> = stdout
                .replace(/\r\n/mg, '\n')
                .split('\n')
                .flatMap(line => {
                    const matched = line.match(/([a-z0-9]{7})\s\((.*)\)\s(.*)/);
                    if (matched) {
                        return {
                            hash: matched[1],
                            name: matched[2].match(/\s([^,\s]+)/)?.[1],
                            commitMessage: matched[3]
                        };
                    }

                    return [];
                });


            resolve(commits);
        });

    });

}

export function pull(cwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
        child_process.exec(gitpath + ' pull', {
            cwd: cwd
        }, (error, stdout, stderr) => {
            if (error) {
                return reject(`PULL_FAILED: ${error.message}`);
            }
            if (stderr && !/\[new tag\]/.test(stderr)) {
                return reject(`PULL_FAILED: ${stderr}`);
            }
            resolve('PULL');
        });
    });
}


export function push(cwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
        child_process.exec(gitpath + ' push', {
            cwd: cwd
        }, (error, stdout, stderr) => {
            if (error) {
                return reject(`SYNC_FAILED: ${error.message}`);
            }
            if (stderr && !/\[new tag\]/.test(stderr)) {
                return reject(`SYNC_FAILED: ${stderr}`);
            }
            resolve('SYNCED');
        });
    });
}
