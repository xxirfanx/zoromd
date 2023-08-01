import fetch from 'node-fetch'
import yts from "yt-search"
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Baby Calm Down`
const yt_play = await search(args.join(" "))
let additionalText = ''
if (command === 'play') {
additionalText = 'audio' }
let texto1 = `📌 *${yt_play[0].title}*\n
🪶 *Author :*  ${yt_play[0].author.name}
📆 *Publicado:* ${yt_play[0].ago}
⌚ *Duration :*  ${secondString(yt_play[0].duration.seconds)}
👁️ *Views :* ${`${MilesNumber(yt_play[0].views)}`}
🌀 *Url :* ${yt_play[0].url}\n
*_sending ${additionalText}, wait a moment．．．_*`.trim()
conn.sendMessage(m.chat, { image: { url: yt_play[0].thumbnail }, caption: texto1 }, { quoted: m })
if (command == 'play') {
try {
let q = '128kbps'
let v = yt_play[0].url
const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v)).catch(async _ => await youtubedlv3(v))
const dl_url = await yt.audio[q].download()
const ttl = await yt.title
const size = await yt.audio[q].fileSizeH
await conn.sendFAudio(m.chat, { audio: { url: dl_url }, mimetype: 'audio/mpeg', fileName: ttl + `.mp3` }, m, yt_play[0].title, yt_play[0].thumbnail, yt_play[0].url, global.me) 
} catch {
try {
let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${apilol}&url=${yt_play[0].url}`)    
let lolh = await lolhuman.json()
let n = lolh.result.title || 'error'
await conn.sendFAudio(m.chat, { audio: { url: lolh.result.link }, mimetype: 'audio/mpeg', fileName: `${n}.mp3` }, m, lolh.result.title, lolh.result.thumbnail, yt_play[0].url, global.me) 
} catch {
throw "```404 ᴇʀʀᴏʀ```"}
}
}
}

handler.help = handler.alias = ['play']
handler.tags = ['downloader']
handler.command = /^(play)$/i

export default handler

async function search(query, options = {}) {
const search = await yts.search({ query, hl: "es", gl: "ES", ...options });
return search.videos};

function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = "$1.";
let arr = number.toString().split(".");
arr[0] = arr[0].replace(exp, rep);
return arr[1] ? arr.join(".") : arr[0]};

function secondString(seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor((seconds % (3600 * 24)) / 3600);
var m = Math.floor((seconds % 3600) / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " minutes, " : " minutes, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
return dDisplay + hDisplay + mDisplay + sDisplay};