import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input the text or reply to the text you want to make quote!"
   await m.reply(wait)

    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg')

   const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": getRandomHexColor().toString(),
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": m.name,
            "photo": {
               "url": pp
            }
         },
         "text": text,
         "replyMessage": {}
      }]
   }
   
   const buffer = await Quotly(obj)
   let stiker = await sticker(buffer, false, global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(qc)$/i
export default handler

async function Quotly(obj) {
  let json;

  try {
    json = await axios.post("https://quote-api.rippanteq7.repl.co/generate", obj, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    try {
      json = await axios.post("https://quote-api-1.jigarvarma2005.repl.co/generate", obj, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (e) {
      try {
        json = await axios.post("https://qc-api.rizzlogy.repl.co/generate", obj, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      } catch (e) {
        try {
          json = await axios.post("https://quote-api.ghost19ui.repl.co/generate", obj, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        } catch (e) {
          return e;
        }
      }
    }
  }

  const results = json.data.result.image;
  const buffer = Buffer.from(results, "base64");
  return buffer;
}

function getRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")       
}
