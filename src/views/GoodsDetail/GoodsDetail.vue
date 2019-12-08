<template>
  <div class="goods-detail">
    <van-nav-bar
      :title="queryInfo.goods_name"
      left-text="返回"
      :border="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-image
      width="100%"
      height="300px"
      fit="cover"
      :show-loading="true"
      :src="queryInfo.pic_url"
    />
    <div class="detail-info">
      <van-rate v-model="score" readonly/>
      <div class="sort__card__price">￥16.00</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { NavBar, Image, Rate } from "vant";

@Component({
  name: "goodsDetail",
  components: {
    [NavBar.name]: NavBar,
    [Image.name]: Image,
    [Rate.name]: Rate
  }
})
export default class GoodsDetail extends Vue {
  queryInfo: any = {};
  score: number = 4;

  created() {
    let item: any = this.$route.query.item;
    this.queryInfo = JSON.parse(decodeURI(item));
    console.log(this.queryInfo);
  }
  mounted() {}
  onClickLeft() {
    this.$router.go(-1);
  }
}
</script>
<style lang="less" scoped>
.goods-detail {
  width: 100%;
  .detail-info {
    text-align: left;
    margin: 10px 15px 0;
  }
}
</style>
