<template>
    <div class="cinema-body">
        <loading v-if="needLoading" />
        <betterScroll v-else>
        <ul>
            <!-- <li>
                <div>
                    <span class="name">华夏优加影城（长和国际店</span>
                    <span class="all"><span  class="price">39.9</span> 元起</span>
                </div>
                <div  class="address">
                    <span>未央区经济技术开发区凤城八路与明光路交汇处长和国际卜蜂中心4</span>
                    <span class="meter">905.6km</span>
                </div>
                <div  class="card">
                    <div class="c1">改签</div>
                    <div class="c1">退</div>
                    <div class="c2">折扣卡</div>
                    <div class="c2">小吃</div>
                </div>
            </li>
            <li>
                <div>
                    <span class="name">华夏优加影城（长和国际店</span>
                    <span class="all"><span  class="price">39.9</span> 元起</span>
                </div>
                <div  class="address">
                    <span class="txt">未央区经济技术开发区凤城八路与明光路交汇处长和国际卜蜂中心4</span>
                    <span class="meter">905.6km</span>
                </div>
                <div  class="card">
                    <div class="c1">改签</div>
                    <div class="c1">退</div>
                    <div class="c2">折扣卡</div>
                    <div class="c2">小吃</div>
                </div>
            </li>
            <li>
                <div>
                    <span class="name">华夏优加影城（长和国际店</span>
                    <span class="all"><span  class="price">39.9</span> 元起</span>
                </div>
                <div  class="address">
                    <span>未央区经济技术开发区凤城八路与明光路交汇处长和国际卜蜂中心4</span>
                    <span class="meter">905.6km</span>
                </div>
                <div  class="card">
                    <div class="c1">改签</div>
                    <div class="c1">退</div>
                    <div class="c2">折扣卡</div>
                    <div class="c2">小吃</div>
                </div>
            </li> -->
            <li v-for="item in cinameList" :key="item.id">
                <div>
                    <span class="name">{{ item.nm }}</span>
                    <span class="all"><span  class="price">{{ item.sellPrice }}</span> 元起</span>
                </div>
                <div  class="address">
                    <span>{{ item.addr }}</span>
                    <span class="meter">{{ item.distance }}</span>
                </div>
                <div  class="card">
                    <div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class="key | classcard">{{ key | classify }}</div>
                </div>
            </li>
        </ul>
        </betterScroll>
    </div>
</template>

<script scoped>
export default {
    name:'cinemalist',
    data(){
        return{
            cinameList:[],
            needLoading: true,
            preCityId:-1
        }
    },
    activated(){

        var cityId=this.$store.state.city.id;
        if( this.preCityId === cityId){return;} 
        this.needLoading = true;

        this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
            var msg=res.data.msg;
            if(msg === 'ok'){
                this.needLoading=false;
                this.preCityId = cityId;
                this.cinameList = res.data.data.cinemas;
            }
        });
    },
    filters:{
        classify(key){
            var card=[
                {key:'allowRefund',value:'改签'},
                {key:'endorse',value:'退'},
                {key:'sell',value:'折扣卡'},
                {key:'snack',value:'小吃'},
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return '';
        },
        classcard(key){
            var card=[
                {key:'allowRefund',value:'c1'},
                {key:'endorse',value:'c1'},
                {key:'sell',value:'c2'},
                {key:'snack',value:'c2'},
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return '';
        }
    }

}
</script>

<style scoped>
    .cinema-body{
        flex: 1;
        overflow: auto;
    }
    /* .cinema-body .wrapper{
        margin-bottom: 10px;
    } */
    .cinema-body div{
        margin-bottom: 10px;
    }
    .cinema-body ul{
        padding: 20px;
    }
    .cinema-body li{
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 10px;
    }
    .cinema-body .name{
        font-size: 14px;
    }
    .cinema-body .all{
        font-size: 11px;
        color: #f03d37;
    }
    .cinema-body .price{
        font-size: 17px;
    }
    .cinema-body .address{
        font-size: 13px;
        color: #666;
    }
    .txt{
        font-size: 11.6px;
    }
    .cinema-body .meter{
        float:right;
    }
    .cinema-body .card{
        display: flex;
    }
    .card div{
        padding: 0 3px;
        height: 16px;
        line-height: 15px;
        border-radius: 2px;
        color: #f90;
        border: 1px solid #f90;
        font-size: 12px;
        margin-right: 5px;
    }
    .cinema-body .c1{
        color: #589daf;
        border: 1px solid #589daf;
    }
    .cinema-body .c2{
        color: #f90;
        border: 1px solid #f90;
    }


    
</style>
