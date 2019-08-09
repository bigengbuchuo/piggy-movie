<template>
    <div class="detailbox slide-detail" >
        <!-- <div class="header">
            <i class="iconfont icon-right"></i><h1>影片详情</h1>
        </div> -->
        <Header title="影 片 详 情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>  
            <!-- 放一个插槽，在header里面用slot配置 -->
        </Header>
        <loading v-if="needLoading" />
        <div v-else class="content">
            <div class="detail_list">
                <div class="bg" :style="{ 'background-image':'url('+detailMovie.img.replace(/w\.h/,'148.208')+')' }"></div>
                <div class="filter"></div>
                <div class="list">
                    <div class="img">
                        <img v-bind:src="detailMovie.img | setWH('148.200')" alt="">
                    </div>
                    <div class="info">
                        <h2>{{ detailMovie.nm }}</h2>
                        <p>{{ detailMovie.enm }}</p>
                        <p>{{ detailMovie.sc }}</p>
                        <p>{{ detailMovie.cat }}</p>
                        <p>{{ detailMovie.src }} / {{ detailMovie.dur }}分钟</p>
                        <p>{{ detailMovie.pubDesc }}</p>
                    </div>
                </div>
            </div>
            <div class="mes">
                <div>影片简介</div>
                <p>{{ detailMovie.dra }}</p>
            </div>
            <!-- <div class="swiperbox detail_player" ref="detail_player">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide">
                        <div>
                            <img src="images/person1.jpg" alt="">
                        </div>
                        <p>演员</p>
                        <p>演员</p>
                    </li>
                </ul>
            </div> -->
        </div>
    </div>
</template>

<script>
import Header from '@/components/header';

export default {
    name:'detail',
    data(){
        return{
            detailMovie:{},
            needLoading:true
        }
    },
    components:{
        Header
    },
    props:['movieId'],
    methods:{
        handleToBack(){
            this.$router.back();  //路由所带的方法，返回到前一页
        }
    },
    mounted(){
        // console.log(this.movieId)
        this.axios.get('/api/detailmovie?movieId='+this.movieId).then((res)=>{
            var msg=res.data.msg;
            if(msg==='ok'){
                this.needLoading=false;
                this.detailMovie=res.data.data.detailMovie;
                //Swiper
                
                // this.$nextTick(()=>{
                //     new Swiper(this.$refs.detail_player),{
                //         slidesPerView:'auto',
                //         freeMode:true,
                //         freeModeSticky:true
                //     }
                // });
            }
        });
    }
}
</script>

<style scoped>
.detailbox{
    position:absolute;
    left:0;
    top:0;
    z-index:100;
    width:100%;
    min-height:100%;
    background:#fff;
}
/* 动画 */
.slide-detail{
    animation: .3s slideMove;
}
@keyframes slideMove{
    0%{ transform: translateX(100%);}
    100%{ transform: translateX(0);}
}
/* 动画结束 */
.detail_list{
    position: relative;
    height: 195px;
    width: 100%;
}
.bg{
    background:0 40%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    background-size: cover;
}
.filter{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #616975;
    opacity: .55;
    z-index: 1;
}
.content,.list{
    display: flex;
    width: 100%;
    min-height: 100%;
    position: relative;
    left: 0;
    top: 0;
    z-index: 2;
}
.img {
    width: 108px;
    height: 150px;
    border: 1px solid #f0f2f3;
    margin: 20px;
}
.img img{
    width: 100%;
    height: 100%;
}
.info{
    margin-top: 20px;
}
.info h2{
    font-size: 18px;
    color: #fff;
    font-weight: 400;
    line-height: 40px;
}
.info p{
    color: #fff;
    line-height: 20px;
    font-size: 13px;
    color: #ccc;
}
.mes{
    padding:13px;
    overflow: auto;
}
.mes div{
    font-size: 16px;
    font-weight: 400;
    line-height: 40px;
}
.mes p{
    font-size: 13px;
    line-height: 40px;
}
.swiperbox{
    margin-top:15px;
    padding:10px;
}
.swiper-slide p{
    font-size: 13px;
}
</style>
