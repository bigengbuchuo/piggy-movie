var mongoose =require('mongoose');
var { Head } = require('../untils/config.js')
mongoose.set('useCreateIndex',true);   //使username和email生效
var url = require('url');

var UserSchema = new mongoose.Schema({  //创建用户使用的字段
    username:{ 
        type:String,
        require:true, //表示：值不能为空
        index:{
            unique:true  //表示：index是唯一值
        }
    },
    password:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        index:{unique:true}
    },
    date:{ 
        type:Date,
        default:Date.now()
    },
    isAdmin:{ //是否是管理员
        type:Boolean,
        default:false
    },
    isFreeze:{ //是否要冻结账号
        type:Boolean,
        default:false
    },
    userHead:{
        type:String,
        default:url.resolve(Head.baseUrl,'default.png')
    }
});

var UserModel=mongoose.model('user',UserSchema);  //user：数据库表的表名
UserModel.createIndexes();  //在下面可以产生一个参数为promise回调函数的实例 使username和email生效


//save添加数据库
var save=(data)=>{     //data是一个对象
    // console.log(data)
    var user =new UserModel(data);
    // console.log(user);
    return user.save()
        .then(()=>{   //添加成功
            return true;
        })
        .catch(()=>{  //添加失败
            return false;
        });
};

var findLogin=(data)=>{   
    return UserModel.findOne(data);  //findOne 查询数据库的键值对 只有键和值都正确才返回整条信息
}

var findPassword=(email,password)=>{
    return UserModel.update({email} , { $set : { password } })  //update更新（修改）数据库，第一个参数是查询条件，第二个参数是要修改的数据
        .then(()=>{
            return true; //查询和修改都完成之后返回true
        })
        .catch(()=>{
            return false;  //失败
        });
}

var usersList=()=>{
    return UserModel.find();  //find方法：返回所有用户
}

var updateFreeze=(email,isFreeze)=>{
    return UserModel.update({email},{$set:{isFreeze}})  //更新
    .then(()=>{
        return true;
    })
    .catch(()=>{
        return false;
    });
}

var deleteUser=(email)=>{
    return UserModel.deleteOne({ email })   //deleteOne删除整条数据,成功返回true，失败false
}

var updateUserHead = ( username , userHead )=>{
    return UserModel.update({username},{$set:{userHead}})
    .then(()=>{
        return true;
    })
    .catch(()=>{
        return false;
    });
}

module.exports={
    save,
    findLogin,
    findPassword,
    usersList,
    updateFreeze,
    deleteUser,
    updateUserHead
};
