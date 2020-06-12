import crypto from 'crypto'

export default function(password:string):string{
    const cipher = crypto.createCipher('aes256',process.env.KEY)
    cipher.update(password)
    return cipher.final('hex')
}