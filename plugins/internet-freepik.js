// -------------------------------------------------------
// [❗]                    [❗]               [❗] 
//                                                  
//        |- [ ⚠ ] - CODE CREDITS - [ ⚠ ] -|        
//          —◉ DEVELOPED BY LUA SER OFC:       
//       ◉ git : (https://github.com/xxirfanx)        
//                                                 
// [❗]                    [❗]               [❗] 
// -------------------------------------------------------

import axios from "axios";
import fetch from "node-fetch";
import cheerio from "cheerio";
import {
    JSDOM
} from "jsdom";

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) throw "This is private\nDownload free pictures from the site\n\nhttps://www.freepik.com\nWe write like this :\n*.freepik man*"
    let name = await conn.getName(m.sender);
    try {
            await m.reply(wait)
            let res = await FreePik(text)
            let rdm = res[Math.floor(Math.random() * res.length)];
            await conn.sendMessage(m.chat, {
                image: {
                    url: rdm
                }, caption: 'Request By ' + name
            }, {
                quoted: m
            })

    } catch (e) {
        throw eror
    }
}

handler.help = ["freepik"]
handler.tags = ["internet"]
handler.command = /^freepik$/i

export default handler

/* New Line */
async function FreePik(query) {
let res = await fetch('https://www.freepik.com/search?format=search&query=' + query + '&type=psd')
    let html = await res.text()
    let dom = new JSDOM(html)
    var collection = dom.window.document.getElementsByTagName('img');
    let img = []
for (var i = 0; i < collection.length; i++) {
	if (collection[i].getAttribute('src').startsWith('https://img.freepik.com')) {
	img.push(collection[i].getAttribute('src'))
	}
}
let newArr = img.filter(el => el != null);
return newArr
}
