import express from 'express'
import axios from 'axios'
import http from "http"
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

function connect(PORT) {
  let app = global.app = express()

	app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html');
});
  
  app.listen(process.env.port || process.env.PORT || ~~(Math.random() * 1e4), () => {
   console.log('App listened on port', process.env.port || process.env.PORT || ~~(Math.random() * 1e4))
   keepAlive()
   })
}

function keepAlive() {
    const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    if (/(\/\/|\.)undefined\./.test(url)) return
    setInterval(() => {
        axios(url).catch(console.error)
    }, 5 * 1000)
}


export default connect
