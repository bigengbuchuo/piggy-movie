<template>
    <div class="city-body">
        <div class="city-list">
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
        </div>
    </div>
</template>

<script>
export default {
    name:'city'
}
</script>

<style scoped>
.city-body{
    /* display: flex; */
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
