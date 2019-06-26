<template>
    <div id='main'>
        <Header title="小 猪 影 院"/>
        <div class="content">
                <div class="cinema-menu">
                    <router-link tag="div" to="/cinema/cinemalist" class="cinemalist">
                        全城<i class="iconfont icon-triangle"></i>
                    </router-link >
                    <router-link tag="div" to="/cinema/brand" class="brand">
                        品牌<i class="iconfont icon-triangle"></i>
                    </router-link >
                    <router-link tag="div" to="/cinema/feature" class="feature">
                        特色<i class="iconfont icon-triangle"></i>
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
    name:'cinema',
    components:{
        Header,
        Button
    }
}
</script>

<style scoped>
.cinema-menu{
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
}
.cinemalist,.brand,.feature{
    font-size: 14px;
}
</style>
