async function handler(m) {
    if (!m.quoted) throw 'reply message!'
    let q = await m.getQuotedObj()
    if (!q.quoted) throw 'the message you reply does not contain reply!'
    await q.quoted.copyNForward(m.chat, true)
}

handler.command = /^q$/i

export default handler
