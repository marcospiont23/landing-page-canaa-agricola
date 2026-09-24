const { execFileSync } = require('node:child_process');
const { cpSync, existsSync, mkdirSync, readdirSync, rmSync } = require('node:fs');
const { join } = require('node:path');

const projectRoot = join(__dirname, '..');
const outputDirectory = join(projectRoot, 'dist');
const requiredPages = ['index.html', 'login.html', 'admin.html', 'politica-de-privacidade.html'];
const publicFiles = [...requiredPages, '_headers', '.htaccess'];
const publicDirectories = ['css', 'js', 'images'];
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

rmSync(outputDirectory, { recursive: true, force: true });
mkdirSync(outputDirectory, { recursive: true });

for (const file of publicFiles) {
	cpSync(join(projectRoot, file), join(outputDirectory, file));
}

for (const directory of publicDirectories) {
	cpSync(join(projectRoot, directory), join(outputDirectory, directory), { recursive: true });
}

console.log(`Build validado: ${requiredPages.length} páginas e ${scripts.length} scripts verificados.`);
console.log(`Saída estática gerada em ${outputDirectory}.`);