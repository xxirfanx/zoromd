console.log('✅ㅤGetting started...');

import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';

// https://stackoverflow.com/a/50052194
const args = [join(__dirname, 'main.js'), ...process.argv.slice(2)];
const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
const rl = createInterface(process.stdin, process.stdout);
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, './package.json'));
const { say } = cfonts;

say('Lightweight\nWhatsApp Bot MD', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']});
say('Bot created by lua sakura', {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']});

let isRunning = false;
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
  if (isRunning) return;
  isRunning = true;

  say('Zoro md - WhatsApp Bot - baileys', {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']});

  setupMaster({
    exec: args[0],
    args: args.slice(1)});
  let p = fork();
	p.on('message', data => {
		console.log('[RECEIVED]', data);
		switch (data) {
			case 'reset':
				p.process.kill();
				isRunning = false;
				start.apply(this, arguments);
				break;
			case 'uptime':
				p.send(process.uptime());
				break;
		}
	});
	p.on('exit', (_, code) => {
		isRunning = false;
		console.error('❎ㅤAn unexpected error occurred:', code);
		if (code === 0) return
		watchFile(args[0], () => {
			unwatchFile(args[0]);
			start(file);
		});
	});
  if (!opts['test']) {
    if (!rl.listenerCount()) rl.on('line', line => {
			p.emit('message', line.trim());
		});
  }
}

start('main.js');
