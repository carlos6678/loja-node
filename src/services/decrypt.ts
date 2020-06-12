import crypto from 'crypto'

export default function(password:string):Buffer{
    const decipher = crypto.createDecipher("aes256",process.env.KEY);
    decipher.update(password,"hex");
    return decipher.final();
}