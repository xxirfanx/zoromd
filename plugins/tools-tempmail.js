// thanks to inrl kid
// test esm only huh made by lua ser ofc

import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
  if (command === 'tempmail') {
    try {
      const response = await fetch('https://inrl-web.onrender.com/api/getmail?apikey=inrl')
      const data = await response.json()

      if (data.status && data.result && data.result.length > 0) {
        const tempmsg = data.result.join('\n')
        const replymsg = `*Temporary Email Addresses:*\n\n${tempmsg}\n\n use \`\`\`\.checkmail < mail-address >\`\`\`\ if you want to check inbox of any temp mail used from above`
        m.reply(replymsg)
      } else {
        m.reply('No temporary email addresses found.')
      }
    } catch (error) {
      console.error('Error:', error)
      m.reply('Failed to fetch temporary email addresses.')
    }
  } else if (command === 'checkmail') {
    if (!text && !(m.quoted && m.quoted.text)) {
      m.reply('Please provide some text or quote a message to get a response.')
      return
    }

    if (!text && m.quoted && m.quoted.text) {
      text = m.quoted.text
    } else if (text && m.quoted && m.quoted.text) {
      text = `${text} ${m.quoted.text}`
    }

    try {
      const response = await fetch(`https://inrl-web.onrender.com/api/getmailinfo?email=${encodeURIComponent(text)}&apikey=inrl`)
      const data = await response.json()

      if (data.status && data.result && data.result.length > 0) {
        const msg = data.result.map((msg) => {
          return `
*From:* ${msg.from}
*Subject:* ${msg.subject}
*Date:* ${msg.date}
*Body:*
${msg.text}
          `
        }).join('\n\n---\n\n')
        const replymsg = `*Messages in* ${text}:\n\n${msg}`
        m.reply(replymsg)
      } else {
        m.reply(`No messages found in ${text}.`)
      }
    } catch (error) {
      console.error('Error:', error)
      m.reply(`Failed to check messages in ${text}.`)
    }
  }
}

handler.help = ['tempmail', 'checkmail']
handler.tags = ['tools']
handler.command = ['tempmail', 'checkmail']

export default handler
