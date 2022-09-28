<template>
  <div id="container">
    <el-form :model="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
        <el-button @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      form: {
        username:"",
        password:""
      },
    };
  },
  methods: {
    //注册
    async register() {
      const { data: res } = await this.$http.post("/api/user/register", this.form)
      console.log(res)
      if (res.meta.status !== 200) { 
        this.$message.error("已经注册") 
      }
      else {
        this.$message.success("注册成功")
      }
    },
    //登录
    async login() {
      const { data: res } = await this.$http.get("/api/user/login", {
        params: this.form
      })
      console.log(res)
      if (res.meta.status == 200) {
        this.$message.success("登录成功");
        this.$router.push("/home")
      } else {
        this.$message.error("登录失败");
      }
    }
  }
};
</script>
<style scoped>
#container {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid gray;
  border-radius: 16px;
  padding: 30px;
}
</style>