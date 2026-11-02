import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath } from 'node:url';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  plugins: [
    sveltekit({
      extensions: ['.svelte', '.svx'],
      preprocess: [
        vitePreprocess(),
        mdsvex({ extensions: ['.svx'], layout: { runbook: fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url)) } })
      ],
        adapter: adapter({ fallback: undefined }),
        alias: { '#lib': 'src/lib' },
        prerender: { handleHttpError: 'warn', handleMissingId: 'warn', handleUnseenRoutes: 'ignore' }
    })
  ]
};


