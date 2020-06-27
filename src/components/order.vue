<template>
    <div class="arder">
        <topnav :navs="navs"></topnav>
        <metable :theads="theads" :tbodys="tbodys">
            <template v-slot:thead>
                <th>价位</th>
                <th>状态</th>
                <th v-if="curIndex==1">操作</th>
            </template>
            <template v-slot:tbody="data">
                <td>￥{{data.row.price}}</td>
                <td>
                    <span :class="data.row.status | toClassstr">{{data.row.status | toText}}</span>
                </td>
                <td v-if="curIndex==1"><i class="el-icon-circle-check green"
                @click="finishItem(data.row)"></i></td>
            </template>
        </metable>
    </div>
</template>
<script>
import topnav from './common/topnav'
import metable from './common/metable'
export default {
    components:{
        topnav,metable,
    },
    data(){
        return{
            curIndex:0,
            navs:['全部','未完成','已取消','已完成','已评价'],
            // theads:['','','','','','','','','']
            theads:[
                {label:'订单时间',prop:'orderdate'},
                {label:'订单号',prop:'ordernum'},
                {label:'用户名',prop:'username'},
                {label:'预约项目',prop:'project'},
                {label:'发型师',prop:'stylist'},
                {label:'到店时间',prop:'arrialDate'},
            ],
            tbodys:[],
        }
    },
    created(){
        if(this.allDatas){
            this.handleData();
        }else{
            this.init();
        }
    },
    methods:{
        init(){
            this.http.post('order/getAllOrder.php').then(res=>{
                if(res.data.status){
                    console.log(res.data)
                    this.$store.commit('setData',{
                        key:'orderlist',value:res.data.result
                    })
                    this.handleData();
                };
                
            })
        },
        handleData(data){
            
            let tempdate=JSON.parse(JSON.stringify(this.allDatas))
            if(this.curIndex==0){
                this.tbodys=tempdate;
                console.log(this.curIndex)
            }else{
                this.tbodys = tempdate.filter(item=>{
                    return item.score == this.curIndex-1
                    console.log(this.curIndex)
                    console.log(this.tbodys)
                })
            }
        },
        finishItem(item){
            if(item.isClicked){
                return
            };
            item.isClicked=true;
            console.log(item)
            this.$message.closeAll()
            this.http.post('order/setOderComplete.php',{ordernum:item.ordernum}).then(res=>{
                console.log(res.data)
                item.isClicked=false;
                if(res.data.status==1){
                    this.$message.success(res.data.message);
                    this.init()
                }else{
                    this.$message.error(res.data.message)
                }
            })
        }
    },
    watch:{
        curIndex(value){
            console.log(value)
            this.handleData()
        },
        allDatas:{
            handler(){
                this.handleData();
            },
            deep:true
        }
    },
    computed:{
        allDatas(){
            return this.$store.state.orderlist;
        }
    },
    filters:{
        toText(value){
            let arr=['未完成','已取消','已完成','已评价'];
            return arr[value]
        },
        toClassstr(value){
            let arr=['red','gray','green','gray'];
            return arr[value]
        }
    },
}
</script>
<style lang="less" scoped>
i{font-size: 20px;cursor: pointer;}
</style>