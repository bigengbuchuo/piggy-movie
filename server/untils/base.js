var crypto = require('crypto');
const captcha = require('trek-captcha');

var setCrypto = (info)=>{
    return crypto.createHmac('sha256', '%$&^#*^$*Sashdg')
                    .update(info)
                    .digest('hex');
};

var createVerify=(req,res)=>{
    return captcha().then((info)=>{
        req.session.verifyImg=info.token  //验证码具体的值
        return info.buffer  //二进制值，与token对应的验证码图片
    }).catch(()=>{
        return false;
    });
}

module.exports = {
    setCrypto,
    createVerify
};