let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	text = text.split(`|`)
	if (!text || text.length == 1) throw `Format :\n*${usedPrefix + command} description|poll1|ppllh2|dst...*\n\nContoh :\n*${usedPrefix + command} romdom admin|iya|tidak*`
	if (text.length > 1 && text.length < 3) throw `[!] Minimum inputs *2* selection!`
	if (text.length > 13) throw `[!] Too many choices, max *12* !`
	let array = []
	text.slice(1).forEach(function(i) { array.push(i) })
	await conn.sendPoll(m.chat, text[0], array)
}

handler.help = ['poll <desc>|opts1|opts2|etc...']
handler.tags = ['group']
handler.command = /^((create)?poll(ing)?)$/i

handler.group = true

export default handler