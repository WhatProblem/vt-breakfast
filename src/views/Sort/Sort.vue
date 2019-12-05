<template>
  <div class="sort">
    <h4>sort</h4>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "sort",
  components: {  }
})
export default class Sort extends Vue {
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
