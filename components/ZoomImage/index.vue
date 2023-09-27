<template>
	<view class="content">
		<!-- #ifdef APP-PLUS || H5 -->
		<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" :style="`width:${width}${sizeUnit};height:${height}${sizeUnit};`"></view>
		<!-- <button @click="changeOption">更新数据</button> -->
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import { createOption, caculaterSizeByZoom, getGraphSizeZoom } from './util.js'
	
	export default {
		props: {
			src: {
				type: String,
				required: true,
				default: ''
			},
			// 建议：宽高尺寸，通过 uni 的 api 获取设备的真实分辨率(得到的是 px 单位的数值)，然后计算相应的尺寸来设置图片的尺寸
			// 单位 px
			width: {
				type: Number,
				required: true,
				default: 500
			},
			// 单位 px
			height: {
				type: Number,
				required: true,
				default: 500
			},
			// 控制宽高的单位(仅支持 rpx 和 px 单位)
			sizeUnit: {
				type: String,
				required: false,
				default: 'px'
			},
			zoom: {
				type: Number,
				required: false,
				default: 1
			}
		},
		data() {
			return {
				option: {}
			}
		},
		watch: {
			zoom(){
				console.log('--')
				setTimeout(()=>{
					this.setOption({ image: this.src, width:this.width, height:this.height, zoom:this.zoom, sizeUnit: this.sizeUnit })
				}, 110)
			}
		},
		mounted() {
			this.initOption()
		},
		methods: {
			initOption() {
				this.setOption({ image: this.src, width:this.width, height:this.height, zoom:this.zoom, sizeUnit: this.sizeUnit })
			},
			setOption({ image, width, height, zoom, sizeUnit  }) {
				// 因为实际 props 里的 widht 和 height 控制的是canvas画布的宽高，这里需要通过计算让内部绘制图片的图形撑满整个画布
				const graphSize = caculaterSizeByZoom({ size: [width, height], zoom: getGraphSizeZoom({ sizeUnit })  })
				this.option = createOption({ image, size:graphSize, zoom })
			},
			changeOption() {
				console.log()
				// const data = this.option.series[0].data
				// // 随机更新示例数据
				// data.forEach((item, index) => {
				// 	data.splice(index, 1, Math.random() * 40)
				// })
			},
			onViewClick(options) {
				console.log(options)
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart && myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* border: 1px solid black; */
	}
	#echarts {
		/* border: 1px solid red; */
	}
</style>
