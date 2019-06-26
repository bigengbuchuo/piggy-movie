<template>
    <div class="search-body">
        <div class="search_input">
            <div class="wrapper">
                <i class="iconfont icon-find"></i>
                <input type="text">
            </div>
        </div>
        <div class="result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li>
                    <div class="pic">
                        <img src="/images/1.jpg" alt="电影海报">
                    </div>
                    <div class="info-list">
                        <p>
                            <span class="p1">千与千寻1</span>
                            <span class="p2">9.1</span>
                        </p>
                        <p>asdfvvvv</p>
                        <p>动漫，剧情，感悟</p>
                        <p>2019-6-15</p>
                    </div>
                </li>
                <li>
                    <div class="pic">
                        <img src="/images/1.jpg" alt="电影海报">
                    </div>
                    <div class="info-list">
                        <p>
                            <span class="p1">千与千寻2</span>
                            <span class="p2">9.2</span>
                        </p>
                        <p>asdfvvvv</p>
                        <p>动漫，剧情，感悟</p>
                        <p>2019-6-15</p>
                    </div>
                </li>
                <li>
                    <div class="pic">
                        <img src="/images/1.jpg" alt="电影海报">
                    </div>
                    <div class="info-list">
                        <p>
                            <span class="p1">千与千寻3</span>
                            <span class="p2">9.3</span>
                        </p>
                        <p>asdfvvvv</p>
                        <p>动漫，剧情，感悟</p>
                        <p>2019-6-15</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'search'
}
</script>

<style scoped>
    .search-body{
        flex:1;
        overflow: auto;
    }
    .search_input{
        padding: 8px 10px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #e5e5e5;
    }
    .search-body ul{
        margin:0 12px;
        overflow: hidden;
    }
    .wrapper{
        padding: 0 10px;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        background-color: #fff;
        display: flex;
        line-height: 20px;
    }
    .wrapper i{
        font-size: 16px;
        padding: 4px 0;
    }
    .wrapper input{
        border: none;
        font-size: 13px;
        color: #333;
        margin-left: 5px;
        width: 100%;
    }
    .result h3{
        font-size: 15px;
        color: #999;
        padding: 9px 15px;
        border-bottom: 1px solid #e6e6e6;
    }
    .search-body ul li{
        margin-top:12px;
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e6e6 solid;
        padding-bottom:10px;
    }
    .search-body .pic{
        width:64px;
        height:90px;
    }
    .search-body img{
        width:100%;
    }
    .info-list{
        margin-left:16px;
        flex:1;
        position:relative;
    }
    .info-list .p1{
        flex:1;
        font-size:17px;
    }
    .info-list .p2{
        font-size: 16px;
        color: #fc7103;
    }
    .info-list p{
        display: flex;
        font-size:12px;
        line-height:22px;
        width:200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .info-list img{
        width:50px;
        position:absolute;
        right:10px;
        top:5px;
    }

</style>
