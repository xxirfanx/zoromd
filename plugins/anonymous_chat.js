async function handler(m, { command }) {
	this.anonymous = this.anonymous ? this.anonymous : {}
	switch (command) {
		case 'next':
		case 'leave': {
			let room = Object.values(this.anonymous).find(room => room.check(m.sender))
			if (!room) return this.reply(m.chat, '_You are not currently in anonymous chat_\n\ntype *.start* to find partners', m)
			m.reply('Ok')
			let other = room.other(m.sender)
			if (other) await this.reply(other, '_Partners leave chat_\n\ntype *.start* to find partners', m)
			delete this.anonymous[room.id]
			if (command === 'leave') break
		}
		case 'start': {
			if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.reply(m.chat, '_You are still in the anonymous chat, waiting for a partner_\n\ntype *.leave* to get out of', m)
			let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
			if (room) {
				await this.reply(room.a, '_Partner found!_', m)
				room.b = m.sender
				room.state = 'CHATTING'
				await this.reply(room.b, '_Partner found!_', m)
			} else {
				let id = + new Date
				this.anonymous[id] = {
					id,
					a: m.sender,
					b: '',
					state: 'WAITING',
					check: function (who = '') {
						return [this.a, this.b].includes(who)
					},
					other: function (who = '') {
						return who === this.a ? this.b : who === this.b ? this.a : ''
					},
				}
				await this.reply(m.chat, '_Waiting for partners..._\n\ntype *.leave* to get out of', m)
			}
			break
		}
	}
}

handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']

handler.private = true

export default handler
