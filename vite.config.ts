import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import suid from '@suid/vite-plugin';

const repo = process.env.GITHUB_REPOSITORY;
const base = `/${repo?.split('/')[1] ?? ''}`;

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

export default defineConfig({
    mode,
    define: {
        BASE_URL: JSON.stringify(base),
        APP_TITLE: JSON.stringify('TSB Data Viewer'),
    },
    root: './src',
    base,
    publicDir: '../public',
    plugins: [
        solid(),
        suid(),
    ],
    build: {
        target: 'chrome105',
        outDir: '../dist',
        minify: !isDev,
        sourcemap: isDev,
        emptyOutDir: true,
    },
});
