/** 
 *  Created By LUA SER OFC
 *  CopyRight 2024 MIT License
 *  My Github : https://github.com/xxirfanx
 *  My Instagram : https://instagram.com/luaserofc
 *  My Youtube : https://youtube.com/@luaserofc
*/

const ig = await import('@sasmeee/igdl');
import fetch from 'node-fetch';

var handler = async (m, { args, conn, usedPrefix, command }) => {
    if (!args[0]) throw `Ex:\n${usedPrefix}${command} Link put`;

  conn.reply(m.chat, 'Currently downloading video...', m);

   let res = await ig.default(args[0]);
   let media = await res[0].download_link;

   const response = await fetch(media)
   const arrayBuffer = await response.arrayBuffer()
   const videoBuffer = Buffer.from(arrayBuffer)

        if (!res) throw 'Can\'t download the post';

  conn.sendFile(m.chat, videoBuffer, 'ig.mp4', null, m)
};

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?|instagram(dl)?|insta)$/i;

export default handler;
