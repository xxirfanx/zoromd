let handler = async (m, { conn }) => {
	let who = m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : ''
	if (!who || who.includes(conn.user.jid)) throw `*quote / @tag* one of !`
	try {
		await conn.groupParticipantsUpdate(m.chat, [who], 'demote')
    m.reply('Succes demote')
	} catch (e) {
		console.log(e)
	}
}

handler.menugroup = ['demote @tag']
handler.tagsgroup = ['group']
handler.command = /^(demote)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler