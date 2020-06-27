<template>
    <div class="login">
        <div class="wrap">
            <h1>登录</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="68px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            ruleForm:{},
             rules:{
                 username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
                ],
                password: { required: true, message: '请输入用户名', trigger: 'blur' },
                
             },
        }
    },
    methods:{
        submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.dologin()
          } else {
            this.$message.error('请输入用户名和密码')
            return false;
          }
        });
      },
      dologin(){
          const loading = this.$loading({
            lock: true,
            text: '登录中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
            });
          console.log(this.ruleForm)
          this.http.post('adminUser/login.php',this.ruleForm).then(res=>{
              console.log(res.data)
              loading.close();
              if(res.data.status==1){
                  this.$router.push('/home')
              }else{
                  this.$message.error('请重新输入用户名和密码')
              }
          })
      }
    }
}
</script>
<style lang="less" scoped>
.login{background:url(~@img/bg.jpg) no-repeat top center;background-size: cover;position: relative;}
.wrap{width: 380px;height: 350px;background:#fff;position: absolute;top:50%;right:15%;transform: translate(0,-50%);padding:30px 40px;box-sizing: border-box;}
h1{text-align: center;margin-bottom: 20px;}
.el-form-item{margin-bottom: 35px;}
.el-button{width: 100%;}
</style>