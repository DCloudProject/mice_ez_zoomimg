const ECHARTS_IMAGE_BASE64_PREFIX = 'image://'

/**
 * 根据宽高单位获取图形计算尺寸所需的比例值
 */
export function getGraphSizeZoom({ sizeUnit }) {
	return sizeUnit === 'rpx' ? 0.48 : 1
}

/**
 * 等比例缩放宽高计算
 */
export function caculaterSizeByZoom({ size, zoom }) {
	const [w, h] = size
	const nw = w * zoom
	const nh = nw * h/w
	const newSize = [nw, nh]
	return newSize
}

export function createOption(params) {
	const { image, size=[100,100], zoom=1 } = params
	
	const symbolSize = caculaterSizeByZoom({size, zoom})
	
	const option = {
		grid: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			containLabel: true
		},
		zoom: 1,
		title: {
			show: false,
			text: 'Basic Graph'
		},
		tooltip: {
			show: false
		},
		legend: {
			show: false
		},
		animationDurationUpdate: 100,
		animationEasingUpdate: 'linear',
		series: [{
			type: 'graph',
			layout: 'none',
			// symbolSize: 50,
			// 控制缩放
			roam: true,
			// 缩放幅度调节
			nodeScaleRatio: 0.1,
			label: {
				show: false
			},
			emphasis: {
				disabled: true
			},
			// edgeSymbol: ['circle', 'arrow'],
			// edgeSymbolSize: [4, 10],
			// edgeLabel: {
			// 	fontSize: 20
			// },
			data: [{
					x: 0,
					y: 0,
					symbol: ECHARTS_IMAGE_BASE64_PREFIX + image,
					symbolSize,
					// itemStyle: {
					// 	borderColor: '#666',
					// 	borderWidth: 1
					// }
				},
			],
		}]
	};
	return option
}