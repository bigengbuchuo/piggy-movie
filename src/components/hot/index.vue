<template>
    <div class="movie-body">
        <ul>
            <li>
                <div class="pic">
                    <img src="/images/1.jpg" alt="电影海报">
                </div>
                <div class="info-list">
                    <h2>千与千寻1</h2>
                    <p>大众评分 <span class="grade">9.2</span></p>
                    <p>主演：aaa,bbb,ccc</p>
                    <p>今天65家影院放映609场</p>
                </div>
                <div class="buy">购票</div>
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
                <div class="buy">购票</div>
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
                <div class="buy">购票</div>
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
                <div class="buy">购票</div>
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
                <div class="buy">购票</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"hot"
}
</script>

<style scoped>
    .movie-body{
        flex:1;
        overflow: auto;
    }
    .movie-body ul{
        margin:0 12px;
        overflow: hidden;
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
        flex:1;
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
    .buy,.btn-pre{
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
    .btn-pre{
        background-color: #3c9fe6;
    }


</style>
