const crypto = require("crypto")

module.exports = function(){
    let createHmac = crypto.createHmac
    return    parseInt(createHmac('sha256', String(Date.now())).digest('hex').substr(0,5),16)
}