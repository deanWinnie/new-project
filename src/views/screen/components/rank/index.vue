<template>
	<div class="box">
		<div class="top">
			<p class="title">热门景区排行</p>
			<p class="bg"></p>
		</div>
		<div class="charts" ref="charts"></div>
	</div>
</template>
<script setup lang="ts">
	import { onMounted, ref } from 'vue'
	import * as echarts from 'echarts'
	let charts = ref()
	onMounted(() => {
		const mycharts = echarts.init(charts.value)
		mycharts.setOption({
			title: {
				text: '景区排行',
				left: '50%',
				textStyle: {
					color: 'white',
				},
				subtext: '各大景区排行',
				subtextStyle: {
					color: '#ccc',
					fontSize: 16,
				},
			},
			xAxis: {
				type: 'category',
			},
			yAxis: {
				splitLine: {
					show: false,
				},
				// axisLine:{
				// 	show:true
				// },
				// axisTick:{
				// 	show:true
				// }
			},
			grid: {
				left: 50,
				right: 20,
				top: 60,
				bottom: 20,
			},
			series: [
				{
					type: 'bar',
					data: [10, 20, 30, 40, 50, 60, 70],
					label: {
						show: true,
						poistion: 'insideTop',
					},
					showBackground: true,
					backgroundStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: 'black', // 0% 处的颜色
								},
								{
									offset: 1,
									color: 'blue', // 100% 处的颜色
								},
							],
							global: false, // 缺省为 false
						},
					},
					itemStyle: {
						borderRadius: [5, 5, 0, 0],
						color: function (data: any) {
							let arr = ['red', 'orange', 'yellowgreen', 'grenn', 'purple', 'hotpink', 'skyblue']
							return arr[data.dataIndex]
						},
					},
				},
				{
					type: 'line',
					data: [10, 20, 30, 40, 50, 60, 70],
					smooth: true,
				},
			],
			tooltip: {},
		})
	})
</script>
<style scoped lang="scss">
	.box {
		width: 100%;
		height: 100%;
		background: url(../../images/dataScreen-main-lb.png) no-repeat;
		background-size: 100% 100%;
		margin: 10px;
		.top {
			.title {
				color: white;
				font-size: 20px;
			}
			.bg {
				width: 68px;
				height: 7px;
				background: url(../../images/dataScreen-title.png) no-repeat;
				background-size: 100% 100%;
				margin-top: 10px;
			}
		}
		.charts {
			height: calc(100% - 40px);
		}
	}
</style>
