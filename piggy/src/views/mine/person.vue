<template>
    <div class="wrapper">
        <div class='headWrapper'>
            <div class='headBox'>
                <img class="userHead" :src="$store.state.user.userHead">
                <div class="upload"><i class="iconfont icon-pic"></i>上传头像
                    <input class="upload" style="opacity: 0;" type="file" name="file" value="上传头像" @change="handleToUpload">   
                </div>
            </div>
        </div>
        <div class='midWrapper'>
            <div class="userName">用户名：{{ $store.state.user.name }}</div>
            <div class="admin" v-if="$store.state.user.isAdmin" >用户身份：管理员</div>
            <div class="adminEnter" v-if="$store.state.user.isAdmin" >
                <a href="/admin" target="_blank"><i class="iconfont icon-admin"></i>进入管理后台</a>
            </div>    
            <div class="ordinary" v-else>用户身份：普通会员</div>
            <div class="out"><a href="javascript:;" @touchstart="handleToLogout">安全退出账户</a></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {msgBox} from '@/components/js'
export default {
    name:'person',
    methods:{
        handleToLogout(){
            this.axios.get('/api2/users/logout').then((res)=>{
                var status=res.data.status;
                if(status === 0){
                    localStorage.removeItem('name');
                    localStorage.removeItem('isAdmin');
                    this.$store.commit('user/USER_NAME',{name:'',isAdmin:false,userHead:''});
                    this.$router.push('/mine/login');  //路由路径，而不是文件夹路径
                }
            });
        },
        handleToUpload(ev){
            // console.log(ev);
            var file = ev.target.files[0]; //拿到存储图片的file文件
           
            //压缩图片开始
            var img = new Image();   //img对象，当作一个容器接收file文件转化成的的base64，等于接受了图片，可以进行图片操作了，否则无法对文件进行图片操作
            var reader = new FileReader();  //创建FileReader对象 
            reader.readAsDataURL(file);   //读取存储图片的file文件
            reader.onload = function (ev) {
                img.src=this.result;
            }
            var _this=this;

            // console.log(_this);
            img.onload=function(){  //必须要加这一句，监听img完成之后才能获取到宽和高，否则获取的值都是0
                // console.log(img.width);
                // console.log(img.height);
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                var originW = img.width;
                var originH = img.height;
                var maxW = 400 , maxH = 400;
                var targW = originW,targH=originH; //如果不需要压缩，就还是原始的宽高
                if(originW>maxW || originH>maxH){
                    if(originH/originW > maxH/maxW){  //比起想要的比例（当前400/400是1），高/宽更大，说明高更大，设置高作为最大值高，那么宽一定不会超出范围，且是等比缩放
                        targH=maxH;
                        targW=Math.round(maxH * (originW / originH)); //取整
                    }else {
                        targW = maxW;
                        targH = Math.round(maxW * (originH / originW));
                    }
                }
                canvas.width = targW;
                canvas.height = targH;
                context.clearRect(0,0,targW,targH);     //清除画布
                context.drawImage(img,0,0,targW,targH);  //将原图按照比例绘制到新的画布上去
                canvas.toBlob(function(blob){
                    //压缩图片结束
                    // console.log(file);
                    var param = new FormData(); //FormData创建出的实例，可以把文件存储起来，然后传输给后台
                    param.append('file' , blob , file.name);//key值 文件 文件下的name
                    var config={
                        headers:{        //想上传文件post需要改成二进制的数据流，所以设置头信息
                            'Content-Type':'multipart/form-data'  
                        }
                    }
                    _this.axios.post('/api2/users/uploadUserHead',param,config).then((res)=>{
                        var status=res.data.status;
                        // var This=this;
                        if(status === 0){
                            msgBox({
                                title:'信息',
                                content:'上传头像成功',
                                ok:'确定',
                                handleOk(){ //头像上传成功之后更新状态管理
                                    _this.$store.commit('user/USER_NAME',{
                                        name:_this.$store.state.user.name , 
                                        isAdmin:_this.$store.state.user.isAdmin,
                                        userHead:res.data.data.userHead+'?'+Math.random()
                                    });
                                }
                            })
                        }else{
                            msgBox({
                                title:'信息',
                                content:'上传头像失败',
                                ok:'确定',
                            })
                        }
                    });
               },file.type || 'image/png')
            }
        }
        
    },   
    beforeRouteEnter(to,from,next){ 
        axios.get('/api2/users/getUser').then((res)=>{
            var status=res.data.status;
            // console.log(status);
            if(status === 0){
                next(vm=>{
                    localStorage.setItem('name',res.data.data.username);
                    localStorage.setItem('isAdmin',res.data.data.isAdmin);
                    vm.$store.commit('user/USER_NAME',{
                        name:res.data.data.username , 
                        isAdmin:res.data.data.isAdmin,
                        userHead:res.data.data.userHead
                    });
                });
            }else{
                // console.log(status);
                next('/mine/login');
            }
        });
       
    }
}
</script>

<style scoped>
.wrapper{
    height:100%;
}
.userHead{
    width: 56px;
    height:56px;
    border-radius: 50%;
    overflow: hidden;
}
.headWrapper{
    padding:18px;
    border-bottom:1px solid #aaa;
}
.headBox{
    margin:0 auto;
    width: 68px;
}
.upload{
    line-height: 12px;
    width: 68px;
    height: 16px;
    background-color: transparent;
    outline: none;
    color:#fff;
    background-color:#66CCFF;
    font-size:12px;
    padding:3px;
    border-radius: 2px;
    border:1px solid #aaa;
    margin:10px 0 0 -7.5px;
}
.midWrapper{
    padding:0 18px 18px 18px;
}
a{ 
    text-decoration:none; 
    color:#333; 
}
.userName,.ordinary,.admin,.out,.adminEnter{
    height:43px;
    font-size:13px;
    border-bottom:1px solid #aaa;
    line-height:43px;
}
</style>
