var express = require('express');
var adminController = require('../controlers/admin.js');
var router = express.Router();

router.use((req,res,next)=>{  //在发送请求router.get之前先拦截一下，不是管理员就不发了
    if(req.session.username && req.session.isAdmin){
        next();  //如果是管理员则next，继续向下执行index接口的请求
    }else{
        res.send({
            msg:'没有管理权限',
            status:-1
        })
    }
})

router.get('/',adminController.index);
router.get('/usersList',adminController.usersList);
router.post('/updateFreeze',adminController.updateFreeze);
router.post('/deleteUser',adminController.deleteUser);

module.exports =router;