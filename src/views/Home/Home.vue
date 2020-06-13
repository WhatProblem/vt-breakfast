<template>
	<div class="home">
		<!-- banner -->
		<div class="banner">
			<van-swipe indicator-color="#1989fa">
				<van-swipe-item v-for="(item, index) in bannerList" :key="index">
					<div class="slider" @click="navToDetail(item)">
						<!-- <img alt v-lazy="item.pic_url" /> -->
						<van-image width="100%" height="100%" fit="cover" :show-loading="true" :show-error="true" :src="item.pic_url" :lazy-load="true">
							<template v-slot:loading>
								<van-loading type="spinner" size="30" color="#f0a23b" />
							</template>
							<template v-slot:error>
								<img src="../../assets/default-pic.png" />
							</template>
						</van-image>
					</div>
				</van-swipe-item>
			</van-swipe>
		</div>
		<!-- 分类 -->
		<div class="sort">
			<van-grid :square="false" :clickable="true" :center="true" :border="false">
				<van-grid-item v-for="(item, index) in sortList" :key="index">
					<div class="sort-list">
						<div class="img">
							<!-- <img v-lazy="item.sort_icon" alt /> -->
							<van-image round width="50px" height="50px" fit="cover" :show-loading="true" :src="item.sort_icon" :lazy-load="true">
								<template v-slot:loading>
									<van-loading type="spinner" color="#f0a23b" size="20" />
								</template>
							</van-image>
							<div class="sort-title">{{ item.sort_name }}</div>
						</div>
					</div>
				</van-grid-item>
			</van-grid>
		</div>
		<!-- 优惠滑动列表 -->
		<div class="discount">
			<van-divider class="tag__title">限时折扣</van-divider>
			<div class="discount-list">
				<CardPanel
					class="discount-card"
					v-for="(item, index) in discountList"
					:key="index"
					width="120px"
					picHeight="100px"
					:verticalTitle="true"
					:cardTitle="item.goods_name"
					:cardDesc="`￥${item.price}`"
					:picUrl="item.pic_url"
				/>
			</div>
		</div>
		<div class="advertise">
			<van-image radius="30px" width="100%" height="100%" fit="cover" src="http://hbimg.b0.upaiyun.com/5d23351564e1cb58f55484374f95890c7d1fa6dbb514-n9uyGg_fw658" />
		</div>
		<!-- 新品上架 -->
		<div class="news">
			<van-divider class="tag__title">上架新品</van-divider>
			<van-grid :column-num="2" gutter="10" :border="false">
				<van-grid-item v-for="(item, index) in hotSaleList" :key="index">
					<CardPanel class="news-card" width="100%" picHeight="140px" :verticalTitle="true" :cardTitle="item.goods_name" :cardDesc="`￥${item.price}`" :picUrl="item.pic_url" />
				</van-grid-item>
			</van-grid>
		</div>
		<!-- 库存促销 -->
		<div class="sale">
			<van-divider class="tag__title">推荐促销</van-divider>
			<div class="sale-content">
				<CardPanel
					class="sale-card"
					v-for="(item, index) in recommendList"
					:key="index"
					width="100%"
					picHeight="140px"
					:verticalTitle="false"
					:cardTitle="item.goods_name"
					:cardDesc="`￥${item.price}`"
					:picUrl="item.pic_url"
				></CardPanel>
			</div>
		</div>
		<!-- 底部空白区 -->
		<div class="wrap__blank"></div>
		<van-overlay :show="showCover">
			<div class="wrap__cover">
				<van-loading type="spinner" color="#f0a23b" />
			</div>
		</van-overlay>
	</div>
</template>
<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import Component from 'vue-class-component'
import CardPanel from '@/components/CardPanel.vue'

import { Swipe, SwipeItem, Grid, GridItem, Lazyload, Skeleton, Loading, Overlay, Image, Divider } from 'vant'
import { getBannerList, getSortList, getDiscountList, addOrDelFav, addOrDelCart, searchFor, getHotSale, getHistory } from '@/http/home'

@Component({
	name: 'home',
	components: {
		[Swipe.name]: Swipe,
		[SwipeItem.name]: SwipeItem,
		[Grid.name]: Grid,
		[GridItem.name]: GridItem,
		[Skeleton.name]: Skeleton,
		[Loading.name]: Loading,
		[Overlay.name]: Overlay,
		[Image.name]: Image,
		[Divider.name]: Divider,
		CardPanel
	}
})
export default class Home extends Vue {
	bannerList: Array<object> = []
	sortList: Array<object> = []
	discountList: Array<object> = []
	hotSaleList: Array<object> = []
	recommendList: Array<object> = []
	showCover: boolean = true // 遮罩层

	mounted() {
		this.init()
	}

	init() {
		this.showCover = true
		Promise.all([this.getBanner(), this.getSort(), this.getDiscount(), this.getHot(), this.getRecommend()]).then(res => {
			this.bannerList = res[0]
			this.sortList = res[1]
			this.discountList = res[2]
			this.hotSaleList = res[3]
			this.recommendList = res[4]
			this.showCover = false
		})
	}

	getBanner() {
		return getBannerList().then(res => {
			if (res.code === 200) {
				return res.data
			}
			return []
		})
	}

	getSort() {
		return getSortList().then(res => {
			if (res.code === 200) {
				return res.data
			}
			return []
		})
	}

	getDiscount() {
		return getDiscountList().then(res => {
			if (res.code === 200) {
				return res.data
			}
			return []
		})
	}

	getHot() {
		return getHotSale().then(res => {
			if (res.code === 200) {
				return res.data
			}
			return []
		})
	}

	getRecommend() {
		return getHistory().then(res => {
			if (res.code === 200) {
				return res.data
			}
			return []
		})
	}

	navToDetail(opt: any) {
		this.$router.push({ path: '/goodsDetail', query: { item: encodeURI(JSON.stringify(opt)) } })
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
	.advertise {
		width: 100%;
		height: 90px;
		padding: 10px 10px 0;
		box-sizing: border-box;
		overflow: hidden;
	}
	.news {
		width: 100%;
		/deep/ .van-grid-item__content {
			// padding-top: 0;
			// padding-bottom: 0;
			padding: 0;
		}
	}
	.sale {
		width: 100%;
		.sale-content {
			width: 100%;
			padding: 0 10px;
			box-sizing: border-box;
			.sale-card {
				margin-bottom: 10px;
			}
		}
	}
}
</style>
