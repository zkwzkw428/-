<template>
  <div class="login-container">
    <el-form :model="form" :rules="rules" inline label-width="70px" ref="form">
        <h3 class="login-title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="login-submit" @click="submit">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Mock from 'mockjs'
import Cookie from 'cookiejs'
import  { getMenu} from '../api/index.js'
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名'}
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码'}
                ]
            }
        }
    },
    methods: {
        submit() {
            // token信息
            // const token = Mock.Random.guid()
            // // token信息存入cookie用于不同页面通信
            // Cookie.set('token', token)
            // this.$router.push('/home')
            
            // 校验通过
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({data}) => {
                        console.log(data);
                        if (data.code === 20000) {
                            // 将token存入到cookie当中用于页面间通信
                            Cookie.set('token', data.data.token)
                            // 获取菜单数据存入store当中
                            this.$store.commit('setMenu', data.data.menu)
                            this.$store.commit('addMenu', this.$router)
                            this.$router.push('/home')
                        } else {
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
.login-container {
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 160px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .login-title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458
    }
    .el-input {
        width: 198px;
    }
    .login-submit {
        margin-left: 105px;
        margin-top: 10px;
    }
}
</style>