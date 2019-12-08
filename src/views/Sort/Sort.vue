<template>
  <div class="sort">
    <van-nav-bar title="商品分类" left-text="" right-text="筛选" :fixed="true" :left-arrow="false" @click-right="onClickRight" />
    <van-tabs class="sort-tab" animated swipeable color="#f0a23b" :sticky="true" @change="changeTabs" v-model="active">
      <van-tab v-for="item in sortList" :key="item.sort_id" :title="item.sort_name">
        <div class="sort-content">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
            <van-card v-for="item in list" :key="item.id" class="sort__card" :thumb="item.pic_url" >
              <div slot="title" class="sort__card__title">{{item.goods_name}}</div>
              <div slot="desc" class="sort__card__score"><van-rate v-model="item.score" readonly /></div>
              <div slot="price" class="sort__card__price">￥{{item.price}}</div>
              <div slot="num" class="sort__card__num">
                <span><van-icon name="like-o" /></span>
                <span><van-icon name="shopping-cart-o" /></span>
              </div>
            </van-card>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 底部空白区 -->
    <div class="wrap__blank"></div>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import Vue from "vue";
import Component from "vue-class-component";
import { Tab, Tabs, NavBar, Card, Rate, Icon, List } from "vant";
import { Getter } from "vuex-class";
import { getSortList } from "@/http/SortList";

@Component({
  name: "sort",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Card.name]: Card,
    [Rate.name]: Rate,
    [Icon.name]: Icon,
    [List.name]: List
  }
})
export default class Sort extends Vue {
  @Getter sortList: any;

  active: number = 0; // tab选中标签的下标
  score: number = 4;
  list: Array<object> = [];
  loading: boolean = false;
  finished: boolean = false;
  pages: any = {pageNum: 1, pageSize: 5, pages: 0};

  mounted() {
    // console.log(this.sortList)
    this.getCardList();
  }

  onClickRight() {
    // console.log('222')
  }

  changeTabs(opt: any) {
    this.list = [];
    this.pages = {pageNum: 1, pageSize: 5, pages: 0};
    this.finished = false;
    this.active = opt;
    this.getCardList();
  }

  // this.sortList[this.active]['sort_id']
  getCardList() {
    getSortList({sortId: this.sortList[this.active]['sort_id'], pageNum: this.pages.pageNum, pageSize: this.pages.pageSize}).then((res: any)=>{
      if (res.code === 200) {
        this.list = this.list.concat(res.data.list);
        this.loading = false;
        this.pages.pages = res.data.pages
        if (this.pages.pageNum>=this.pages.pages) {
          this.finished = true;
        }
      }
    })
  }

  onLoad() {
    if (this.pages.pageNum>=this.pages.pages) return;
    this.pages.pageNum += 1;
    this.getCardList();
  }
}
</script>
<style lang="less" scoped>
.sort {
  .sort-tab {
    width: 100%;
    margin-top: 46px;
  }
}
</style>
