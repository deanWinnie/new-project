<template>
	<div class="box" ref="charts" id="mychart">我是地图</div>
</template>
<script setup lang="ts">
	import { onMounted, ref } from 'vue'
	import * as echarts from 'echarts'
	import chinaJSON from './china.json'
	let charts = ref()
	echarts.registerMap('china', chinaJSON as any)
	const getChart = () => {
		const mycharts = echarts.init(document.getElementById('mychart'))
		mycharts.setOption({
			geo: {
				map: 'china',
				roam: true,
				top: 100,
				left: 50,
				right: 50,
				bottom: 0,
				label: {
					show: true,
					color: 'white',
					fontSize: 14,
				},
				itemStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: 'red', // 0% 处的颜色
							},
							{
								offset: 1,
								color: 'blue', // 100% 处的颜色
							},
						],
						global: false, // 缺省为 false
					},
					opacity: 0.8,
				},
				emphasis: {
					itemStyle: {
						color: 'red',
					},
					label: {
						fontSize: 40,
					},
				},
			},
			grid: {
				bottom: 0,
				left: 0,
				right: 0,
				top: 0,
			},
			series: [
				{
					type: 'lines',
					data: [
						{
							coords: [
								[116.405285, 39.904989],
								[119.306239, 26.075302],
							],
							lineStyle: {
								color: 'white',
								width: 3,
							},
						},
					],
					effect: {
						show: true,
						symbol: 'arrow',
						color: 'white',
						symbolSize: 8,
					},
					lineStyle: {
						curveness: 0.2,
					},
				},
			],
		})
	}
	onMounted(() => {
		getChart()
	})
</script>
<style scoped lang="scss"></style>
