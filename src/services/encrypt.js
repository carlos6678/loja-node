const crypto = require('crypto')

module.exports= function(password){
    const cipher = crypto.createCipher('aes256',process.env.KEY)
    cipher.update(password)
    return cipher.final('hex')
}