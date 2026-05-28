import { defineConfig } from 'astro/config';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function servePagefind() {
  const distDir = new URL('./dist', import.meta.url).pathname;
  return {
    name: 'serve-pagefind',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const pagefindPrefix = '/aws-genai-developer-pro-tutor/pagefind/';
        if (req.url?.startsWith(pagefindPrefix)) {
          const filePath = join(distDir, 'pagefind', req.url.slice(pagefindPrefix.length));
          if (existsSync(filePath)) {
            const ext = filePath.split('.').pop();
            const types = { js: 'application/javascript', json: 'application/json', css: 'text/css', pf_meta: 'application/octet-stream', pagefind: 'application/octet-stream' };
            res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
            res.end(readFileSync(filePath));
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  site: 'https://cloudnin9.github.io',
  base: '/aws-genai-developer-pro-tutor',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  vite: {
    plugins: [servePagefind()],
  },
});
