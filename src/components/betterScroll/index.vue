<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import bscroll from 'better-scroll';
export default {
    name:'betterScroll',
    props:{
        handleToScroll:{ //重新自定义了两个方法
            type:Function,
            default:function(){
            }
        },
        handleToTouch:{
            type:Function,
            default:function(){
            },
        }
    },
    mounted(){
        var scroll =new bscroll( this.$refs.wrapper , {tap:true,probeType: 1} );

        scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos);
        });

        scroll.on('touchEnd',(pos)=>{
            this.handleToTouch(pos);
        });
    }
}
</script>

<style scoped>
    .wrapper{
        height:100%;

    }
</style>
