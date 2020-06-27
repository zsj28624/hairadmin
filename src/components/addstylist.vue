<template>
    <div class="addstylist">
        <el-form :model="formData" :rules="rules" ref="myform" label-width="100px" class="demo-formData">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="上传头像" prop="name">
                <el-upload
                class="avatar-uploader"
                :action="http.uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="电话号" prop="phone">
                <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="job">
                <el-select v-model="formData.job" placeholder="请选择职位">
                    <el-option :label="item" value="shanghai" 
                    v-for="item in jods" :key="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工作年限" prop="workyear">
                <el-input v-model="formData.workyear"></el-input>
            </el-form-item>
            <el-form-item label="剪发价格" prop="cut">
                <el-input v-model="formData.cut"></el-input>
            </el-form-item>
            <el-form-item label="染发价格" prop="dye">
                <el-input v-model="formData.dye"></el-input>
            </el-form-item>
            <el-form-item label="烫发价格" prop="hot">
                <el-input v-model="formData.hot"></el-input>
            </el-form-item>
            <el-form-item label="护理价格" prop="nurse">
                <el-input v-model="formData.nurse"></el-input>
            </el-form-item>
            <el-form-item label="值班安排" prop="workday">
                <el-checkbox-group v-model="formData.workday">
                    <el-checkbox :label="item" name="workday" v-for="item in weeks" :key="item"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="submitForm">确定</el-button>
            </el-form-item>
            
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            rules:{
                name:{ required: true, message: '请输入姓名', trigger: 'blur' },
                phone:{ required: true, message: '请输入电话号', trigger: 'blur' },
                job:{ required: true, message: '请输入职位', trigger: 'blur' },
                workyear:{ required: true, message: '请输入工作年限', trigger: 'blur' },
                cut:{ required: true, message: '请输入剪发价格', trigger: 'blur' },
                dye:{ required: true, message: '请输入染发价格', trigger: 'blur' },
                hot:{ required: true, message: '请输入烫发价格', trigger: 'blur' },
                nurse:{ required: true, message: '请输入护理价格', trigger: 'blur' },
            },
            jods:['首席','督导','总监','特级','高级','技师','助理'],
            weeks:['周一','周二','周三','周四','周五','周六','周日',],
            formData:{
                workday:[],
            },
            imageUrl:'',
        };
    },

    methods:{
        submitForm(){
             this.$refs.myform.validate((valid) => {
                if (valid) {
                    this.doAddStylist();
                } else {
                    this.$message.error('请输入信息');
                    return false;
                }
            });
        },
        doAddStylist(){
            
            this.formData.workday=this.formData.workday.join(',')
            this.formData.entryDate=this.getNowDate()
            console.log(this.formData);
            this.http.post('employee/addEmployee.php',this.formData).then(res=>{
                console.log(res.data)
                if(res && res.data && res.data.status==1){
                    this.$message.success('添加成功');
                    this.init();
                }else{
                    this.$message.error('添加失败')
                }
            })
        },
        getNowDate(){
            let nowtime=new Date();
            return `${nowtime.getFullYear()}-${nowtime.getMonth()+1}-${nowtime.getDay()}`;
        },
        handleAvatarSuccess(res, file) {
            console.log(res,file)
            this.formData.head=res.filepath
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        init(){
            this.http.get('employee/getAllemployee.php').then(res=>{
                console.log(res)
                if(res && res.data && res.data.status==1){
                    this.$store.commit('setData',{
                        key:'stylist',value:res.data.status,
                    })
                }
            })
        },
    },

}
</script>
<style scoped>
.el-form .el-input{
    width: 300px;
}
.addstylist  >>> .el-upload{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.addstylist  >>> .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>