import { chdir } from 'node:process';
import { build } from 'astro';
import { globalConfig } from './config.js';
import { postsSymbolicLink } from './utils.js';


export default async () => {
    postsSymbolicLink();
    const root = globalConfig.paths.root;
    await chdir(root);
    return await build({
        host: globalConfig.astroConfig.host,
        outDir: globalConfig.paths.astroOutDir,
        base: globalConfig.astroConfig.base,
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
        },
    });
}
