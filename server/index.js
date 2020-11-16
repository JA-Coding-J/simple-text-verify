const server = require('./server')
const handler = require('./requestHandler')
const router = require('./router')

let handle = {}
handle['textVerify'] = handler.textVerify

server.start(router.route, handle)
// http://127.0.0.1:8000/