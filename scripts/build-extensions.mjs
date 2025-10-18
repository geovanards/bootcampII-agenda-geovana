import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const dist = 'dist';

// Limpa e recria a pasta dist
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// Copia arquivos necessários
for (const f of ['manifest.json', 'popup.html', 'popup.js', 'styles.css']) {
  if (fs.existsSync(f)) {
    fs.copyFileSync(f, path.join(dist, f));
  }
}

// Cria o arquivo ZIP da extensão
const zipPath = path.join(dist, 'extension.zip');
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

await new Promise((res, rej) => {
  output.on('close', res);
  archive.on('error', rej);
  archive.pipe(output);
  archive.glob('**/*', {
    cwd: dist,
    ignore: ['extension.zip']
  });
  archive.finalize();
});

console.log("dist/ pronto e extensão gerada com sucesso!")
