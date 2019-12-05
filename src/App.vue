<template>
  <div id="app">
    <router-view/>

    <van-tabbar v-model="active" :safe-area-inset-bottom="true" @change="navTo">
      <van-tabbar-item v-for="(item,index) in tabList" :key="index" :to="item.to" :name="item.name">
        <van-icon :class="['iconfont', item.icon, 'tab-icon']" class-prefix="icon" slot="icon"></van-icon>
        <span>{{item.tabName}}</span>
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
  active: string = "home";
  tabList: Array<object> = [
    {to: {path:"/home"}, name: "home", icon: "icon-home", tabName: "首页"},
    {to: {path:"/sort"}, name: "sort", icon: "icon-sort", tabName: "分类"},
    {to: {path:"/cart"}, name: "cart", icon: "icon-cart", tabName: "购物车"},
    {to: {path:"/profile"}, name: "profile", icon: "icon-profile", tabName: "我"}
  ];

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

.tab-icon {
  font-size: 20px !important;
}
</style>
