<template>
    <div class="evaluate">
        <topnav :navs="navs"></topnav>
        <metable :theads="theads" :tbodys="tbodys">
            <template v-slot:thead>
                <th>状态</th>
                <th>评分</th>
                <th>操作</th>
            </template>
            <template v-slot:tbody="data">
                <td>{{data.row.status == 0 ? ' 已隐藏':'已显示'}}</td>
                <td>
                    <span :class="data.row.score | toClassstr">{{data.row.score}}</span>
                </td>
                <td>
                    <i class="el-icon-view green" @click="toggol(data.row)"></i>
                    <i class="el-icon-delete red" @click="deleteItem(data.row)"></i>
                </td>
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
            navs:['全部','4分以下','3分以下','2分以下'],
            theads:[
                {label:'订单时间',prop:'orderdate'},
                {label:'订单号',prop:'ordernum'},
                {label:'到店时间',prop:'arrialDate'},
                {label:'用户名',prop:'username'},
                {label:'发型师',prop:'stylist'},
                {label:'预约项目',prop:'project'},
                {label:'价位',prop:'price'},
                {label:'评论内容',prop:'content',},
            ],
            tbodys:[],
        }
    },
    created(){
        this.init()
    },
    methods:{
        toggol(item){
            console.log(item)
            this.$message.closeeAll()
            let status = item.status == 1 ? 0 : 1
            this.http.post('evaluation/toggleEvalution.php',{
                ordernum:item.ordernum,
                status:status
            }).then(res=>{
                if(res.data.status==1){
                    this.$message.success(res.data.message);
                    this.init()
                }else{
                    this.$message.error(res.data.message);
                }
            })
        },
        deleteItem(item){
            console.log(item)
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.dodelete(item)
            }).catch(() => {
                      
            });
        },
        dodelete(item){
            console.log(item)
            this.http.post('evaluation/deleEvalution.php',{ordernum:item.ordernum}).then(res=>{
                if(res.data.status==1){
                    this.$message.success(res.data.message);
                    this.init();
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        init(){
            this.http.post('evaluation/getAllEvalutions.php').then(res=>{
                console.log(res.data);
                if(res.data.status){
                    this.$store.commit('setData',{
                        key:'evaluatelist',value:res.data.result
                    })
                    this.handleData();
                };
                
            })
        },
        handleData(data){
            let tempdate=JSON.parse(JSON.stringify(this.allDatas))
            if(this.curIndex==0){
                this.tbodys=tempdate;
            }else{
                this.tbodys = tempdate.filter(item=>{
                    return item.score < 5 -  this.curIndex
                })
            }
        },
    },
    watch:{
        curIndex(value){
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
            return this.$store.state.evaluatelist;
        }
    },
    filters:{
        toClassstr(value){
            console.log(value)
            if(value == 5){
                return 'green'
            }else if(value < 2){
                return 'red'
            }else{
                return 'gray';
            }
        }
    }
}
</script>
<style lang="less" scoped>
i{font-size: 20px;}
</style>