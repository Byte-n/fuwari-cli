#!/usr/bin/env node
import { Command } from 'commander';
import build from './build.js';
import { initConfig } from './config.js';
import dev from './dev.js';
import preview from './preview.js';
import { getVersion } from './utils.js';


const program = new Command();
program
    .name('fuwari')
    .description('Fuwari CLI - Blog Framework')
    .version(getVersion(), '-v, --version', '显示版本信息')
    .helpOption('-h, --help', '显示帮助信息');

program
    .command('dev')
    .description('启动开发服务器')
    .action(async () => {
        console.log('启动开发服务器...');
        await dev();
    });

program
    .command('build')
    .description('构建项目')
    .action(async () => {
        console.log('开始构建...');
        await build();
    });

program
    .command('preview')
    .description('预览构建后的项目')
    .action(async () => {
        console.log('启动预览服务器...');
        await preview();
    });

program
    .command('version')
    .description('显示版本信息')
    .action(() => console.log(`Fuwari v${getVersion()}`));

async function go () {
    await initConfig();
    program.parseAsync(process.argv);
}

go();
