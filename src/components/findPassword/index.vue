<template>
    <div class="findPassword_body">
        <div class="yzm item">
            邮箱：<input v-model="email" type="text" class="findPassword_text"> <button :disabled="disabled" @touchstart="handleToVerify">{{ verifyInfo }}</button>
        </div>
        <div class="item">
            新密码：<input v-model="password" type="text" class="findPassword_text">
        </div>
        <div class="item">
            验证码：<input v-model="verify" type="text" class="findPassword_text">
        </div>
        <div class="findPassword_btn">
            <button @touchstart="handleToPassword">修改</button>
        </div>
        <div class="findPassword_link">
            <router-link to="/mine/login">立即登录</router-link >
            <router-link to="/mine/register">立即注册</router-link >
        </div>
    </div>
</template>

<script scoped>
import {msgBox} from '@/components/js';
export default {
    name:'findPassword',
    data(){
        return{
            email:'',
            password:'',
            verify:'',
            verifyInfo:'发送验证码',
            disabled:false
        }
    },
    methods:{
        handleToVerify(){
            this.axios.get('/api2/users/verify?email='+this.email).then((res)=>{
                var status=res.data.status;
                var This = this;
                if(status === 0){
                    msgBox({
                        title:'验证码',
                        content:'验证码已发送',
                        ok:'确定',
                        handleOk(){
                            This.countDown();
                        }
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
        handleToPassword(){
            this.axios.post('/api2/users/findPassword',{
                email:this.email,
                password:this.password,
                verify:this.verify
            }).then((res)=>{
                var status=res.data.status;
                var This =this;
                if(status === 0){
                    msgBox({
                        title:'修改密码',
                        content:'修改密码成功',
                        ok:'确定',
                        handleOk(){
                            This.$router.push('/mine/login');
                        }
                    });
                }else{
                    msgBox({
                        title:'修改密码',
                        content:res.data.msg+'，请重新修改',
                        ok:'确定'
                    });
                }
            })
        },
        countDown(){
            this.disabled=true;
            var count =60;
            var timer = setInterval(()=>{
                count--;
                this.verifyInfo='剩余'+ count +'秒';
                if(count === 0){
                    this.disabled = false;
                    count = 60;
                    this.verifyInfo='发送验证码';
                    clearInterval(timer);
                }
            },1000) //1s执行一次
        }
    }
}
</script>

<style scoped>
.findPassword_body{
    width:100%;
}
.item{
    display: block;
    border-bottom: 1px solid #ccc;
    text-indent: 16px;
    font-size: 14px;
}
.findPassword_body .yzm{
    position: relative;
}
.findPassword_body .yzm button{
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
.findPassword_body .findPassword_text{
    width: 45%;
    height: 42px;
    border: none;
    text-indent: 3px;
    font-size: 14px;
    padding: 3px 15px 3px 15px ;
}
.findPassword_body .findPassword_btn{
    height: 40px;
    line-height: 40px;
    width:100%;
}
.findPassword_btn button{
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
.findPassword_body .findPassword_link{
    display: flex;
    justify-content: space-between;
}
.findPassword_link a{
    text-decoration: none;
    font-size: 12px;
    margin:10px 10px;
    color: #6495ED;
}
</style>
