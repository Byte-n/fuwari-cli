import path from 'node:path';
import { chdir } from 'node:process';
import { fileURLToPath } from 'node:url';
import { preview } from 'astro';
import { globalConfig } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, '../');

export default async () => {
    const root = globalConfig.paths.root;
    await chdir(rootPath);
    return await preview({
        outDir: globalConfig.paths.astroOutDir,
        root: root,
        configFile: './astro.config.mjs',
        vite: {
            root: root,
            resolve: {
                alias: globalConfig.viteResolveAlias,
            },
        },
    });
}
