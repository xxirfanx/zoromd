/** 
 *  Created By LUA SER OFC
 *  CopyRight 2024 MIT License
 *  My Github : https://github.com/xxirfanx
 *  My Instagram : https://instagram.com/luaserofc
 *  My Youtube : https://youtube.com/@luaserofc
*/

const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, {conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        await conn.reply(m.chat, `*⛽ Detected Link*
            
We do not allow links from other groups 
I'm sorry *@${m.sender.split('@')[0]}* you will be expelled from the group ${isBotAdmin ? '' : '\n\n Im not an admin so I cant expel you :"v'}`, null, { mentions: [m.sender] } )
        if (isBotAdmin && chat.antiLink) {
        	await conn.sendMessage(m.chat, { delete: m.key })
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!chat.antiLink) return //m.reply('')
    }
    return !0
}
