import { instagram } from '@xct007/frieren-scraper'
import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`
    await m.reply(`Ｌｏａｄｉｎｇ．．．`)
    let res = await instagram.v2(args[0])
    if (res.error) return m.reply(`${res.message}`);
    for (let urRRl of res) {
    let shortUrRRl = await (await fetch(`https://tinyurl.com/api-create.php?url=${urRRl.url}`)).text()    
    let tXXxt = `✨ *done here | URL:* ${shortUrRRl}\n\n${me}`.trim()
    conn.sendFile(m.chat, urRRl.url, 'error.mp4', tXXxt, m)
   }
}

handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?|insta|instagram(dl)?)$/i

export default handler