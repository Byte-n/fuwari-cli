import { chdir } from 'node:process';
import { dev } from 'astro';
import { globalConfig } from './config.js';
import { postsSymbolicLink } from './utils.js';

export default async () => {
    postsSymbolicLink();
    const root = globalConfig.paths.root;
    await chdir(root);
    return await dev({
        root: root,
        configFile: './astro.config.mjs',
        vite: {
            root: root,
            optimizeDeps: {
                exclude: ['fuwari'],
            },
            resolve: {
                alias: globalConfig.viteResolveAlias,
            },
            server: {
                fs: {
                    allow: [globalConfig.paths.userRoot],
                },
                watch: {
                    ignored: [
                        '**/node_modules/**',
                        '!**/node_modules/fuwari/src/**',
                        '!**/node_modules/fuwari/.astro/**',
                    ],
                    followSymlinks: true,
                },
            },
        },
    });
};

