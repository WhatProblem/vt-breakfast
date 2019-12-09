<template>
  <div class="login">
    <div class="login-container">
      <van-cell-group>
        <van-field
          v-model="userName"
          required
          clearable
          left-icon="manager"
          placeholder="请输入用户名"
					label-width="64px"
        >
          <span class="left-class" slot="label">用户名称</span>
        </van-field>
        <van-field
          v-model="password"
          clearable
          left-icon="lock"
          type="password"
          placeholder="请输入密码"
          required
					label-width="64px"
        >
					<span class="left-class" slot="label">登录密码</span>
				</van-field>
				<van-button class="login-btn" type="primary" round size="small" @click="login">登录</van-button>
				<div class="register"><span @click="register">注册</span></div>
      </van-cell-group>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Field, Cell, CellGroup, Button,Toast  } from "vant";
import { login } from "@/http/login";

@Component({
  name: "login",
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Button.name]: Button
  }
})
export default class Login extends Vue {
  userName: string = "";
	password: string = "";
	
	login() {
    login({userName: this.userName, password: this.password}).then((res: any)=>{
      console.log(res)
      if (res.code === 200) {
        this.$router.replace({path: '/home'})
        this.$toast('登录成功!');
        localStorage.setItem("token", res.token);
        return;
      }
      this.$toast('账号或密码错误，登录失败!');
    })
  }
  
  register() {
    this.$router.push({path: '/register'})
  }
}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  .login-container {
		width: 100%;
		position: absolute;
		left: 0;
		top: 30%;
    .left-class {
      width: 100%;
      padding-right: 6px;
			float: right;
			text-align: right;
		}
		.login-btn {
			width: 100%;
		}
		.register {
			width: 100%;
			text-align: right;
			span {
				font-size: 14px;
				margin: 10px;
			}
		}
  }
}
</style>