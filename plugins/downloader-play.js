/** 
 *  Created By LUA SER OFC
 *  CopyRight 2024 MIT License
 *  My Github : https://github.com/xxirfanx
 *  My Instagram : https://instagram.com/luaserofc
 *  My Youtube : https://youtube.com/@luaserofc
*/

import yts from 'yt-search';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw ` 🦄Use example *${usedPrefix + command}* Somewhere Only We Know`;
	let res = await yts(text)
	let vid = res.videos[0]
	if (!vid) throw `🍊 Audio not find title song `;
	let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
	//const url = 'https://www.youtube.com/watch?v=' + videoId
	m.react(`🐢`) 
  let play = `
📺 *Title:* ${vid.title}
⌛ *Duration:* ${vid.timestamp}
👀 *Views:* ${vid.views.toLocaleString()}
📅 *Upload:* ${vid.ago}
`
 await conn.sendButton2(m.chat, play, '> Zoro md', thumbnail, [
    ['🎶 MP3', `${usedPrefix}vfmp3 ${url}`]], null, null, m)
}

handler.help = ['play'].map((v) => v + ' <query>')
handler.tags = ['downloader']
handler.command = ['play', 'song']
handler.disabled = false

export default handler
