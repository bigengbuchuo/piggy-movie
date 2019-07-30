<template>
    <div>
        <div>个人中心:</div>
        <div>当前用户：{{ $store.state.user.name }}
            <a href="javascript:;" @touchstart="handleToLogout">退出</a>
        </div>
        <div v-if="$store.state.user.isAdmin">用户身份：管理员<a href="/admin" target="_blank">进入管理后台</a></div>
        <div v-else>用户身份：普通会员</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'person',
    methods:{
        handleToLogout(){
            console.log(1);
            this.axios.get('/api2/users/logout').then((res)=>{
                var status=res.data.status;
                if(status === 0){
                    this.$store.commit('user/USER_NAME',{name:'',isAdmin:false});
                    this.$router.push('/mine/login');  //路由路径，而不是文件夹路径
                }
            });
        },
    
        beforeRouteEnter(to,from,next){ 
            console.log(2);
            axios.get('/api2/users/getUser').then((res)=>{
                var status=res.data.status;
                // console.log(status);
                if(status === 0){
                    next(vm=>{
                        // console.log(status);
                        vm.$store.commit('user/USER_NAME',{name:res.data.data.username , isAdmin:res.data.data.isAdmin });
                    });
                }else{
                    // console.log(status);
                    next('/mine/login');
                }
            });
        }
    },   
}
</script>

<style>

</style>
