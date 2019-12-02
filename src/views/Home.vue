<template>
  <div class="home">
    <!-- <h1 class="testvw">青岛淑珍经销商</h1> -->
    <button @click="navToAbout">跳转</button>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "home",
  components: { HelloWorld }
})
export default class Home extends Vue {
  mounted() {
    console.log(process.env);
  }

  navToAbout(name) {
    this.$router.push({ path: "/about" });
  }
}
</script>
<style lang="scss" scoped>
.testvw {
  font-size: 44px;
}
</style>
