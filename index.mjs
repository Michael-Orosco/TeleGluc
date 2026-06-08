import { readdir, writeFile } from 'fs/promises';
import { join } from 'path';

const assetsDir = 'dist/client/assets';
const files = await readdir(assetsDir);

const js = files.filter(f => f.endsWith('.js') && f.startsWith('index'));
const css = files.filter(f => f.endsWith('.css'));

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>TeleGluc</title>
    ${css.map(f => `<link rel="stylesheet" href="/assets/${f}" />`).join('\n    ')}
  </head>
  <body>
    <div id="root"></div>
    ${js.map(f => `<script type="module" src="/assets/${f}"></script>`).join('\n    ')}
  </body>
</html>`;

await writeFile('dist/client/index.html', html);
console.log('index.html generado correctamente');