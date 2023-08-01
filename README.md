# WA FILES SOON WAIT

- If you facing some issue, just open Issues on github page

### a little about this bot

- ✔️ | **Simple**
- ✔️ | **No Button**
- ✔️ | **Multi Device**
- ✔️ | **Plugins** 
---------

### Some of the features include
> <picture>
>   <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Mqxx/GitHub-Markdown/main/blockquotes/badge/light-theme/success.svg">
>   <img alt="Success" src="https://raw.githubusercontent.com/Mqxx/GitHub-Markdown/main/blockquotes/badge/dark-theme/success.svg">
> </picture><br>
>
 - Sticker
 - AntiCall
 - Downloader
 - Tools

> <picture>
>   <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Mqxx/GitHub-Markdown/main/blockquotes/badge/light-theme/error.svg">
>   <img alt="Error" src="https://raw.githubusercontent.com/Mqxx/GitHub-Markdown/main/blockquotes/badge/dark-theme/error.svg">
> </picture><br>
>
 - Welcome & Leave
 - AI Feature (ChatGPT test / test no api key)
 - Anime
---------

> <picture>
>   <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Mqxx/GitHub-Markdown/main/blockquotes/badge/light-theme/info.svg">
>   <img alt="Info" src="https://raw.githubusercontent.com/Mqxx/GitHub-Markdown/main/blockquotes/badge/dark-theme/info.svg">
> </picture><br>
>

### Releases
- yes fix test bot
- test qr code working

---------
## How To Add new Feature
```js
let handler = async (m, {
	command,
	args,
	text,
	usedPrefix
}) => {
 // put here your code
}

handler.command = ['order'] // add here the command
handler.help = ['order'] // displays this command in the menu
handler.tags = ['main'] // displays in the menu in the tag category main
handler.group = true // Fill in true for commands that cannot be accessed in private chat
handler.admin = true // Fill in true if the command can only be accessed by group admins
handler.botAdmin = true // can be accessed if the bot is included admin group (true)
handler.limit = 1 // 1 limits will be used
handler.owner = true // only accessible owner
handler.disabled = true // can't be accessed by anyone
handler.premium = true // only accessible user premium
export default handler // or module.exports = handler
```

---------
## How To Customise Message Display

### Send Message
```js
conn.reply(m.chat, 'text', m)
//without reply message
conn.reply(m.chat, 'text', null) // just need to change "m" to null, can be applied in conn.sendFile
```

### Send Message With Tag
```js
conn.reply(m.chat, 'text @919911111111', m, {
	mentions: ['919911111111@s.whatsapp.net']
})

// or

m.reply('anu @919911111111', null, {
	mentions: ['919911111111@s.whatsapp.net']
})

// use thumbnail & tag

m.reply('anu @919911111111', null, {
	contextInfo: {
		mentionedJid: ['919911111111@s.whatsapp.net'],
		externalAdReply: await thumb(buffer_image, ['title', 'body'], [true, true])
	}
})

conn.reply(m.chat, 'anu @919911111111', m, {
	contextInfo: {
		mentionedJid: ['919911111111@s.whatsapp.net'],
		externalAdReply: await thumb(buffer_image, ['title', 'body'], [true, true])
	}
})
```

### Simple Send Message
```js
m.reply('text')
```

### Send All Type File
```js
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption', m)

// mode document
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption', m, null, {
	asDocument: true
})

// mode document and thumbnail
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption', m, null, {
	asDocument: true,
	contextInfo: {
		externalAdReply: await thumb(buffer_image, ['title', 'body'], [true, true])
	}
})

// mode document and thumbnail and tag
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption @919911111111', m, null, {
	asDocument: true,
	contextInfo: {
		mentionedJid: ['919911111111@s.whatsapp.net'],
		externalAdReply: await thumb(buffer_image, ['title', 'body'], [true, true])
	}
})
```

### Send All Type File With Caption Tag
```js
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption @919911111111', m, null, {
mentions: ['919911111111@s.whatsapp.net']
})

//use thumbnail
conn.sendFile(m.chat, 'buffer', 'filename.jpg', 'caption @919911111111', m, null, {
	contextInfo: {
		mentionedJid: ['919911111111@s.whatsapp.net'],
		externalAdReply: await thumb(buffer_image, ['title', 'body'], [true, true])
	}
})

```

### Edit Message
```js
var a = await m.reply('text')
conn.editMessage(m.chat, a.key, 'text', m)

// or

let a = await conn.reply(m.chat, 'text', m)
conn.editMessage(m.chat, a.key, 'text', m)
```
### React Message
```js
m.react('🤑')
```
---------
  
 ```bash
 𝐀𝐮𝐭𝐡𝐨𝐫 : lua ser ofc
 𝐖𝐚 : +48 888 880 215
 𝐛𝐚𝐬𝐞 : Narutomo and BochilGaming
 𝐌𝐲 𝐏𝐫𝐨𝐣𝐞𝐜𝐭 : 7 may 2023
 ```
