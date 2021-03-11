const help = (prefix, instagram, yt, name, pushname2, user, limitt, uptime, jam, tanggal) => { return`╭──────「 *_ᴘᴇʀᴀᴛᴜʀᴀɴ_* 」
┴
│× ꜱᴘᴀᴍ
│× ᴛᴇʟᴇᴘᴏɴ
│ᴍᴇʟᴀɴɢɢᴀʀ? ʙʟᴏᴄᴋ!
│ᴋᴇᴛɪᴋ #ᴍᴇɴᴜ
│ᴜɴᴛᴜᴋ ᴍᴇʟɪʜᴀᴛ ғɪᴛᴜʀ ᴅɴꜱ ʙᴏᴛ
┬
╰──────「 *_ᴅɴꜱʙᴏᴛ_* 」
`
}

exports.help = help

// penghitung aktif bot
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (6060));
  var minutes = Math.floor(seconds % (6060) / 60);
  var seconds = Math.floor(seconds % 60);
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

// info bot 
const bottt = (prefix) => {
return `
*ᴊɪᴋᴀ ɪɴɢɪɴ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ʙᴏᴛ ɪɴɪ ꜱɪʟᴀʜᴋᴀɴ ɢᴀʙᴜɴɢ ɢʀᴏᴜᴘ ᴅɴꜱ ʙᴏᴛ*

https://chat.whatsapp.com/Hpwp8FBfJMtHEN5KeuFJKw
`
}
exports.bottt = bottt
// donasi menu
const donasi = (name) => { 
	return `       
╭──────「 *_ᴅᴏɴᴀꜱɪ_* 」
┴
│√ ᴘᴜʟꜱᴀ : 085727091924
│√ ꜱᴀᴡᴇʀɪᴀ : https://saweria.co/denisputra
│
│\`\`\`ᴘᴜʟꜱᴀ\`\`\`
│ 5ᴋ ɪɴᴠɪᴛᴇ ʙᴏᴛ ᴋᴇ ɢʀᴜᴘ ꜱᴇʟᴀᴍᴀ 1 ʙᴜʟᴀɴ
┬
╰──────「 *_ᴅɴꜱʙᴏᴛ_* 」
`
}
exports.donasi = donasi
// bahasa list
const bahasa = (prefix) => {
return `
List Bahasa Untuk Command ${prefix}tts

  af: Afrikaans
  sq: Albanian
  ar: Arabic
  hy: Armenian
  ca: Catalan
  zh: Chinese
  zh-cn: Chinese (Mandarin/China)
  zh-tw: Chinese (Mandarin/Taiwan)
  zh-yue: Chinese (Cantonese)
  hr: Croatian
  cs: Czech
  da: Danish
  nl: Dutch
  en: English
  en-au: English (Australia)
  en-uk: English (United Kingdom)
  en-us: English (United States)
  eo: Esperanto
  fi: Finnish
  fr: French
  de: German
  el: Greek
  ht: Haitian Creole
  hi: Hindi
  hu: Hungarian
  is: Icelandic
  id: Indonesian
  it: Italian
  ja: Japanese
  ko: Korean
  la: Latin
  lv: Latvian
  mk: Macedonian
  no: Norwegian
  pl: Polish
  pt: Portuguese
  pt-br: Portuguese (Brazil)
  ro: Romanian
  ru: Russian
  sr: Serbian
  sk: Slovak
  es: Spanish
  es-es: Spanish (Spain)
  es-us: Spanish (United States)
  sw: Swahili
  sv: Swedish
  ta: Tamil
  th: Thai
  tr: Turkish
  vi: Vietnamese
  cy: Welsh
`
}
exports.bahasa = bahasa

// Limit
const limitend = (pushname2) => {
        return`*ᴍᴀᴀғ ${pushname2} ʟɪᴍɪᴛ ʜᴀʀɪ ɪɴɪ ʜᴀʙɪꜱ*\ɴ*ʟɪᴍɪᴛ ᴅɪ ʀᴇꜱᴇᴛ ꜱᴇᴛɪᴀᴘ ᴊᴀᴍ 12:00 ᴡɪʙ ᴛᴇɴɢᴀʜ ᴍᴀʟᴀᴍ*`
}

const limitcount = (limitCounts) => {
        return`
Limit Kamu: *${limitCounts}*
`
}

exports.limitend = limitend
exports.limitcount = limitcount