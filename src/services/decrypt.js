module.exports = function(password){
    const decipher = crypto.createDecipher("aes256",process.env.KEY);
    decipher.update(password,"hex");
    return decipher.final();
}