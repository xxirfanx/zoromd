/*
* Author LUA SER OFC
* Don't just use names
- What's New?
* New Features -> ptv
* made by lua ser ofc
*/
import {
    generateWAMessageContent
} from "@adiwajshing/baileys"

let handler = async (m, {
    conn,
    usedPrefix,
    command
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/webp|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media with commands\n\n${usedPrefix + command}`)
    let media = await await q.download?.()
    await m.reply(wait)

    try {
        let msg = await generateWAMessageContent({
            video: media
        }, {
            upload: conn.waUploadToServer
        })
        await conn.relayMessage(m.chat, {
            ptvMessage: msg.videoMessage
        }, {
            quoted: m
        })
    } catch (e) {
        try {
            let dataVideo = {
                ptvMessage: m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
            }
            await conn.relayMessage(m.chat, dataVideo, {})
        } catch (e) {
            await m.reply(eror)
        }
    }
}

handler.help = ['toptv (reply video)']
handler.tags = ['tools']
handler.command = /^(toptv)/i

export default handler
