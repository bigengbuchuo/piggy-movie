var express = require('express');
var router = express.Router();
var usersController=require('../controlers/users.js');

var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' }); //指定将要上传的文件的路径

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',usersController.login);
router.post('/register',usersController.register);
router.get('/verify',usersController.verify);  //验证码
router.get('/logout',usersController.logout);
router.get('/getUser',usersController.getUser);
router.post('/findPassword',usersController.findPassword);
router.get('/verifyImg',usersController.verifyImg);

router.post('/uploadUserHead', upload.single('file') , usersController.uploadUserHead);

module.exports = router;
