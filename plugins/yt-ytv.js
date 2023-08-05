import fetch from 'node-fetch'
import { youtubedl } from '@bochilteam/scraper-sosmed'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!(args[0] || '').match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`Invalid Youtube URL.`)
	try {
		let anu = await youtubedl(args[0])
		let list = Object.keys(anu.video).toString()
		let data = anu.video[`${list.includes('36') ? '360p' : list.includes('24') ? '240p' : '144p'}`]
		let url = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nUnable to send, maximum file size is 400 MB`)
		let txt = `*${anu.title}*\n\n`
		txt += `⭔ Watch : ${args[0]}\n`
		txt += `⭔ Resolution : ${data.quality}\n`
		txt += `⭔ Size : ${data.fileSizeH}`
		await conn.sendMsg(m.chat, { video: { url: url }, caption: txt }, { quoted: m })
	} catch (e) {
		console.log(e)
			try {
				let res = await fetch(`https://api.lolhuman.xyz/api/ytvideo?apikey=${apilol}&url=${args[0]}`)
				let anu = await res.json()
				anu = anu.result
				if (!anu.link.link) throw Error()
				let vsize = anu.link.size.slice(-2)
				if (vsize == 'GB') return m.reply(`Don't worry.\nWhere can I send videos ${anu.link.size}`)
				if (!somematch(['kB','KB'], vsize) && parseInt(anu.link.size) > 400) return m.reply(`Filesize: ${anu.link.size}\nUnable to send, maximum file size is 400 MB`)
				let txt = `*${anu.title}*\n\n`
				txt += `⭔ Watch : ${args[0]}\n`
				txt += `⭔ Resolution : ${anu.link.resolution}\n`
				txt += `⭔ Size : ${anu.link.size}`
				await conn.sendMsg(m.chat, { video: { url: anu.link.link }, caption: txt }, { quoted: m })
			} catch (e) {
				console.log(e)
				try {
					let res = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${apilol}&url=${args[0]}`)
					let anu = await res.json()
					anu = anu.result
					let vsize = anu.size.slice(-2)
					if (vsize == 'GB') return m.reply(`Don't worry.\nWhere can I send videos ${anu.size}`)
					if (!somematch(['kB','KB'], vsize) && parseInt(anu.size) > 400) return m.reply(`Filesize: ${anu.size}\nUnable to send, maximum file size is 400 MB`)
					let txt = `*${anu.title}*\n\n`
					txt += `⭔ Watch : ${args[0]}\n`
					txt += `⭔ Size : ${anu.size}`
					await conn.sendMsg(m.chat, { video: { url: anu.link }, caption: txt }, { quoted: m })
				} catch (e) {
					console.log(e)
					try {
						let { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
						let video, source, res, link, lastError
						video = _video['240p']
						if (video.fileSize > 400000) return m.reply(`Filesize: ${video.fileSizeH}\nUnable to send, maximum file size is 400 MB`)
						link = await video.download()
						if (!link) throw Error()
						if (link) res = await fetch(link)
						if (res) source = await res.arrayBuffer()
						let txt = `*${title}*\n\n`
						txt += `⭔ Watch : ${args[0]}\n`
						txt += `⭔ Resolution : ${video.quality}\n`
						txt += `⭔ Size : ${video.fileSizeH}`
						await conn.sendMsg(m.chat, { video: { url: link }, caption: txt }, { quoted: m })
					} catch (e) {
						console.log(e)
						m.reply(`Invalid Youtube URL / there is an error.`)
					}
				}
			}
		}
	}

handler.help = ['ytv <url>']
handler.tags = ['downloader']
handler.command = /^(yt(v(ideo)?|mp4))$/i

export default handler

const somematch = ( data, id ) => {
	let res = data.find(el => el === id )
	return res ? true : false};
