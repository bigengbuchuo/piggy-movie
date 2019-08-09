var {Email,Head} = require('../untils/config.js'); 
var UserModel = require('../models/users.js');
var fs=require('fs');
var url=require('url'); //存地址
var {setCrypto,createVerify} = require('../untils/base.js');

var login=async(req,res,next)=>{
    // res.send({
    //         msg:'测试',
    // })
    var{ username , password , verifyImg}=req.body;

    if(verifyImg !== req.session.verifyImg){ //base里面存的
        res.send({
            msg:'验证码输入不正确',
            status:-3
        });
        return;
    }

    try{
       var result = await UserModel.findLogin({
            username,
            password:setCrypto(password)
        });
        // console.log(result);
        if(result){
            req.session.username = result.username;
            req.session.isAdmin = result.isAdmin;
            req.session.userHead = result.userHead;
            if(result.isFreeze){
                res.send({
                    msg:'账号已冻结',
                    status:-2
                })
            }else{
                res.send({
                    msg:'登录成功',
                    status:0
                });
            }
        }else{
            res.send({
                msg:'登录失败',
                status:-1
            });
        }
    }catch(err){
        console.log(err);
    }
};

var register=async(req,res,next)=>{
    // res.send({
    //         msg:'测试',
    //         status:0
    // })
    var { username , password , email , verify}=req.body; //req.body : post请求
    if(email !== req.session.email || verify !== req.session.verify){
        res.send({
            msg:'验证码错误',
            status:-1
        });
        return;
    }
    if((Email.time - req.session.time)/1000 > 60){  //再次调用Email.time获取一个新的时间 60秒过期
        res.send({
            msg:'验证码已过期',
            status:-3
        });
        return;
    }
    try{
        var result = await UserModel.save({
            username,
            password:setCrypto(password),
            email
        });
        if(result){
            res.send({
                msg:'注册成功',
                status:0
            });
        }else{
            res.send({
                msg:'注册失败',
                status:-2
            });
        }
    }catch(err){
        console.log(err);
    }
    // console.log(result);  
};


var verify=async(req,res,next)=>{
    // res.send({
    //     msg:'测试',
    //     status:0
    // });  测试接口是否能跑通
    var email=req.query.email;
    var verify=Email.verify;

    console.log(verify);
    req.session.verify=verify;
    req.session.email=email;
    req.session.time=Email.time;

    var mailOptions={
        from:'小猪电影 993486146@qq.com',
        to: email,
        subject: '小猪电影邮箱验证码', 
        text: '验证码：'+ Email.verify
    }  

    Email.transporter.sendMail(mailOptions,(err)=>{  //发送邮箱之后会返回信息
        if(err){
            res.send({
                msg:'验证码发送失败',
                status:-1
            });
        }else{
            res.send({
                msg:'验证码发送成功',
                status:0
            });
        }
    });
    
};

var logout=async(req,res,next)=>{   //退出登录
    req.session.username = '';
    res.send({
        msg:'退出登录成功',
        status:0
    });
};

var getUser=async(req,res,next)=>{   //已登陆的用户无需再次登陆
    if(req.session.username){
        res.send({
            msg:'获取用户信息成功',
            status:0,
            data:{
                username:req.session.username,
                isAdmin : req.session.isAdmin,
                userHead : req.session.userHead
            }
        });
    }else{
        res.send({
            msg:'获取用户信息失败',
            status:-1
        })
    }
};

var findPassword=async(req,res,next)=>{
    var { email , password , verify } = req.body;
    if((Email.time - req.session.time)/1000 > 60){ 
        res.send({
            msg:'验证码已过期',
            status:-3
        });
        return;
    }
    try{
        if(email === req.session.email && verify === req.session.verify ){
            var result = await UserModel.findPassword(email, setCrypto(password));  //email作为查询的条件 password作为新的密码
            if(result){
                res.send({
                    msg:'修改密码成功',
                    status:0
                });
            }else{  
                res.send({
                    msg:'修改密码失败',
                    status:-1
                });
            }
        }else{
            res.send({
                msg:'验证码或邮箱不匹配',
                status:-1
            });
        }
    }catch(err){
        console.log(err);
    }  
};

var verifyImg = async(req,res,next)=>{
    try{
        var result = await createVerify(req,res);
        if(result){
            res.send(result);
        }
    }catch(err){
        console.log(err);
    }
}

var uploadUserHead = async function(req,res,next){
    // console.log(req.file);
    try{
        await fs.rename('public/uploads/'+req.file.filename , 'public/uploads/'+ req.session.username+'.jpg',function(err){});//改上传的图片名
        var result =await UserModel.updateUserHead(req.session.username , url.resolve(Head.baseUrl , req.session.username+'.jpg'));
        if(result){
            res.send({
                msg:'头像修改成功',
                status:0,
                data:{
                    userHead:url.resolve(Head.baseUrl , req.session.username+'.jpg')
                }
            })
        }else{
            res.send({
                msg:'头像修改失败',
                status:-1
            })
        }
    }catch(err){
        console.log(err);
    }
}

module.exports={
    login,
    register,
    verify,
    logout,
    getUser,
    findPassword,
    verifyImg,
    uploadUserHead
};