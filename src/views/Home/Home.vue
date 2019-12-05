<template>
  <div class="home">
    <!-- banner -->
    <div class="banner">
      <van-swipe indicator-color="#1989fa">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <div class="slider" @click="navToDetail(item)">
            <img alt v-lazy="item.pic_url" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类 -->
    <div class="sort">
      <van-grid :square="false" :clickable="true" :center="true" :border="false">
        <van-grid-item v-for="(item,index) in sortList" :key="index">
          <div class="sort-list">
            <div class="img">
              <img :src="item.sort_icon" alt />
              <div class="sort-title">{{item.sort_name}}</div>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 优惠滑动列表 -->
    <div class="discount">
      <div class="discount-title">限时折扣</div>
      <div class="discount-list">
        <CardPanel
          class="discount-card"
          v-for="(item,index) in discountList"
          :key="index"
          width="120px"
          picHeight="100px"
          :verticalTitle="true"
          :cardTitle="item.goods_name"
          :cardDesc="`￥${item.price}`"
          :picUrl="item.pic_url"
          :imgStyle="{height: '100%'}"
        />
      </div>
    </div>
    <!-- 新品上架 -->
    <div class="news">
      <div class="news-title">上架新品</div>
      <van-grid :column-num="2" gutter="10" :border="false">
        <van-grid-item v-for="(item,index) in hotSaleList" :key="index">
          <CardPanel
            class="news-card"
            width="100%"
            picHeight="140px"
            :verticalTitle="true"
            :cardTitle="item.goods_name"
            :cardDesc="`￥${item.price}`"
            :picUrl="item.pic_url"
            :imgStyle="{width: '100%', height: '100%'}"
          />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 库存促销 -->
    <div class="sale">
      <div class="sale-title">推荐促销</div>
      <div class="sale-content">
        <CardPanel
          class="sale-card"
          v-for="(item,index) in recommendList"
          :key="index"
          width="100%"
          picHeight="140px"
          :verticalTitle="false"
          :cardTitle="item.goods_name"
          :cardDesc="`￥${item.price}`"
          :picUrl="item.pic_url"
          :imgStyle="{width: '100%'}"
        />
      </div>
    </div>
    <!-- 底部空白区 -->
    <div class="wrap-blank"></div>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import Vue from "vue";
import Component from "vue-class-component";
import CardPanel from "@/components/CardPanel.vue";
import { Swipe, SwipeItem, Grid, GridItem, Lazyload, Skeleton } from "vant";
import {
  getBannerList,
  getSortList,
  getDiscountList,
  addOrDelFav,
  addOrDelCart,
  searchFor,
  getHotSale,
  getHistory
} from "@/http/home";

@Component({
  name: "home",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Skeleton.name]: Skeleton,
    CardPanel
  }
})
export default class Home extends Vue {
  bannerList: Array<object> = [];
  sortList: Array<object> = [];
  discountList: Array<object> = [];
  hotSaleList: Array<object> = [];
  recommendList: Array<object> = [];

  mounted() {
    this.init();
  }

  init() {
    this.getBanner();
    this.getSort();
		this.getDiscount();
		this.getHot();
		this.getRecommend();
  }

  getBanner() {
    getBannerList().then(res => {
      if (res.code === 200) {
        this.bannerList = res.data;
      }
    });
  }

  getSort() {
    getSortList().then(res => {
      if (res.code === 200) {
        this.sortList = res.data;
      }
    });
  }

  getDiscount() {
    getDiscountList().then(res => {
      console.log(res);
      if (res.code === 200) {
        this.discountList = res.data;
      }
    });
  }

  getHot() {
    getHotSale().then(res => {
      if (res.code === 200) {
        this.hotSaleList = res.data;
      }
    });
  }

  getRecommend() {
    getHistory().then(res => {
      if (res.code === 200) {
        this.recommendList = res.data;
      }
    });
  }

  navToDetail(opt: any) {
    console.log(opt);
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  .banner {
    width: 100%;
    .slider {
      width: 100%;
      height: 240px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .sort {
    width: 100%;
    .sort-list {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      .img {
        width: 75px;
        height: 75px;
        overflow: hidden;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .sort-title {
          font-size: 12px;
        }
      }
    }
  }
  .discount {
    width: 100%;
    .discount-title {
      margin-top: 15px;
      padding-left: 10px;
      text-align: left;
      height: 16px;
      line-height: 16px;
      font-size: 14px;
      font-weight: bold;
      color: #060606;
    }
    .discount-list {
      width: 100%;
      height: 170px;
      padding: 0 10px;
      overflow: hidden;
      white-space: nowrap;
      overflow-x: scroll;
      box-sizing: border-box;
      .discount-card {
        display: inline-block;
        margin-right: 10px;
        margin-top: 5px;
        border: 1px solid #f9f9f9;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .news {
    width: 100%;
    .news-title {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
      margin-top: 15px;
      padding-left: 10px;
    }
    /deep/ .van-grid-item__content {
      // padding-top: 0;
      // padding-bottom: 0;
      padding: 0;
    }
  }
  .sale {
    width: 100%;
    .sale-title {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
      margin-top: 20px;
      padding-left: 10px;
    }
    .sale-content {
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      .sale-card {
        margin-bottom: 10px;
      }
    }
  }
  .wrap-blank {
    width: 100%;
    height: 50px;
  }
}
</style>
