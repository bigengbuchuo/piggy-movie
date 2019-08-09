<template>
    <div class="city-body">
        <!-- <div class="city-list">
            <div class="city-hot">
                <h2>热门城市</h2>
                <ul class="cities">
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                </ul>
            </div>
            <div class="city-sort">
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div>
                    <h2>C</h2>
                    <ul>
                        <li>福建</li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city-index">
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
            </ul>
        </div> -->
        <div class="city-list">
            <loading v-if="needLoading" />
            <betterScroll v-else>
                <div>
                    <div class="city-hot">
                        <h2>热门城市</h2>
                        <ul class="cities">
                            <li v-for="item in hotCity" :key="item.id" v-on:tap="toCity(item.nm,item.id)">{{ item.nm }}</li>
                        </ul>
                    </div>
                    <div class="city-sort" ref="city_sort">
                        <div v-for="item in cityListed" :key="item.index">
                            <h2>{{ item.index }}</h2>
                            <ul>
                                <li v-for="item2 in item.list" :key="item2.id"  v-on:tap="toCity(item2.nm,item2.id)">{{ item2.nm }}</li>
                            </ul>
                        </div>
                    </div> 
                </div>
            </betterScroll>
        </div>
        <div class="city-index">
            <ul>
                <li v-for="(item,index) in cityListed" :key="item.index" v-on:touchstart="hunt(index)">{{item.index}}</li>
            </ul>
        </div>  
    </div>
</template>

<script>
export default {
    name:'city',
    data(){
        return{
            cityListed:[],
            hotCity:[],
            needLoading: true
        }
    },
    mounted(){  //在mounted生命周期中代理数据

        var cityListed=window.localStorage.getItem('cityListed');
        var hotCity=window.localStorage.getItem('hotCity');

        if( cityListed && hotCity ){
            this.cityListed = JSON.parse(cityListed);  //解析字符串
            this.hotCity = JSON.parse(hotCity); 
            this.needLoading=false;
        }
        else{
            this.axios.get('/api/cityList').then((res)=>{
                var msg=res.data.msg; 
                if(msg==='ok'){
                    this.needLoading=false;
                    var cities=res.data.data.cities;
                    // [{index:'A',list:[{nm:'阿拉',id:123}]}]
                    var {cityListed , hotCity} = this.trim(cities);  //解构映射
                    this.cityListed=cityListed;
                    this.hotCity=hotCity;
                    window.localStorage.setItem('cityListed',JSON.stringify(cityListed));  //本地存储的类型是字符串类型,要转成字符串类型
                    window.localStorage.setItem('hotCity',JSON.stringify(hotCity));
                }
            })
        }    
    },
    methods:{
        trim(cities){
            var cityListed=[];
            var hotCity=[];

            for(var i=0;i<cities.length;i++){
                if(cities[i].isHot === 1){
                    hotCity.push(cities[i]);
                }
            }

            for(var i=0;i<cities.length;i++){
                var one=cities[i].py.substring(0,1).toUpperCase();  //转大写
                if(check(one)){  //创建未知索引
                    cityListed.push({index:one,list:[{nm:cities[i].nm,id:cities[i].id}]})
                }else{  //添加到已知索引
                    for(var j=0;j<cityListed.length;j++){
                        if(cityListed[j].index===one){
                            cityListed[j].list.push({nm:cities[i].nm,id:cities[i].id})
                        }
                    }
                }
            }

            cityListed.sort((n1,n2)=>{  //排序
                if(n1.index>n2.index){
                    return 1;
                }else if(n1.index<n2.index){
                    return -1;
                }else{
                    return 0;
                }
            });

            function check(one){   //已排序列表是否存在索引
                for(var i=0;i<cityListed.length;i++){
                    if(cityListed[i].index === one){
                        return false;
                    }
                }
                return true;
            }
            // console.log(cityListed);
            // console.log(hotCity);

            return {
                cityListed,
                hotCity
            };
        },
        hunt(index){
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');  //选定元素+事件获取h2标签
            this.$refs.city_sort.parentNode.parentNode.parentNode.scrollTop = h2[index].offsetTop-52;  //city-list那个div
        },
        toCity(nm,id){
            this.$store.commit('city/CITY_INFO',{ nm , id });
            window.localStorage.setItem('nownm',nm);//记录上次的城市，而不是刷新之后又回到默认的北京
            window.localStorage.setItem('nowid',id);
            this.$router.push('/movie/hot');  //点击之后跳转到hot
        }
    }
}
</script>

<style scoped>
.city-body{
    display: flex;
    width: 100%;
    flex: 1;
    overflow: auto;
}
.city-list{
    flex:1;
    overflow:auto;
    background: #FFFAFA;
}
.city-list::-webkit-scrollbar{
    background-color: transparent;
    width:0;
}
.city-hot{
    margin-top:20px;
}
.city-hot h2{
    font-size:14px;
    padding-left:15px;
    line-height: 30px;
    background:rgb(239, 255, 255);
    font-weight:400;
}
.cities li{
    float:left;
    width:29%;
    height:33px;
    margin-top:15px;
    margin-left:3%;
    background: #fff;
    text-align: center;
    line-height:33px;
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
}
.city-sort div{
    margin-top:20px;
}
.city-sort h2{
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    background: rgb(239, 255, 255);
    font-weight: 400;
}
.city-sort ul{
    padding-left: 10px;
    margin-top: 10px;
}
.city-sort li{
    line-height: 30px;
}
.city-index{
    width: 20px;
    /* display: flex; */
    flex-direction: column;
    justify-content: center;  
    text-align: center;
    border-left: 1px solid #e6e6e6;
}
.cities::after{
    content:'';
    display: block;
    clear:both;
}
.city-hot,.city-sort{
    font-size: 13px;
}
.movie-menu::-webkit-scrollbar,
.city-body::-webkit-scrollbar {
    display:none
}
</style>
