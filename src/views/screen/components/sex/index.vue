<template>
	<div class="box">
		<div class="top">
			<p class="title">男女比例</p>
			<p class="bg"></p>
		</div>
		<div class="sex">
			<div class="man">
				<img src="../../images/man.png" alt="" />
			</div>
			<div class="woman">
				<img src="../../images//woman.png" alt="" />
			</div>
		</div>
		<div class="rate">
			<p>男士58%</p>
			<p>女士42%</p>
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
				text: '男女比例',
				textStyle: {
					color: 'skyblue',
				},
				left: '40%',
			},
			xAxis: {
				show: false,
				min: 0,
				max: 100,
			},
			yAxis: {
				show: false,
				type: 'category',
			},
			series: [
				{
					type: 'bar',
					data: [58],
					barWidth: 20,
					z: 100,
					itemStyle: {
						color: 'skyblue',
						borderRadius: 20,
					},
				},
				{
					type: 'bar',
					data: [100],
					barWidth: 20,
					barGap: '-100%',
					itemStyle: {
						color: 'pink',
						borderRadius: 20,
					},
				},
			],
			grid: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		})
	})
</script>
<style scoped lang="scss">
	.box {
		background: url(../../images/dataScreen-main-lb.png) no-repeat;
		background-size: 100% 100%;
		margin-top: 10px;
		.top {
			// margin-left: 20px;
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
		.sex {
			display: flex;
			justify-content: center;

			.man {
				margin: 40px 20px 20px 20px;
				width: 111px;
				height: 115px;
				background: url(../../images//man-bg.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.woman {
				margin: 40px 20px 20px 20px;
				width: 111px;
				height: 115px;
				background: url(../../images//woman-bg.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.rate {
			display: flex;
			justify-content: space-between;
			color: white;
			padding: 0 100px;
		}
		.charts {
			// width: 100%;
			height: 100px;
			padding: 0 100px;
		}
	}
</style>
