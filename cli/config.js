import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const defaultConfig = {
    astroConfig: {
        outDir: './dist',
        host: 'http://example.com',
        postsDir: './posts',
        specDir: './spec',
        base: '/',
    },
    paths: {
        userPostsDir: '',
        userSpecDir: '',
        root: path.resolve(__dirname, '../'),
        astroContentPostsDir: path.resolve(__dirname, '../src/content/posts'),
        astroContentSpecDir: path.resolve(__dirname, '../src/content/spec'),
        astroOutDir: '',
        userRoot: '',
        userConfig: path.resolve(__dirname, '../src/userConfig.json'),
    },
    viteResolveAlias: {
        '@': path.resolve(__dirname, '../src'),
        '@constants': path.resolve(__dirname, '../src/constants'),
        '@assets': path.resolve(__dirname, '../src/assets'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@content': path.resolve(__dirname, '../src/content'),
        '@i18n': path.resolve(__dirname, '../src/i18n'),
        '@layouts': path.resolve(__dirname, '../src/layouts'),
        '@pages': path.resolve(__dirname, '../src/pages'),
        '@plugins': path.resolve(__dirname, '../src/plugins'),
        '@styles': path.resolve(__dirname, '../src/styles'),
        '@types': path.resolve(__dirname, '../src/types'),
        '@utils': path.resolve(__dirname, '../src/utils'),
    },
};

export async function initConfig () {
    const userRoot = process.cwd();
    Object.assign(globalConfig, defaultConfig);
    const configPath = path.resolve(userRoot, 'fuwari.config.mjs');
    if (fs.existsSync(configPath)) {
        console.log('加载配置文件:', configPath);
        const fuwariConfig = await import(`file://${configPath}`);
        if (!fuwariConfig?.default) {
            throw new Error('配置文件无效, 无默认导出');
        }
        Object.assign(globalConfig.astroConfig, fuwariConfig.default.astroConfig);
        if (fuwariConfig.default.theme) {
            fs.writeFileSync(
                globalConfig.paths.userConfig,
                JSON.stringify(fuwariConfig.default.theme),
            );
        }
    }

    const userPostsDir = path.resolve(userRoot, globalConfig.astroConfig.postsDir);
    const userSpecDir = path.resolve(userRoot, globalConfig.astroConfig.specDir);
    const astroOutDir = path.resolve(userRoot, globalConfig.astroConfig.outDir);
    Object.assign(globalConfig.paths, { userPostsDir, userSpecDir, astroOutDir, userRoot });
    return globalConfig;
}

export const globalConfig = {};
