## zoro Bot Powered By lua

- If you facing some issue, just open Issues on github page

### a little about this bot

- ✔️ | **Simple**
- ✔️ | **No Button**
- ✔️ | **Multi Device**
- ✔️ | **Plugins**
  

---------
## NOTE: THIS BOT IS [ESM](https://nodejs.org/api/esm.html) BOT
> I opened discussiond for asking any problem or new feature, if i agree with that i will invite you in my repo/pull request your idea in this source code :)
---------
# Installation

### Deploy to heroku

 Fork the repo
 
 <a href='https://github.com/xxirfanx/zoromd/fork' target="_blank"><img alt='Fork repo' src='https://img.shields.io/badge/fork repo-000?style=for-the-badge&logo=github&logoColor=white'/></a>


### Deploy to Replit
[![Run on Repl.it](https://repl.it/badge/github/xxirfanx/zoromd)](https://repl.it/github/xxirfanx/zoromd)

Language Search/Type `nix Bash` Don't nodejs

add forget [uptimerobot click](https://uptimerobot.com)

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
13. add forget [uptimerobot click](https://uptimerobot.com)
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
## Arguments `node . [--options] [<session name>]`

### `--self`

Activate self mode (Ignores other)

### `--server`

Used for [heroku](https://heroku.com/) or scan through website

### `--db`

pass mongodb url or cloud url to connect to database, by the default it will connect to database.json

### `--autoread`

If enabled, all incoming messages will be marked as read

### `--test`

**Development** Testing Mode


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

### 📮 S&K
1. Not For Sale
2. Don't forget give star this repo
3. Follow Github
4. Don't use this repository wrong!
5. If you have problem chat me in owner number

---------

- How to delete session?

> You can delete folder `sessions` or run command ```rm -rf sessions```
- How to change owner number?

> You can change in `config.js`, on global.owner. make sure you use correct syntax.
```js
global.owner = [
  ['919911111111', 'Name', true]
]

and

global.nomorown = '919911111111'
```
> First argument on array is number like `919911111111`, second argument is name like `Name` (if this argument pass, if using `owner` command, this number will send as owner), third argument is developer like `true` (if this argument pass, if there have plugins error (not syntax error) the error will send to developer)
---------
### want to contribute?
1. fork this repository
2. Change/edit/create what you want. for example you can add features, fix bug, etc
3. **test** before making a pull req!!
4. make a pull req!
5. if your pull req is already in **acc/merge**, you can delete your branch or you can create pull req again :)

---------
  
 ```bash
 𝐀𝐮𝐭𝐡𝐨𝐫 : lua ser ofc
 𝐖𝐚 : +91 6235 050 956
 𝐛𝐚𝐬𝐞 : Narutomo and BochilGaming and Rlxfly
 𝐌𝐲 𝐏𝐫𝐨𝐣𝐞𝐜𝐭 : 7 may 2023
 ```
