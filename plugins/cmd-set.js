let handler = async (m, { text, usedPrefix, command }) => {
	global.db.data.sticker = global.db.data.sticker || {}
	if (!m.quoted) throw `Reply to stickers with commands *${usedPrefix + command}*`
	if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
	if (!text) throw `Use:\n${usedPrefix + command} <text>\n\nExample:\n${usedPrefix + command} tes`
	let sticker = global.db.data.sticker
	let hash = m.quoted.fileSha256.toString('base64')
	if (sticker[hash] && sticker[hash].locked) throw 'You do not have permission to change the order of this sticker'
	sticker[hash] = {
		text,
		mentionedJid: m.mentionedJid,
		creator: m.sender,
		at: + new Date,
		locked: false,
	}
	m.reply(`Succeed!`)
}

handler.help = handler.alias = ['cmdset']
handler.tags = ['database']
handler.command = /^((set|add)cmd|cmd(set|add))$/i

handler.database = true

export default handler
