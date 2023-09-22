import fg from 'api-dylux' 
import { tiktokdl } from '@bochilteam/scraper'

let handler = async (m, { conn, text, args, usedPrefix, command}) => {
if (!args[0]) throw `Enter the link of the video Tiktok`
if (!args[0].match(/tiktok/gi)) throw `Verify that the link is from tiktok`
let old = new Date()
let txt = `∘  *Fetching* : ${((new Date - old) * 1)} ms`
conn.reply(m.chat, global.wait, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: '📤| downloads By Zoro md 🌸',
body: me,
previewType: 0, thumbnail: thumb2, jpegThumbnail: thumb,
sourceUrl: 'https://github.com/xxirfanx' }}})
try {
let p = await fg.tiktok(args[0]) 
conn.sendFile(m.chat, p.play, 'tiktok.mp4', txt, m)
} catch {  	
try { 
const { author: { nickname }, video, description } = await tiktokdl(args[0])
const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd
if (!url) throw global.eror
conn.sendFile(m.chat, url, 'fb.mp4', ``, m)
} catch {
m.reply('*☓ An unexpected error occurred*')
}}}

handler.help = ['tiktok'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

export default handler
