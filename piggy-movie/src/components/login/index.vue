<template>
    <div class="login-body">
        <div>
            <input v-model="username" type="text" placeholder="账号/手机/Email" class="login-text">
        </div>
        <div>
            <input v-model="password" type="password" placeholder="请输入您的密码" class="login-text">
        </div>
        <div>
            <input type="text" class="login-text" placeholder="请输入您的验证码" v-model="verifyImg"><img class="loginVerify" @touchstart="changeVerify" src="/api2/users/verifyImg">
        </div>
        <div class="login-btn">
            <input type="submit" value="登  录" @touchstart="toLogin">
        </div>
        <div class="login-link">
            <router-link to="/mine/register">立即注册</router-link >
            <router-link to="/mine/findPassword">找回密码</router-link >
        </div>
    </div>
</template>

<script>
import {msgBox} from '@/components/js'

export default {
    name:'login',
    data(){
        return{
            username:'',
            password:'',
            verifyImg:''
        }
    },
    methods:{
        toLogin(){
            this.axios.post('/api2/users/login',{
                username:this.username,
                password:this.password,
                verifyImg:this.verifyImg
            }).then((res)=>{
                var status = res.data.status;
                var This=this;
                if(status === 0){
                    msgBox({
                        title:'登录',
                        content:'登录成功',
                        ok:'确定',
                        handleOk(){
                            This.$router.push('/mine/person');  //跳转到个人中心
                        }
                    })
                }else{
                    msgBox({
                        title:'登录',
                        content:res.data.msg,
                        ok:'确定'
                    })
                }
            // }).catch((res) => {
            //     console.log("错误：" + res);
            });
        },
        changeVerify(ev){
            ev.target.src='/api2/users/verifyImg?'+Math.random();
        }
    }
}
</script>

<style scoped>
.login-body{
    width:100%;
}
.login-body .login-text{
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    text-indent: 26px;
}
.login-body .login-btn{
    height: 40px;
    margin: 10px;
    line-height: 40px;
}
.login-btn input{
    width: 100%;
    height: 100%;
    background: #6495ED;
    border-radius: 3px;
    border: none;
    color: #fff;
    font-size: 14px;
}
.login-body .login-link{
    display: flex;
    justify-content: space-between;
}
.login-link a{
    text-decoration: none;
    font-size: 12px;
    margin:0 10px;
    color: #6495ED;
}
.loginVerify{
    width: 140px;
    margin: 13px auto;
}

</style>
