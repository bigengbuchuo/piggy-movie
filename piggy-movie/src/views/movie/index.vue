<template>
    <div id='main'>
        <Header title="小 猪 电 影"/>
            <div class="content">
                <div class="movie-menu">
                    <router-link tag="div" to="/movie/city" class="city-name">
                        <span>{{ $store.state.city.nm }}</span><i class="iconfont icon-triangle"></i>
                    </router-link>
                    <div class="hot-now">
                        <router-link tag="div" to="/movie/hot" class="hot-item">正在热映</router-link>
                        <router-link tag="div" to="/movie/coming" class="hot-item">即将上映</router-link>
                    </div>
                    <router-link tag="div" to="/movie/search" class="search-tip">
                        <i class="iconfont icon-find"></i>
                    </router-link>
                </div>
                <keep-alive>
                    <router-view/>
                </keep-alive>
            </div>
        <Button/>
        <router-view name="detail" />
    </div>
</template>

<script>

import  Header from '@/components/header';
import Button from '@/components/button';
import {msgBox} from '@/components/js/index.js';

export default {
    name:'movie',
    components:{
        Header,
        Button,
    },
    mounted(){
        setTimeout(()=>{
            this.axios.get('/api/getLocation').then((res)=>{
                var msg=res.data.msg;
                if(msg==='ok'){
                    
                    var nm=res.data.data.nm;
                    var id=res.data.data.id;
                    // console.log(this.$store.state.city.id,id);  字符串 数字
                    if(this.$store.state.city.id == id){
                        return;
                    }
                    msgBox({
                        title:'定位',
                        content:nm,
                        cancel:'取消',
                        ok:'切换定位',
                        handleOk(){
                            window.localStorage.setItem('nownm',nm);
                            window.localStorage.setItem('nowid',id);
                            window.location.reload();   //刷新页面
                        },
                    });
                }
            });
        },1500);
    }
}
</script>

<style scoped>
    .movie-menu{
        width:100%;
        height:45px;
        border-bottom: 1px solid #e6e6e6;
        /* display: flex; */
        display: -webkit-box;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        z-index: 10;
    }
    .city-name{
        font-size: 14px;
        margin-left:20px;
        height: 100%;
        line-height: 45px;
    }
    .active{
        color:#6495ED;
        border-bottom: 2px #6495ED solid;
    }
    .router-link-active{
        color:#6495ED;
        border-bottom: 2px #6495ED solid;
    }
    .hot-now{
        display: flex;
        height:100%;
        line-height:45px;
    }
    .hot-item{
        font-size: 14px;
        color: #666;
        width: 80px;
        text-align: center;
        margin: 0 12px;
        font-weight: 700;
    }
    .search-tip{
        margin-right:20px;
        height: 100%;
        line-height: 45px;
    }
    .search-tip i{
        font-size:24px;
        color:#6495ED
    }
    
    
</style>
