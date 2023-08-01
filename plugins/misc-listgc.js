let handler = async (m, { conn, usedPrefix, command, text, isBotAdmin }) => {
	text = text.split('|')
	let gc, groups, dt = global.DATABASE.data.chats
	try {
		gc = await conn.groupFetchAllParticipating()
		groups = Object.values(await conn.groupFetchAllParticipating()).map(v => v.id)
	} catch { return }
	let x, y, name, sisa, array = []
	let txt = `*LIST GROUP : ${groups.length}*`
	for (let x of groups) {
		try {
			txt += `\n\n*• Group Subject : ${gc[x].subject}*
*• id :* ${gc[x].id}
*• Members :* ${gc[x].participants.length}
*• Created :* ${new Date(gc[x].creation * 1000).toDateString()}
*• Total Admin :* ${gc[x].participants.filter(v => v.admin == 'admin').length}
*• isBotAdmin :* ${gc[x].participants.filter(v => v.id == conn.user.jid && v.admin == 'admin').length == 0 ? 'No' : 'Yes'}
*• Ephemeral :* ${gc[x].ephemeralDuration ? `${gc[x].ephemeralDuration / 86400} Day(s)` : 'Off'}
*• Edit Group Info :* ${gc[x].restrict ? 'Only Admins' : 'All Participants'}
*• Send Messages :* ${gc[x].announce ? 'Only Admins' : 'All Participants'}
───────────────────`
		} catch (e) {console.log(e) }
	}
	await m.reply(txt)
}

handler.command = /^list(gc|gro?up)$/i

export default handler
