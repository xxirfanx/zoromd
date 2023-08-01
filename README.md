## zoro Bot Powered By lua

- If you facing some issue, just open Issues on github page

### a little about this bot

- ✔️ | **Simple**
- ✔️ | **No Button**
- ✔️ | **Multi Device**
- ✔️ | **Plugins**
  

---------
# Installation

### RUN ON REPLIT
1. Visit the web [this](https://replit.com)
2. Login or register
3. Press Create Repl
4. Press `import for github`
5. Search for this Repo or type in `xxirfanx/zoromd`
6. Language Search/Type `nix Bash` Don't nodejs
7. Press `Import from Github`
8. Edit `config.js` replace the owner number with another number or edit
9. Swipe Right from the post `Shell` then click
10. type `npm install` to install modules
11. Wait until the module install process is complete
12. Run the Bot by typing this
```bash
node . --server
```

---------

## FOR WINDOWS/VPS/RDP USER

* Download And Install Git [`Click Here`](https://git-scm.com/downloads)
* Download And Install NodeJS [`Click Here`](https://nodejs.org/en/download)
* Download And Install FFmpeg [`Click Here`](https://ffmpeg.org/download.html) (**Don't Forget Add FFmpeg to PATH enviroment variables**)
* Download And Install ImageMagick [`Click Here`](https://imagemagick.org/script/download.php)

```bash
git clone https://github.com/xxirfanx/zoromd
cd zoromd
npm install
```

---------

## Run

```bash
node .
```



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
