let handler = async (m, { conn, usedPrefix: _p }) => {


let buttonMessage = {
'document':{'url': 'http://s.id/luaxyz' },
'mimetype': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
'fileName': `「  𝑯𝒆𝒍𝒍𝒐 𝑾𝒐𝒓𝒍𝒅 」`,
'fileLength': 22222222222222,
'pageCount': 222,
'contextInfo':{
'forwardingScore':222,
'isForwarded':true,
'externalAdReply':{
'mediaUrl': 'http://github.com/xxirfanx/zoromd',
'mediaType': 2,
'previewType': 2,
'title': 'Searching Source Code?',
'body': me,
'thumbnail': thumb2,
'sourceUrl': 'https://www.youtube.com/watch?v=qBJ0F9Ecax0'}},
'caption': 'http://github.com/xxirfanx\nfollow 60 will you sc ok',
'footer': me, }
    await conn.sendMessage(m.chat, buttonMessage, { quoted: m })

}

handler.help = ['sc <bot sc>']
handler.tags = ['general']
handler.command = /^(sc|repo)$/i

export default handler
