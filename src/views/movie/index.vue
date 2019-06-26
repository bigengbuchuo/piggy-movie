<template>
    <div id='main'>
        <Header title="小 猪 电 影"/>
            <div class="content">
                <div class="movie-menu">
                    <router-link tag="div" to="/movie/city" class="city-name">
                        <span>北京</span><i class="iconfont icon-triangle"></i>
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
    </div>
</template>

<script>

import  Header from '@/components/header';
import Button from '@/components/button';

export default {
    name:'movie',
    components:{
        Header,
        Button
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
