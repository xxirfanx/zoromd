import './config.js'

import path, { join } from 'path'
import { platform } from 'process'
import chalk from 'chalk'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }

import * as ws from 'ws'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import syntaxerror from 'syntax-error'
import { tmpdir } from 'os'
import Pino from "pino"
import readline from 'readline'
import P from "pino"
import pretty from 'pino-pretty'
import NodeCache from "node-cache"
import { format } from 'util'
import {
    makeWaSocket,
    protoType,
    serialize
} from './lib/simple.js';
import { Low } from 'lowdb';
import store from './lib/store.js';
import { JSONFile } from "lowdb/node"
import cloudDBAdapter from './lib/cloudDBAdapter.js'
import {
    mongoDB,
    mongoDBV2
} from './lib/mongoDB.js'
const {proto} = (await import('@adiwajshing/baileys')).default;
const {
	DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, Browsers, makeCacheableSignalKeyStore, PHONENUMBER_MCC
} = await import('@adiwajshing/baileys')

const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 27257

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date
}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ?
      (opts['mongodbv2'] ? new mongoDBV2(opts['db']) : new mongoDB(opts['db'])) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
    if (db.READ) return new Promise((resolve) => setInterval(async function () {
        if (!db.READ) {
            clearInterval(this)
            resolve(db.data == null ? global.loadDatabase() : db.data)
        }
    }, 1 * 1000))
    if (db.data !== null) return
    db.READ = true
    await db.read().catch(console.error)
    db.READ = null
    db.data = {
        users: {},
        chats: {},
        stats: {},
        msgs: {},
        sticker: {},
        settings: {},
        ...(db.data || {})
    }
    global.db.chain = chain(db.data)
}
loadDatabase()

const usePairingCode = !process.argv.includes('--use-pairing-code')
const useMobile = process.argv.includes('--mobile')

var question = function(text) {
            return new Promise(function(resolve) {
                rl.question(text, resolve);
            });
        };
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

global.authFile = `sessions`;

const msgRetryCounterCache = new NodeCache()
const msgRetryCounterMap = (MessageRetryMap) => { };

const { state, saveState, saveCreds } = await useMultiFileAuthState(global.authFile);
const { version } = await fetchLatestBaileysVersion();

const logger = Pino({
    transport: {
        target: 'pino-pretty',
        optons: {
            colorize: true,
            levelFirst: true,
            ignore: 'hostname',
            translateTime: true 
        }
    }
}).child({ class: 'baileys'})

const connectionOptions = {
  printQRInTerminal: !usePairingCode,
  patchMessageBeforeSending: (message) => {
    const requiresPatch = !!( message.buttonsMessage || message.templateMessage || message.listMessage );
    if (requiresPatch) {
      message = {viewOnceMessage: {message: {messageContextInfo: {deviceListMetadataVersion: 2, deviceListMetadata: {}}, ...message}}};
    }
    return message;
  },
  getMessage: async (key) => {
    if (store) {
      const msg = await store.loadMessage(key.remoteJid, key.id);
      return conn.chats[key.remoteJid] && conn.chats[key.remoteJid].messages[key.id] ? conn.chats[key.remoteJid].messages[key.id].message : undefined;
    }
    return proto.Message.fromObject({});
  },
  msgRetryCounterMap,
  logger: Pino({level: 'silent'}),
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, Pino({level: 'silent'})),
  },
  browser: Browsers.ubuntu('Chrome'), // by lua fixed
  version,
  downloadHistory: false,
  defaultQueryTimeoutMs: undefined,
};

global.conn = makeWaSocket(connectionOptions)
conn.isInit = false

conn.logger.info(`W A I T I N G\n`);

if(usePairingCode && !conn.authState.creds.registered) {
		if(useMobile) throw new Error('Cannot use pairing code with mobile api')
		const { registration } = { registration: {} }
		let phoneNumber = ''
		do {
			phoneNumber = await question(chalk.blueBright('Input a Valid number start with region code. Example : 91xxx:\n'))
		} while (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v)))
		rl.close()
		phoneNumber = phoneNumber.replace(/\D/g,'')
		console.log(chalk.bgWhite(chalk.blue('Generating code...')))
		setTimeout(async () => {
			let code = await conn.requestPairingCode(phoneNumber)
			code = code?.match(/.{1,4}/g)?.join('-') || code
			console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
		}, 3000)
	}
	
if (!opts['test']) {
    (await import('./server.js')).default(PORT)
    if (global.db) {
        setInterval(async () => {
            if (global.db.data) await global.db.write().catch(console.error)
            // if (opts['autocleartmp'] && (global.support || {}).find)(tmp = [os.tmpdir(), 'tmp'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])));
          clearTmp()
        }, 30 * 1000);
    }
}

