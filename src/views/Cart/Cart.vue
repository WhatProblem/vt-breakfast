<template>
  <div class="cart">
    <h4>cart</h4>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "cart",
  components: {  }
})
export default class Cart extends Vue {
  mounted() {
    console.log(process.env);
  }
}
</script>
<style lang="less" scoped>
.testvw {
  font-size: 44px;
}
</style>
