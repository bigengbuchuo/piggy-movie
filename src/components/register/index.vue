<template>
    <div class="register_body">
        <div class="yzm item">
            邮箱:<input v-model="email" class="register_text" type="text"> <button @touchstart="handleToVerify">发送验证码</button>
        </div>
        <div class="item">
            用户名：<input v-model="username" class="register_text" type="text">
        </div>
        <div class="item">
            密码：<input v-model="password" class="register_text" type="password">
        </div>
        <div class="item">
            确认密码：<input class="register_text" type="password">
        </div>
        <div class="item">
            验证码：<input v-model="verify" class="register_text" type="text">
        </div>
        <div class="register_btn">
            <button @touchstart="handleToRegister">注册</button>
        </div>
        <div class="register_link">
            <router-link to="/mine/login">立即登录</router-link >
            <router-link to="/mine/findPassword">找回密码</router-link >
        </div>
    </div>
</template>

<script>
import {msgBox} from '@/components/js';
export default {
    name:'register',
    data(){
        return{
            email:'',
            username:'',
            password:'',
            verify:''
        }
    },
    methods:{
        handleToVerify(){
            this.axios.get('/api2/users/verify?email='+this.email).then((res)=>{
                // console.log(this.email);
                var status=res.data.status;
                console.log(status);
                if(status === 0){
                    msgBox({
                        title:'验证码',
                        content:'验证码已发送',
                        ok:'确定'
                    });
                }else{
                    msgBox({
                        title:'验证码',
                        content:'验证码发送失败',
                        ok:'确定'
                    });
                }
            });
        },
        handleToRegister(){
            this.axios.post('/api2/users/register',{
                email:this.email,
                username:this.username,
                password:this.password,
                verify:this.verify
            }).then((res)=>{
                var status=res.data.status;
                // console.log(status);
                var This =this;
                if(status === 0){
                    msgBox({
                        title:'注册',
                        content:'注册成功',
                        ok:'确定',
                        handleOk(){
                            This.$router.push('/mine/login');
                        }
                    });
                }else{
                     msgBox({
                        title:'注册',
                        content:res.data.msg+'，请重新注册',
                        ok:'确定'
                    });
                }
            });
        }
    }
}
</script>

<style scoped>
.register_body{
    width:100%;
}
.item{
    display: block;
    border-bottom: 1px solid #ccc;
    text-indent: 16px;
    font-size: 14px;
}
.register_body .yzm{
    position: relative;
}
.register_body .yzm button{
    position:absolute;
    right:10px;
    top:10px;
    height:30px;
    font-size:12px;
    border:none;
    border-radius: 3px;
    background-color: rgb(100, 175, 237);
    color:#fff;
    width:69px;
    font-weight:100;
}
.register_body .register_text{
    width: 60%;
    height: 42px;
    border: none;
    text-indent: 3px;
    font-size: 14px;
    padding: 3px 15px 3px 15px ;
}
.register_body .register_btn{
    height: 40px;
    margin: 10px;
    line-height: 40px;
    width:100%;
}
.register_btn button{
    width: 80%;
    height: 100%;
    background: #6495ED;
    border-radius: 3px;
    border: none;
    color: #fff;
    font-size: 14px;
    display: block;
    margin: 12px auto;
}
.register_body .register_link{
    display: flex;
    justify-content: space-between;
}
.register_link a{
    text-decoration: none;
    font-size: 12px;
    margin:10px 10px;
    color: #6495ED;
}
</style>
