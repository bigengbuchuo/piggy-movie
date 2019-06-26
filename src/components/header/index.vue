<template>
    <div class="header">
        <h1>{{title}}</h1>
    </div>
</template>

<script>
export default {
    name:'header',
    props:{
        title:{
            type:String,
            default:'小 猪 电 影'
        }
    }
}
</script>

<style scoped>
.header{
    width:100%;
    height:50px;
    color:#fff;
    background-color: #6495ED;;
    border-bottom:1px solid #fff;
    position:relative;
}
.header h1{
    font-size:15px;
    text-align:center;
    line-height:50px;
    font-weight: normal;
}
.header i{
    position:absolute;
    left:5px;
    top:50%;
    margin-top:-13px;
    font-size:26px;
}
</style>
