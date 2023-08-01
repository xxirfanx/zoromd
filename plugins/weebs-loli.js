import Booru from 'booru'
import fetch from 'node-fetch'
let sites = ['sb', 'kn', 'kc']

let handler = async (m, { conn, usedPrefix, command }) => {
	let res = await Booru.search(sites.getRandom(), ['loli'], { random: true })
	let url = res[0].fileUrl
  conn.sendFile(m.chat, url, null, 'Random Image Loli', '', m)
}
handler.help = ['loli']
handler.tags = ['weebs']
handler.command = /^(loli)$/i

export default handler