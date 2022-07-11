const fs = require('fs-extra')
const path = require('path')

const privateKey = fs.readFileSync(path.resolve(__dirname, './private.pem'), 'utf8')
const publicKey = fs.readFileSync(path.resolve(__dirname, './public.pem'), 'utf8')

module.exports = { publicKey, privateKey }
