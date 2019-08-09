<template>
    <div class="foot">
        <ul>
            <router-link tag="li" to="/movie">
                <i class="iconfont icon-film"></i>
                <p>电影</p>
            </router-link>
            <router-link tag="li" to="/cinema">
                <i class="iconfont icon-theatre"></i>
                <p>影院</p>
            </router-link>
            <router-link tag="li" to="/mine">
                <i class="iconfont icon-my"></i>
                <p>我的</p>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    name:'button'
}
</script>

<style scoped>  
.foot{
    width:100%;
    height:50px;
    background:#fff;
    border-top:2px #ebe8e3 solid;
    position:fixed;
    left:0;
    bottom:0;
}
.foot ul{
    display:flex;
    text-align: center;
    height:50px;
    align-items:center;
}
.foot ul li{
    flex:1;
    height:40px;
}
.foot .active{
    color: #6495ED;
}
.foot .router-link-active{
    color: #6495ED;
}
.foot ul i{
    font-size:20px;
}
.foot ul p{
    font-size:12px;
    line-height:18px;
}
</style>
