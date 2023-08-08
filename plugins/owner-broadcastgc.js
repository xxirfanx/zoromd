const delay = time => new Promise(res => setTimeout(res, time))

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	let groups
	try { groups = Object.values(await conn.groupFetchAllParticipating()) }
	catch { return }
	let img, q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || q.mtype || ''
	if (mime) img = await q.download?.()
	conn.reply(m.chat, `_Send broadcast messages to ${groups.length} chat_`, m)
	let teks = `_*「 BroadCast - Bot 」*_${text ? ('\n\n'+text) : ''}`
	for (let x of groups) {
		let bot = x.participants.filter(x => x.id == conn.user.jid)
		if (x.restrict && bot[0].admin != 'admin') {}
		else {
			if (/image|video|viewOnce/g.test(mime)) await conn.sendFile(x.id, img, '', teks)
			else await conn.reply(x.id, teks)
		}
		await delay(ranNumb(2000, 5500))
	}
	await m.reply('Done Broadcast All Group Chat :)')
}

handler.help = ['bcgroup']
handler.tags = ['owner']
handler.command = /^((bc|broadcast)(gc|gro?ups?))$/i

handler.owner = true

export default handler

function ranNumb(min, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}
