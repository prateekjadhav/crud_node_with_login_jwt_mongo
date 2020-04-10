var jwt = require('jsonwebtoken');
var crypto = require("crypto");
var constant = require('./const');

module.exports = {
    generateToken: function (tokenData) {
        return token = jwt.sign({
            data: tokenData
        },
            constant.JWT_SECRET);
    },
    verifyToken: function (token) {
        const tokenData = jwt.verify(token, constant.JWT_SECRET, function (err, decoded) {
            if(err){
                console.log(err);
                return "An error occured";
            }
            return decoded;
        });
        return tokenData;

    },
    hashPassword: function (password) {
        var salt = constant.SALT;
        let hash = crypto.pbkdf2Sync(password, salt,  
            1000, 64, `sha512`).toString(`hex`);
        return hash;
    },
}