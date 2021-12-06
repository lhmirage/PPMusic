<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="logo">
        <img src="../assets/images/logo-a.png"
             alt="">
      </div>
      <h2>PP MUSIC</h2>
      <el-form ref="form"
               :model="formData"
               label-width="0"
               :rules="formRules">
        <el-form-item prop="phone">
          <div class="item">
            <i class="iconfont iconshouji"></i>
            <el-input v-model="formData.phone"
                      placeholder="请输入手机号"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="item">
            <i class="iconfont iconmima"></i>
            <el-input v-model="formData.password"
                      placeholder="请输入密码"
                      type="password"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="login-botton">
          <el-button @click="submit">登录</el-button>
        </el-form-item>
        <div class="register">
          <router-link to="/register"
                       tag="a">注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
  name: "Login",
  data () {
    return {
      formData: {
        phone: "",
        password: ""
      },
      formRules: {
        phone: [
          { require: true, message: '请输入手机号！', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号格式不对!', trigger: 'blur' }
        ],
        password: [
          { require: true, message: '请输入密码！', trigger: 'blur' },
          { min: 6, max: 16, message: '密码格式不对!', trigger: 'blur' }
        ]
      },
      parallax: 'depth'
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return this.$message.error("表单验证错误")
        }
        try {
          let params = {
            ...this.formData,
            timeStamp: new Date().valueOf()
          }
          this.$api.login(params).then(res => {
            if (res.status === 200 && res.statusText === "OK") {
              if (res && res.data.code === 200) {
                window.localStorage.setItem('cookie', res.data.cookie)
                window.localStorage.setItem("token", res.data.token)
                window.localStorage.setItem("profile", JSON.stringify(res.data.profile))
                this.setProfile(window.localStorage.getItem("profile"))
                this.$message.success("登陆成功")
                this.$router.replace("/")
              }
            }
          }).catch(err => {
            this.$message.info("服务器似乎出了问题...")
          })
        } catch (err) {
          this.$message.info("服务器似乎出了问题...")
        }
      })
    },
    async getUserDetail (uid) {
      let res = this.$api.getUserDetail(uid)
      console.log(res);
    },
    ...mapMutations([
      "setProfile"
    ])
  }
}
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100vh;
  background: #fff url("../assets/images/newbg1.png") right no-repeat;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  overflow: hidden; // 解决高度塌陷问题
  .login-box {
    width: 350px;
    height: 486px;
    margin: 100px auto;
    border-radius: 10px;
    box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.3);
    background: url("../assets/images/logbg.jpg") bottom center #fff;

    .logo {
      display: flex;
      justify-content: center;
      padding: 40px 0 0;

      img {
        height: 47px;
        width: 55px;
      }
    }

    h2 {
      text-align: center;
      font-weight: 400;
      padding-bottom: 50px;
    }

    .item {
      background-color: #fff;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      margin: 0px 25px 5px;
      i {
        position: relative;
        top: 16px;
        left: 15px;
        width: 40px;
        text-align: center;
        z-index: 10;
      }

      .el-input {
        display: block;
        padding: 0 25px;

        .el-input__inner {
          display: block;
          border: 0;
          padding: 0px 10px 10px;
        }
      }
    }
    .el-form-item__error {
      margin-left: 40px;
      color: red;
    }
    .login-botton {
      margin: 30px 25px 0;
      .el-button {
        display: block;
        width: 100%;
        font-size: 15px;
        background-color: #f780e3;
        color: #fff;
        height: 30px;
        cursor: pointer;
      }
    }
    .register {
      padding-right: 24px;
      margin-top: 10px;
      a {
        float: right;
      }
    }
  }
}
</style>