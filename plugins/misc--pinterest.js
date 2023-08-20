import fetch from "node-fetch";
import { pinterest } from "@bochilteam/scraper";
import sharp from "sharp";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Example use ${usedPrefix + command} zoro`

  const maxImages = 10; // change how many photos you want to send (use numbers)
  for (let i = 0; i < maxImages; i++) {
    const json = await pinterest(text);
    const imageUrl = json.getRandom().replace(/&amp;/g, '&');

    const response = await fetch(imageUrl);
    const imageBuffer = await response.buffer();

    const maxWhatsAppWidth = 9999; // Maximum width WhatsApp
    const metadata = await sharp(imageBuffer).metadata();
    const imageWidth = metadata.width;

    let resizedImage;
    if (imageWidth > maxWhatsAppWidth) {
      resizedImage = await sharp(imageBuffer)
        .resize({ width: maxWhatsAppWidth, withoutEnlargement: true })
        .toBuffer();
    } else {
      resizedImage = imageBuffer;
    }

    conn.sendFile(m.chat, resizedImage, 'pinterest.jpg', `
*Search result*
${text}
`.trim(), m);
  }
}

handler.help = ['pinterest <keyword>']
handler.tags = ['internet']
handler.command = /^(pinterest|pin)$/i

export default handler
