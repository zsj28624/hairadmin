<template>
    <div class="metable">
        <table cellspacing="0" border="0">
            <thead>
                <tr>
                    <th>序号</th>
                    <th v-for="(item,index) in theads" :key="index" :width="width">{{item.label}}</th>
                    <slot name="thead"></slot>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in tbodys" :key="index">
                    <td>{{index+1}}</td>
                    <td v-for="(subitem,subindex) in theads" :key="subindex">{{item[subitem.prop]}}</td>
                    <slot name="tbody" :row="item"></slot>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props:{
        theads:Array,
        tbodys:Array,
        width:{
            type:[Number,String],
            default:110
        }
    }
}
</script>
<style lang="less" scoped>
table{width: 100%;}
thead{background:#545c64;color:#fff;font-size: 14px;}
th,td{padding:10px 0;text-align: center;border-bottom:1px solid #ddd;}
td img{width: 60px;}
td i{font-size: 20px;}
</style>