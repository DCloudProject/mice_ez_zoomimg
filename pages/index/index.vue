<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="chart-box">
			<zoom-image :src="image" :width="width" :height="height" sizeUnit='rpx' :zoom="zoom"></zoom-image>
		</view>
		<view>
			<!-- <u-number-box step="0.25" decimal-length="1" ></u-number-box> -->
			<button @click="changeZoom(-0.1)">缩小</button>
			<button @click="changeZoom(0.1)">放大</button>
		</view>
	</view>
</template>

<script>
	import { DEMO_IMAGE_BASE64 } from '@/components/ZoomImage/demo_data.js'
	import ZoomImage from '@/components/ZoomImage/index.vue'
	
	export default {
		components: {
			ZoomImage
		},
		data() {
			return {
				title: 'ZoomImage Demo',
				image: DEMO_IMAGE_BASE64,
				width: 500,
				height: 500,
				zoom: 1
			}
		},
		onLoad() {

		},
		methods: {
			changeZoom(zv) {
				let z = 0
				if(zv < 0) {
					// 缩小
					const min = 0.2
					z = this.zoom + zv
					if(z < min) {
						z = min
					}
				} else {
					// 放大
					const max = 10
					z = this.zoom + zv
					if(z > max) {
						z = max
					}
				}
				this.zoom = z
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.text-area {
			display: flex;
			justify-content: center;
		}
		
		.title {
			font-size: 36rpx;
			color: #8f8f94;
		}
		
		.chart-box {
			width: 100%;
		}
	}
</style>
