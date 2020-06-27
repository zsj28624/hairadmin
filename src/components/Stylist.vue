<template>
    <div class="stylist">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="所有发型师" name="first">
                <metable  :theads="theads" :tbodys="tbodys">
                    <template v-slot:thead>
                        <th>头像</th>
                        <th>操作</th>
                    </template>
                    <template v-slot:tbody="data">
                        <td>
                            <img :src="http.imgBaseUrl+data.row.head" alt="">
                        </td>
                        <td><i class="el-icon-delete red" @click="deleteItem(data.row)"></i></td>
                    </template>
                </metable>
            </el-tab-pane>
            <el-tab-pane label="新增发型师" name="second">
                <addstylist></addstylist>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
let theads=[				
        {label:'姓名',prop:'name'},
        // {label:'入职日期',prop:'ordernum'},
        {label:'职位',prop:'job'},
        {label:'电话号',prop:'phone'},
        {label:'工作年限',prop:'workyear'},
        {label:'剪发价格',prop:'cut'},
        {label:'染发价格',prop:'dye'},
        {label:'烫发价格',prop:'hot',},
        {label:'护理价格',prop:'nurse',},
        {label:'值班安排',prop:'workday',},
    ];
import metable from './common/metable'
import addstylist from './addstylist'
export default {
    components:{
       metable,addstylist,
    },
    data(){
        return{
            activeName:'second',
            theads,
        }
    },
    
    created(){
        this.init()
    },

    methods:{
        init(){
            this.http.get('employee/getAllemployee.php').then(res=>{
                console.log(res)
                if(res && res.data && res.data.status==1){
                    this.$store.commit('setData',{
                        key:'stylist',value:res.data.status
                    })
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
                this.dodelete(item);
            }).catch(() => {
                    
            });
        },
        dodelete(item){
            console.log(item)
            this.http.post('employee/deleEmployee.php',{id:item.id}).then(res=>{
                if(res.data.status==1){
                    this.$message.success(res.data.message);
                    this.init();
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        handleClick(){},
    },
    computed:{
        tbodys(){
            console.log(this.tbodys)
            return this.$store.state.stylist
        }
    }

}
</script>
<style lang="less" scoped>

</style>