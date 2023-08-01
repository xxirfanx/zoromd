let handler = async ( m ) => {
  m.reply('Hello!')
}

handler.command = /^(cek|tes|alive|p|a)$/i

export default handler
