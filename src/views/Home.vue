<template>
  <div class="home">
    <header>后台管理系统</header>
    <div class="content">
      <ul class="left">
        <li v-for="(item,index) in navs" :key="index"
        :class="{active:curIndex==index}"
        @click="toggolMenu(item,index)"><i :class="item.icon" 
         ></i>{{item.label}}</li>
      </ul>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data(){
    return{
      curIndex:0,
      navs:[
        {label:'用户订单管理',icon:'el-icon-eleme',path:'order',},
        {label:'用户评价管理',icon:'el-icon-goods',path:'evaluate',},
        {label:'作品管理',icon:'el-icon-picture-outline',path:'works',},
        {label:'VIP会员管理',icon:'el-icon-camera',path:'member',},
        {label:'发型师师管理',icon:'el-icon-video-camera',path:'Stylist',},
      ]
    }
  },
  created(){
    console.log(this.$route);
    for(let i=0;i<this.navs.length;i++){
      if(this.navs[i].path==this.$route.name){
        this.curIndex=i;
      }
    }
  },
  methods:{
    toggolMenu(item,index){
      this.curIndex=index;
      this.$router.push(item.path)
    }
  }
}
</script>
<style lang="less" scoped>
header{height: 60px;line-height: 60px;background:#4c535a;font-size: 24px;color:#fff;padding:0 20px;}
.content{position: absolute;top:60px;width: 100%;bottom:0;display:flex;
  .left{width: 180px;height: 100%;background:#545c64;flex-shrink: 0;
    li{width: 100%;color:#fff;font-size: 14px;cursor: pointer;
      line-height: 56px;padding:0 20px;box-sizing: border-box;
      &:hover{background:rgba(0,0,0,0.2);transition:0.3s;}
      &.active{color:#ffd04b;i{color:#ffd04b}}
      i{font-size: 18px;margin-right:10px;}
    }
  }
  .right{flex-grow: 1;padding:20px 20px 20px 20px;overflow: auto;}
}
::-webkit-scrollbar {
	width: 2px; /*对垂直流动条有效*/
}
/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track{
	background-color: #fff;
}
/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb{
	background-color: #ccc;
}



</style>
