const { execFileSync } = require('node:child_process');
const { existsSync, readdirSync } = require('node:fs');
const { join } = require('node:path');

const projectRoot = join(__dirname, '..');
const requiredPages = ['index.html', 'login.html', 'admin.html', 'politica-de-privacidade.html'];
const scriptsDirectory = join(projectRoot, 'js');

for (const page of requiredPages) {
	if (!existsSync(join(projectRoot, page))) {
		throw new Error(`Página obrigatória não encontrada: ${page}`);
	}
}

const scripts = readdirSync(scriptsDirectory)
	.filter((file) => file.endsWith('.js'))
	.sort();

for (const script of scripts) {
	execFileSync(process.execPath, ['--check', join(scriptsDirectory, script)], { stdio: 'inherit' });
}

console.log(`Build validado: ${requiredPages.length} páginas e ${scripts.length} scripts verificados.`);