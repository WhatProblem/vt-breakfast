<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
      <van-icon class="iconfont icon-sort" class-prefix="icon" slot="icon" />
      <i class="iconfont icon-home"></i>
    </div>
    <router-view/>

    <van-tabbar v-model="active" @change="navto">
      <van-tabbar-item icon="home-o" url="/home">
        <van-icon class="iconfont icon-home tab-icon" class-prefix="icon" slot="icon" name="home"></van-icon>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{path:'/home'}">
        <van-icon class="iconfont icon-sort tab-icon" class-prefix="icon" slot="icon" name="sort"></van-icon>
        <span>分类</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{path:'/about'}">
        <van-icon class="iconfont icon-cart tab-icon" class-prefix="icon" slot="icon" name="cart" ></van-icon>
        <span>购物车</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{path:'/about'}">
        <van-icon class="iconfont icon-profile tab-icon" class-prefix="icon" slot="icon" name="profile" ></van-icon>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Tabbar, TabbarItem, Icon } from "vant";
import Component from "vue-class-component";

@Component({
  name: "app",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon
  }
})
export default class App extends Vue {
  active: number = 0;

  mounted () {
    
  }

  navTo(opt: any) {
    console.log(opt)
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.tab-icon {
  font-size: 20px !important;
}
</style>
