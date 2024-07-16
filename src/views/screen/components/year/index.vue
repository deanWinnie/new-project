<template>
	<div class="box">
		<div class="top">
			<p class="title">年度游客量对比</p>
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
				text: '散点图',
				textStyle: {
					color: 'white',
				},
			},
			xAxis: {
				type: 'category',
				show: false,
			},
			yAxis: {
				show: false,
			},
			grid: {
				left: 40,
				right: 0,
				top: 30,
				bottom: 20,
			},
			series: [
				{
					type: 'scatter',
					data: [33, 88, 21, 9, 788, 234, 1213, 1231, 6674, 3],
					symbol: 'arrow',
				},
			],
		})
	})
</script>
<style scoped lang="scss">
	.box {
		width: 100%;
		height: 100%;
		background: url(../../images/dataScreen-main-lb.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 10px;
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