function clearTmp() {
    const tmp = [tmpdir(), join(__dirname, './tmp')];
    const filename = [];
    tmp.forEach((dirname) => readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))));
    return filename.map((file) => {
        const stats = statSync(file);
        if (stats.isFile() && (Date.now() - stats.mtimeMs >= 5 * 60 * 1000)) return unlinkSync(file);
        return false;
    });
}

async function connectionUpdate(update) {
  const { receivedPendingNotifications, connection, lastDisconnect, isOnline, isNewLogin } = update
  if (isNewLogin) conn.isInit = true
  if (connection == 'connecting') console.log(chalk.redBright('⚡ Activating Bot, Please wait a moment...'))
  if (connection == 'open') console.log(chalk.green('✅ Connected'))
  if (isOnline == true) console.log(chalk.green('Active Status'))
  if (isOnline == false) console.log(chalk.red('Dead Status'))
  if (receivedPendingNotifications) console.log(chalk.yellow('Waiting for New Messages'))
  if (connection == 'close') console.log(chalk.red('⏱️ lost connection & tried to reconnect...'))
  global.timestamp.connect = new Date
  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== ws.default.CONNECTING) {
    console.log(global.reloadHandler(true))
  }
  console.log(JSON.stringify(update, null, 2))
  if (global.db.data == null) await global.loadDatabase()
}

process.on('uncaughtException', console.error);
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
    try {
        const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
    } catch (error) {
        console.error;
    }
    if (restatConn) {
        const oldChats = global.conn.chats;
        try {
            global.conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        global.conn = makeWaSocket(connectionOptions, {
            chats: oldChats
        });
        isInit = true;
    }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler);
    conn.ev.off('messages.update', conn.pollUpdate);
    conn.ev.off('group-participants.update', conn.participantsUpdate);
    conn.ev.off('message.delete', conn.onDelete);
    conn.ev.off("presence.update", conn.presenceUpdate);
    conn.ev.off('connection.update', conn.connectionUpdate);
    conn.ev.off('creds.update', conn.credsUpdate);
  }

  conn.welcome = 'Hai, @user!\nWelcome to @subject\n\n@desc'
  conn.bye = 'GOOD BYE @user!'
  conn.spromote = '@user now admin!'
  conn.sdemote = '@user now not admin!'
	
  conn.handler = handler.handler.bind(global.conn);
  conn.pollUpdate = handler.pollUpdate.bind(global.conn);
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.presenceUpdate = handler.presenceUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn);

  const currentDateTime = new Date();
    const messageDateTime = new Date(conn.ev);
    if (currentDateTime >= messageDateTime) {
        const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
    } else {
        const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
    }

  conn.ev.on('messages.upsert', conn.handler);
  conn.ev.on("messages.update", conn.pollUpdate);
  conn.ev.on('group-participants.update', conn.participantsUpdate);
  conn.ev.on('message.delete', conn.onDelete);
  conn.ev.on("presence.update", conn.presenceUpdate);
  conn.ev.on('connection.update', conn.connectionUpdate);
  conn.ev.on('creds.update', conn.credsUpdate);
  isInit = false
   return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
    for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
        try {
            const file = global.__filename(join(pluginFolder, filename));
            const module = await import(file);
            global.plugins[filename] = module.default || module;
        } catch (e) {
            conn.logger.error(e);
            delete global.plugins[filename];
        }
    }
}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error);

global.reload = async (_ev, filename) => {
    if (pluginFilter(filename)) {
        const dir = global.__filename(join(pluginFolder, filename), true);
        if (filename in global.plugins) {
            if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`);
            else {
                conn.logger.warn(`deleted plugin - '${filename}'`);
                return delete global.plugins[filename];
            }
        } else conn.logger.info(`new plugin - '${filename}'`);
        const err = syntaxerror(readFileSync(dir), filename, {
            sourceType: 'module',
            allowAwaitOutsideFunction: true,
        });
        if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`);
        else {
            try {
                const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
                global.plugins[filename] = module.default || module;
            } catch (e) {
                conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
            } finally {
                global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
            }
        }
    }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();

/* QuickTest */
async function _quickTest() {
    const test = await Promise.all([
        spawn('ffmpeg'),
        spawn('ffprobe'),
        spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
        spawn('convert'),
        spawn('magick'),
        spawn('gm'),
        spawn('find', ['--version']),
    ].map((p) => {
        return Promise.race([
            new Promise((resolve) => {
                p.on('close', (code) => {
                    resolve(code !== 127);
                });
            }),
            new Promise((resolve) => {
                p.on('error', (_) => resolve(false));
            })
        ]);
    }));
    const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
    const s = global.support = {
        ffmpeg,
        ffprobe,
        ffmpegWebp,
        convert,
        magick,
        gm,
        find
    };
    Object.freeze(global.support);
}

function clockString(ms) {
    const d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [d, ' Day ', h, ' hours ', m, ' Minutes ', s, ' Second '].map((v) => v.toString().padStart(2, '0')).join('');
}

_quickTest().catch(console.error);
