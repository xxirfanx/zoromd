// @ts-check
import yargs from 'yargs'
import os from 'os'
import path from 'path'
import {
	fileURLToPath,
	pathToFileURL
} from 'url'
import {
	createRequire
} from 'module'
import fs from 'fs'
import Stream, {
	Readable
} from 'stream'

/** 
 * @param {ImportMeta | string} pathURL 
 * @param {boolean?} rmPrefix if value is `'true'`, it will remove `'file://'` prefix, if windows it will automatically false
 */
var __filename = function filename(pathURL =
	import.meta, rmPrefix = os.platform() !== 'win32') {
	var path = /** @type {ImportMeta} */ (pathURL).url || /** @type {String} */ (pathURL)
	return rmPrefix ?
		/file:\/\/\//.test(path) ?
		fileURLToPath(path) :
		path : /file:\/\/\//.test(path) ?
		path : pathToFileURL(path).href
}

/** @param {ImportMeta | string} pathURL */
var __dirname = function dirname(pathURL) {
	var dir = __filename(pathURL, true)
	var regex = /\/$/
	return regex.test(dir) ?
		dir : fs.existsSync(dir) &&
		fs.statSync(dir).isDirectory() ?
		dir.replace(regex, '') :
		path.dirname(dir)
}

/** @param {ImportMeta | string} dir */
var __require = function require(dir =
	import.meta) {
	var path = /** @type {ImportMeta} */ (dir).url || /** @type {String} */ (dir)
	return createRequire(path)
}
/** @param {string} file */
var checkFileExists = (file) => fs.promises.access(file, fs.constants.F_OK).then(() => true).catch(() => false)

/** @type {(name: string, path: string, query: { [Key: string]: any }, apikeyqueryname: string) => string} */
var API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
	...query,
	...(apikeyqueryname ? {
		[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
	} : {})
})) : '')
/** @type {ReturnType<yargs.Argv['parse']>} */
var opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
var prefix = new RegExp('^[' + (opts['prefix'] || '‎/!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')


/**
 * @param {Readable} stream 
 * @param {string} file 
 * @returns {Promise<void>}
 */
var saveStreamToFile = (stream, file) => new Promise((resolve, reject) => {
	var writable = stream.pipe(fs.createWriteStream(file))
	writable.once('finish', () => {
		resolve()
		writable.destroy()
	})
	writable.once('error', () => {
		reject()
		writable.destroy()
	})
})


var kDestroyed = Symbol('kDestroyed');
var kIsReadable = Symbol('kIsReadable');
var isReadableNodeStream = (obj, strict = false) => {
	return !!(
		obj &&
		typeof obj.pipe === 'function' &&
		typeof obj.on === 'function' &&
		(
			!strict ||
			(typeof obj.pause === 'function' && typeof obj.resume === 'function')
		) &&
		(!obj._writableState || obj._readableState?.readable !== false) && // Duplex
		(!obj._writableState || obj._readableState) // Writable has .pipe.
	);
}
var isNodeStream = (obj) => {
	return (
		obj &&
		(
			obj._readableState ||
			obj._writableState ||
			(typeof obj.write === 'function' && typeof obj.on === 'function') ||
			(typeof obj.pipe === 'function' && typeof obj.on === 'function')
		)
	);
}
var isDestroyed = (stream) => {
	if (!isNodeStream(stream)) return null;
	var wState = stream._writableState;
	var rState = stream._readableState;
	var state = wState || rState;
	return !!(stream.destroyed || stream[kDestroyed] || state?.destroyed);
}
var isReadableFinished = (stream, strict) => {
	if (!isReadableNodeStream(stream)) return null;
	var rState = stream._readableState;
	if (rState?.errored) return false;
	if (typeof rState?.endEmitted !== 'boolean') return null;
	return !!(
		rState.endEmitted ||
		(strict === false && rState.ended === true && rState.length === 0)
	);
}
var isReadableStream = (stream) => {
	if (typeof Stream.isReadable === 'function') return Stream.isReadable(stream)
	if (stream && stream[kIsReadable] != null) return stream[kIsReadable];
	if (typeof stream?.readable !== 'boolean') return null;
	if (isDestroyed(stream)) return false;
	return (
		isReadableNodeStream(stream) &&
		!!stream.readable &&
		!isReadableFinished(stream)
	) || stream instanceof fs.ReadStream || stream instanceof Readable;
}

export default {
	__filename,
	__dirname,
	__require,
	checkFileExists,
	API,

	saveStreamToFile,
	isReadableStream,

	opts,
	prefix,
}
