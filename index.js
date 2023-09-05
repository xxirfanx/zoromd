import { spawn } from "child_process"; import { join, dirname } from 'path'; import cfonts from 'cfonts'; import { fileURLToPath } from 'url'; import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);

function start() {
	let args = [join(__dirname, 'main.js'), ...process.argv.slice(2)]
	let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
	.on('message', data => {
		if (data == 'reset') {
			console.log('Restarting...')
			p.kill()
        }
            if (data == 'uptime') {
                p.send(p.uptime());
            }
	})
	.on('exit', code => {
		console.error('Exited with code:', code)
		start()
	})
}

cfonts.say('Lightweight\nWhatsApp Bot MD', {
   font: 'chrome', // define the font face
    align: 'center', // define text alignment
    gradient: ['red', 'magenta'] // define all colors
}), cfonts.say('Bot created by lua sakura', {
   colors: ['system'],
   font: 'console',
   align: 'center'
}), start()
