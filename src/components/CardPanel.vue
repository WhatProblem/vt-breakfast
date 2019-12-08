<template>
  <div class="card-panel" :style="{width: width}">
    <div class="pic" :style="{height:picHeight}">
      <!-- <img  alt v-lazy="picUrl" :style="imgStyle"/> -->
      <van-image width="100%" height="100%" fit="cover" :show-loading="true" :show-error="true" :src="picUrl" :lazy-load="true">
        <template v-slot:loading>
          <van-loading type="spinner" size="30" color="#f0a23b" />
        </template>
        <!-- <template v-slot:error><img src="../assets/default-pic.png"/></template> -->
      </van-image>
    </div>
    <div v-if="verticalTitle">
      <div class="card-title">{{cardTitle}}</div>
      <div class="card-desc">{{cardDesc}}</div>
    </div>
    <div v-if="!verticalTitle" class="v-card-info">
      <div class="card-info-title">
        <span>{{cardTitle}}</span>
        <span class="card-info-desc">{{cardDesc}}</span>
      </div>
      <div class="card-desc-info">
				<span class="info-fav"><van-icon name="like-o" /></span>
				<span class="info-cart"><van-icon name="shopping-cart-o" /></span>
			</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import Component from "vue-class-component";
import { Icon,Image, Loading } from "vant";

@Component({
	name: "cardPanel",
	components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Loading.name]: Loading
	}
})
export default class CardPenl extends Vue {
  @Prop({
    type: String,
    required: false,
    default: "100%"
  })
  width!: string;
  @Prop({
    type: String,
    required: false,
    default: "100px"
  })
  picHeight!: string;
  @Prop({
    type: Boolean,
    required: false,
    default: true
  })
  verticalTitle!: boolean;
  @Prop({
    type: String,
    required: false,
    default: ""
  })
  cardTitle!: string;
  @Prop({
    type: String,
    required: false,
    default: ""
  })
  cardDesc!: string;
  @Prop({
    type: String,
    required: false,
    default: "../assets/default-pic.png"
  })
  picUrl!: string;

}
</script>
<style lang="less" scoped>
.card-panel {
  text-align: left;
  padding: 4px 6px;
  box-shadow: 2px 4px 4px #acacac;
  background: #fafafa;
  border-radius: 4px;
  box-sizing: border-box;
  .pic {
    width: 100%;
    // height: 100px;
    overflow: hidden;
    img {
      // width: 100%;
      // height: 100%;
    }
  }
  .card-title {
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    border-radius: 0 10px 10px 0;
    overflow: hidden;
    background: @themeColor;
    margin-top: 5px;
    color: #fff;
  }
  .card-desc {
    width: 100%;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    color: rgb(206, 38, 38);
    margin-top: 5px;
    font-weight: bold;
  }
  .v-card-info {
    width: 100%;
    height: 20px;
    margin-top: 5px;
    display: flex;
    align-items: center;
		justify-content: space-between;
		.card-info-title {
			height: 20px;
			line-height: 20px;
			font-size: 14px;
			overflow: hidden;
    }
    .card-info-desc {
      margin-left: 15px;
      height: 16px;
      line-height: 16px;
      font-size: 14px;
      color: rgb(206, 38, 38);
      font-weight: bold;
    }
		.card-desc-info {
			height: 20px;
			line-height: 16px;
			font-size: 14px;
			color: rgb(206, 38, 38);
			.info-fav,.info-cart {
				font-size: 20px;
				margin-right: 15px;
			}
		}
  }
}
</style>