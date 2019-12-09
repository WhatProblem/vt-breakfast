<template>
  <div class="register">
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
        <van-field v-model="avatar" placeholder="请输入用户头像地址" />
				<!-- <div class="addr" @click="selectAddr">请选择用户所在省份:</div>
				<div class="addr" @click="selectAddr">请选择用户所在城市:</div>
				<div class="addr" @click="selectAddr">请选择用户所在县/区:</div> -->
				<van-field v-model="province" placeholder="请输入省份" />
				<van-field v-model="city" placeholder="请输入市" />
				<van-field v-model="country" placeholder="请输入区/县" />
        <van-field v-model="addrDetail" placeholder="请输入用户收货详细地址" />
				<van-button class="login-btn" type="primary" round size="small" @click="register">注册</van-button>
      </van-cell-group>
    </div>

    <van-action-sheet v-model="showAction" title="选择城市">
      <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-action-sheet>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Field, Cell, CellGroup, Button, Picker, ActionSheet, Toast } from "vant";
import { register } from "@/http/login";

@Component({
  name: "register",
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [ActionSheet.name]: ActionSheet
  }
})
export default class Register extends Vue {
  userName: string = "";
  password: string = "";
  avatar: string = "";
  addrDetail: string = "";
	columns: Array<any> = ["杭州", "宁波", "温州", "嘉兴", "湖州"];
	showAction: boolean = false;
	province: string = "";
	city: string = "";
	country: string = "";

	onConfirm(value: any, index: number) {
		console.log(value)
		this.showAction = false;
	}

	onCancel() {
		console.log('取消')
		this.showAction = false;
	}
	
	selectAddr() {
		this.showAction = true;
	}

	register() {
		register({
			userName: this.userName,
			password: this.password,
			avatar: this.avatar,
			province: this.province,
			city: this.city,
			country: this.country,
			addrDetail: this.addrDetail
		}).then((res: any)=>{
			if (res.code === 200) {
				localStorage.setItem('token', res.token)
				this.$toast('注册成功');
				this.$router.replace({path: '/home'})
				return;
			}
			if (res.code === 11000) {
				this.$toast('当前用户名已被注册');
				return;
			}
			this.$toast('注册失败');
		})
	}
}
</script>
<style lang="less" scoped>
.register {
	width: 100%;
	text-align: left;
	.addr {
		margin: 10px 16px;
		font-size: 14px;
		color: #999;
		height: 24px;
		line-height: 24px;
	}
	.login-btn {
		width: 100%;

	}
}
</style>