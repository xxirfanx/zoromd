let handler = async (m, { conn, usedPrefix, text, command }) => {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw `No hash`
    let sticker = global.db.data.sticker
    if (sticker[hash] && sticker[hash].locked) throw 'You do not have permission to remove this sticker prompt'
    delete sticker[hash]
    m.reply(`Succeed!`)
}


handler.help = ['cmd'].map(v => 'del' + v + ' <text>')
handler.tags = ['database']
handler.command = ['delcmd']
handler.premium = true

export default handler