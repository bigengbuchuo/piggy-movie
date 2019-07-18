<template>
    <div class="movie-body">
        <loading v-if="needLoading" />
        <betterScroll v-else v-bind:handleToScroll="handleToScroll" v-bind:handleToTouch="handleToTouch">
            <ul>
                <!-- <li>
                    <div class="pic">
                        <img src="/images/1.jpg" alt="电影海报">
                    </div>
                    <div class="info-list">
                        <h2>千与千寻1</h2>
                        <p>大众评分 <span class="grade">9.2</span></p>
                        <p>主演：aaa,bbb,ccc</p>
                        <p>今天65家影院放映609场</p>
                    </div>
                    <div class="pre">预售</div>
                </li>
                <li>
                    <div class="pic">
                        <img src="/images/2.jpg" alt="电影海报">
                    </div>
                    <div class="info-list">
                        <h2>千与千寻2</h2>
                        <p>大众评分 <span class="grade">9.3</span></p>
                        <p>主演：aaa,bbb,ccc</p>
                        <p>今天65家影院放映609场</p>
                    </div>
                    <div class="pre">预售</div>
                </li>
                <li>
                    <div class="pic">
                        <img src="/images/3.jpg" alt="电影海报">
                    </div>
                    <div class="info-list">
                        <h2>千与千寻3</h2>
                        <p>大众评分 <span class="grade">9.3</span></p>
                        <p>主演：aaa,bbb,ccc</p>
                        <p>今天65家影院放映609场</p>
                    </div>
                    <div class="pre">预售</div>
                </li>
                <li>
                    <div class="pic">
                        <img src="/images/1.jpg" alt="电影海报">
                    </div>
                    <div class="info-list">
                        <h2>千与千寻4</h2>
                        <p>大众评分 <span class="grade">9.4</span></p>
                        <p>主演：aaa,bbb,ccc</p>
                        <p>今天65家影院放映609场</p>
                    </div>
                    <div class="pre">预售</div>
                </li>
                <li>
                    <div class="pic">
                        <img src="/images/2.jpg" alt="电影海报">
                    </div>
                    <div class="info-list">
                        <h2>千与千寻5</h2>
                        <p>大众评分 <span class="grade">9.5</span></p>
                        <p>主演：aaa,bbb,ccc</p>
                        <p>今天65家影院放映609场</p>
                    </div>
                    <div class="pre">预售</div>
                </li> -->
                <li class="wait" ref="wait">{{ pulldown }}</li>
                <li v-for="item in comingList" :key="item.id">
                    <div class="pic">
                        <img :src="item.img | setWH('128.180')" alt="电影海报">
                    </div>
                    <div class="info-list">
                        <h2>{{ item.nm }}<img v-if="item.version" src="@/assets/3d.png" alt="iamx"></h2>
                        <p><span class="want">{{ item.wish }}</span> 人想看</p>
                        <p>主演：{{ item.star }}</p>
                        <p>{{ item.rt }}上映</p>
                    </div>
                    <div class="pre">预售</div>
                </li>
            </ul>
        </betterScroll>
    </div>
</template>

<script>
export default {
    name:'coming',
    data(){
        return{
            comingList:[],
            pulldown:'',
            needLoading: true,
            preCityId:-1
        };
    },
    activated(){

        var cityId=this.$store.state.city.id;
        if( this.preCityId === cityId){return;} 
        this.needLoading = true;

        this.axios.get('/api/movieComingList?cityId='+cityId).then((res)=>{
            var msg=res.data.msg;
            if(msg === 'ok'){
                this.needLoading=false;
                this.comingList = res.data.data.comingList;
                this.preCityId = cityId;
            }
        })
    },
    methods:{
        handleToScroll(pos){
            if(pos.y > 30){
                this.$refs.wait.style.height=36+'px';
                this.$refs.wait.style.borderBottom='1px #e6e6e6 solid';
                this.pulldown='正在刷新中，请稍后...'
            }
        },
        handleToTouch(pos){
            if(pos.y > 30){
                this.axios.get('/api/movieOnInfoList?cityId=11').then((res)=>{
                    var msg=res.data.msg;
                    if(msg === 'ok'){
                        this.$refs.wait.style.height=36+'px';
                        this.$refs.wait.style.borderBottom='1px #e6e6e6 solid';
                        this.pulldown='刷新成功'
                        setTimeout(()=>{
                            this.$refs.wait.style.height=0;
                            this.$refs.wait.style.borderBottom='0';
                            this.moviemes = res.data.data.movieList;
                            this.pulldown='';
                        },1000)
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
    .movie-body{
        /* flex:1; */
        overflow: auto;
    }
    .movie-body ul{
        margin:0 12px;
        overflow: hidden;
    }
    .movie-body .wait{
        color:#666;
        font-size: 14px;
        vertical-align: middle;
        height:0;
        margin-top: 0px;
        padding-bottom: 0px;
        border-bottom: 0px;
    }
    .movie-body ul li{
        margin-top:12px;
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e6e6 solid;
        padding-bottom:10px;
    }
    .movie-body .pic{
        width:64px;
        height:90px;
    }
    .movie-body .pic img{
        width:100%;
    }
    .info-list{
        margin-left:10px;
        /* flex:1; */
        position:relative;
    }
    .info-list h2{
        font-size:14.5px;
        line-height:24px;
        width:150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .info-list p{
        font-size:13px;
        color:#666;
        line-height:22px;
        width:200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .info-list .grade{
        font-weight:700;
        color:#faaf00;
        font-size:15px;
    }
    .info-list img{
        width:50px;
        position:absolute;
        right:10px;
        top:5px;
    }
    .buy,.pre{
        width: 47px;
        height: 27px;
        line-height: 28px;
        text-align: center;
        background-color: #f03d37;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
    }
    .pre{
        background-color: #3c9fe6;
    }
</style>
