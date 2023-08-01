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
'sourceUrl': 'https://youtu.be/F5WxZTMFbk0'}},
'caption': 'http://github.com/xxirfanx/zoromd\n\nOpen Source for free\n\n𝑺𝒊𝒎𝒑𝒍𝒆 𝑾𝒉𝒂𝒕𝒔𝒂𝒑𝒑 𝑩𝒐𝒕 𝑴𝒖𝒍𝒕𝒊-𝒅𝒆𝒗𝒊𝒄𝒆 𝑫𝒐𝒏\'𝒕 𝒇𝒐𝒓𝒈𝒐𝒕 𝒕𝒐 𝒈𝒊𝒗𝒆 𝒔𝒕𝒂𝒓 𝒊𝒇 𝒂𝒏 𝒇𝒖𝒏𝒄𝒕𝒊𝒐𝒏 𝒐𝒇 𝒂𝒏 𝒇𝒊𝒍𝒆. 𝑻𝒉𝒂𝒏𝒌𝒔',
'footer': me, }
    await conn.sendMessage(m.chat, buttonMessage, { quoted: m })
}

handler.help = ['sc <bot sc>']
handler.tags = ['general']
handler.command = /^(sc|repo)$/i

export default handler
