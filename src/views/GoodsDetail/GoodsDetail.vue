<template>
  <div class="goods-detail">
    <van-nav-bar
      :title="queryInfo.goods_name"
      left-text="返回"
      :border="true"
      left-arrow
      @click-left="onClickLeft"
    >
      <span v-show="isUnLogin" class="user__login" slot="right" @click="login">登录</span>
    </van-nav-bar>
    <van-image
      width="100%"
      height="300px"
      fit="cover"
      :show-loading="true"
      :src="queryInfo.pic_url"
    />
    <div class="detail-info">
      <div class="rating-info">
        <div class="rating-info-score">
          <van-rate v-model="detailData.score" readonly />
          <span>{{detailData.score||'暂无评价'}}</span>
        </div>
        <span class="add-fav" @click="addOrDelFav">
          <van-icon :name="detailData.fav_id?'like':'like-o'" />
        </span>
      </div>
      <div class="sort__card__price">￥{{queryInfo.price||'暂无标价'}}</div>
    </div>
    <van-collapse v-model="activeName">
      <van-collapse-item title="商品详情" name="1">{{queryInfo.introduce}}</van-collapse-item>
    </van-collapse>
    <div class="goods-num">
      <span>请选择商品数量：</span>
      <van-stepper v-model="goodsNum" />
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="contact" text="我的" @click="navTo('/profile')" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="navTo('/cart')" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="返回" @click="onClickLeft" />
    </van-goods-action>

    <van-overlay :show="showCover" z-index="99">
      <div class="wrap__cover">
        <van-loading type="spinner" color="#f0a23b" />
      </div>
    </van-overlay>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
  NavBar,
  Image,
  Rate,
  Collapse,
  CollapseItem,
  Stepper,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Loading,
  Overlay,
  Icon,
  Toast
} from "vant";
import { getGoodsDetail } from "@/http/goodsDetail";
import { addOrDelFav, addOrDelCart } from "@/http/user";

@Component({
  name: "goodsDetail",
  components: {
    [NavBar.name]: NavBar,
    [Image.name]: Image,
    [Rate.name]: Rate,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Stepper.name]: Stepper,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Loading.name]: Loading,
    [Overlay.name]: Overlay,
    [Icon.name]: Icon
  }
})
export default class GoodsDetail extends Vue {
  queryInfo: any = {};
  score: number = 4;
  // 折叠面板
  activeName: Array<string> = ["1"];
  goodsNum: number = 1;
  showCover: boolean = true; // 遮罩层
  detailData: any = {};
  isUnLogin: boolean = true;

  created() {
    let item: any = this.$route.query.item;
    this.queryInfo = JSON.parse(decodeURI(item));
    let token = localStorage.getItem("token");
    if (token) {
      this.isUnLogin = false;
    } else {
      this.isUnLogin = true;
    }
  }
  mounted() {
    this.init();
  }

  init() {
    getGoodsDetail({ id: this.queryInfo.id }).then((res: any) => {
      if (res.code === 200) {
        this.showCover = false;
        this.detailData = res.data;
      }
    });
  }

  onClickLeft() {
    this.$router.go(-1);
  }

  login() {
    this.$router.push({path: '/login'})
  }

  navTo(path: string) {
    this.$router.push({ path });
  }

  addOrDelFav() {
    if (this.isUnLogin) {
      this.$toast('您还未登录，请先登录!');
      return;
    }
    addOrDelFav({id: this.detailData.id, status: 1}).then((res: any)=>{
      if (res.code === 11001) {
        this.$toast('登录超时，请重新登录');
        this.isUnLogin = true;
        localStorage.removeItem("token");
        return;
      }
      if (res.code === 200) {
        this.$toast('收藏成功');
        return;
      }
      if (res.code === 500) {
        this.$toast('参数错误');
      }
    })
  }

  addCart() {
    if (this.isUnLogin) {
      this.$toast('您还未登录，请先登录!');
      return;
    }
    addOrDelCart({id: this.detailData.id, status: 1, goodsNum: this.goodsNum}).then((res: any)=>{
      if (res.code === 11001) {
        this.$toast('登录超时，请重新登录');
        this.isUnLogin = true;
        localStorage.removeItem("token");
        return;
      }
      if (res.code === 200) {
        this.$toast('添加成功');
        return;
      }
      if (res.code === 500) {
        this.$toast('参数错误');
      }
    })
  }
}
</script>
<style lang="less" scoped>
.goods-detail {
  width: 100%;
  text-align: left;
  .detail-info {
    text-align: left;
    margin: 10px 16px 0;
    .rating-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .rating-info-score {
        display: flex;
        align-items: center;
      }
      span {
        margin-left: 5px;
        font-size: 12px;
        color: #333;
      }
      .add-fav {
        font-size: 20px;
      }
    }
  }
  .goods-num {
    position: fixed;
    z-index: 9;
    left: 0;
    bottom: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 16px;
    font-size: 14px;
    color: #000;
    font-weight: bold;
    span {
      margin-right: 10px;
    }
  }
}
</style>
