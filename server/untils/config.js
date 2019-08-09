var mongoose=require('mongoose');
var nodemailer = require('nodemailer');

var Mongoose={
    url:'mongodb://localhost:27017/piggy',
    connect(){
        mongoose.connect(this.url,{useNewUrlParser:true},(err)=>{
            if(err){
                console.log('数据库连接失败');
                return;
            }
            console.log('数据库连接成功');
        });
    }
};

var Email={
    config:{
        host: "smtp.qq.com",
        port: 587,
        auth: {
            user: '993486146@qq.com', // 发件人
            pass: 'vumkdmfgimwtbbci' // 密码
        }
    },
    get transporter(){  //get方法,直接得到config对象  transporter：在controlers的user.js里要用这个方法
        return nodemailer.createTransport(this.config);
    },
    get verify(){   //verify自定义的方法：生成验证码
        return Math.random().toString().substring(2,6);  //substring(2,6)：验证码要4位，从2到6位提取
    },
    get time(){
        return Date.now();
    }
};

var Head={
    baseUrl:'http://localhost:3000/uploads/'
}

module.exports={
    Mongoose,
    Email,
    Head
};