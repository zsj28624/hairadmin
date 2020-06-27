<template>
    <div class="topnav">
        <ul>
            <li v-for="(item,index) in navs" :key="index" :class="{active:curIndex==index}" @click="toggolat(index)">{{item}}</li>
        </ul>
    </div>
</template>
<script>
import { parse } from 'querystring'
export default {
    props:{
        navs:{
            type:Array,
            default:[],
        }
    },
    data(){
        return{
            curIndex:0
        }
    },
    methods:{
        toggolat(index){
            this.curIndex=index
            this.$parent.curIndex=index;
        }
    }
    
}
</script>
<style lang="less" scoped>
.topnav{margin-bottom:20px;}
ul{display: flex;}
li{height: 26px;line-height: 26px;font-size: 16px;padding:0 20px;border:1px solid rgba(0,0,0,0);cursor: pointer;border-radius:5px;
    &:hover{color:#bd0000;}
    &.active{border:1px solid #bd0000;color:#bd0000;border-radius:5px;}
}
</style>