const {
    proto,
    generateWAMessage,
    areJidsSameUser
} = (await import('@adiwajshing/baileys')).default

export async function all(m, chatUpdate) {
    if (m.isBaileys) return
    if (!m.message) return
    if (!(m.message.buttonsResponseMessage || m.message.templateButtonReplyMessage || m.message.listResponseMessage || m.message.interactiveResponseMessage || m.message.pollUpdateMessage || m.message.editedMessage)) return
    
    let id = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'interactiveResponseMessage') ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id : (m.mtype == 'templateButtonReplyMessage') ? appenTextMessage(m.msg.selectedId, chatUpdate) : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : (m.mtype === 'editedMessage') ? m.message.editedMessage.message.protocolMessage.editedMessage.conversation ? m.message.editedMessage.message.protocolMessage.editedMessage.conversation : m.message.editedMessage.message.protocolMessage.editedMessage.extendedTextMessage.text : ''
    
try {

    let messages = await generateWAMessage(m.chat, { text: id, mentions: m.mentionedJid }, {
        userJid: this.user.id,
        quoted: m.quoted && m.quoted.fakeObj
    })
    messages.key.fromMe = areJidsSameUser(m.sender, this.user.id)
    messages.key.id = m.key.id
    messages.pushName = m.name
    if (m.isGroup)
        messages.key.participant = messages.participant = m.sender
    let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)].map(v => (v.conn = this, v)),
        type: 'append'
    }
    this.ev.emit('messages.upsert', msg)
} catch (e) {
false
}
}
