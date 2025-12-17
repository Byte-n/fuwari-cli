import { globalConfig } from './config.js';
import fs from 'node:fs';
import path from 'node:path';

export function postsSymbolicLink () {
    const { astroContentPostsDir, userPostsDir, astroContentSpecDir, userSpecDir } = globalConfig.paths;
    symbolicLink(userPostsDir, astroContentPostsDir);
    symbolicLink(userSpecDir, astroContentSpecDir);
}

function symbolicLink (source, target) {
    if (!fs.existsSync(source)) {
        console.log('博客目录不存在:', source);
        return;
    }
    // 已有文件/目录/软链，无论为何，都删掉
    if (fs.existsSync(target)) {
        try {
            fs.rmSync(target, { recursive: true, force: true });
        } catch (err) {
            console.error('删除旧目录/链接失败:', err);
        }
    }
    // 创建软链接
    try {
        const isWindows = process.platform === 'win32';
        if (isWindows) {
            fs.symlinkSync(source, target, 'dir');
        } else {
            fs.symlinkSync(source, target);
        }
    } catch (error) {
        console.error('创建软链接失败:', error);
    }
}

export function getVersion () {
    try {
        const packageJson = JSON.parse(
            fs.readFileSync(path.resolve(globalConfig.paths.root, 'package.json'), 'utf8'),
        );
        return packageJson.version ?? '未知';
    } catch {
        return '未知';
    }
}
