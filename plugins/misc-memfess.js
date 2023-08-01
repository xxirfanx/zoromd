import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}
    if (!text) throw `*Method of use :*\n\n${usedPrefix + command} number|sender's name|message\n\n*Note:*The sender's name can be a nickname or anonymous.\n\n*Example:* ${usedPrefix + command} ${m.sender.split`@`[0]}|${me}|Halo.`;
    let [jid, name, pesan] = text.split('|');
    if ((!jid || !name || !pesan)) throw `*Method of use :*\n\n${usedPrefix + command} number|sender's name|message\n\n*Note:* The sender's name can be a nickname or anonymous.\n\n*Example:* ${usedPrefix + command} ${m.sender.split`@`[0]}|${namebot}|Halo.`;
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Number not listed on whatsapp.';
    
   if (jid == m.sender) throw 'cant send menfess messages to self.'
    
    let mf = Object.values(conn.menfess).find(mf => mf.status === true)
    if (mf) return !0
    try {
    	let id = + new Date
        let txt = `Hai @${data.jid.split('@')[0]}, You received Menfess message.\n\nFrom: *${name}*\nMessage: \n${pesan}\n\nDo you want to reply to this message, sis? can sis. Sis, just type your message, I'll pass it on to you later *${name}*.`.trim();
        await conn.reply(data.jid, txt, m, { contextInfo: { externalAdReply: {title: global.me, body: global.author, sourceUrl: global.str, thumbnail: fs.readFileSync('./me.png') }}})
        .then(() => {
            m.reply('Successfully sent the message menfess.')
            conn.menfess[id] = {
                id,
                dari: m.sender,
                nama: name,
                penerima: data.jid,
                pesan: pesan,
                status: false
            }
            return !0
        })
    } catch (e) {
        console.log(e)
        m.reply('error');
    }
}
handler.tags = ['menfess']
handler.help = ['menfess', 'mfs'].map(v => v + ' <nomor|name of the sender|message>')
handler.command = /^(mfs|menfess|menfes|confes)$/i

handler.private = true

export default handler