const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;

export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys || !m.isGroup) return false;

  const chat = global.db.data.chats[m.chat];
  const isGroupLink = linkRegex.exec(m.text);
  const kickMessage = isAdmin
    ? `❌ *Link Detected*\nYour group admin can't be removed from a group.`
    : `❌ *Link Detected*\nYou will be removed from the group.`;

  if (chat.antiLink && isGroupLink) {
    await this.reply(m.chat, kickMessage, null, { mentions: [m.sender] });
    await this.sendMessage(m.chat, { delete: m.key });

    if ((!isBotAdmin && isAdmin) || (isBotAdmin && !isAdmin)) {
      await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      await this.reply(m.chat, kickMessage, null, { mentions: [m.sender] });
      await this.sendMessage(m.chat, { delete: m.key });
    }
  }
  return true;
}
