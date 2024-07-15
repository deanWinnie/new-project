<template>
	<div class="box">
		<div class="top">
			<div>
				<p class="title">实时游客统计</p>
				<p class="bg"></p>
			</div>
			<p class="right">可预约总量<span class="red">1000000</span>人</p>
		</div>
		<div class="number">
			<span v-for="item in people">{{ item }}</span>
		</div>
		<div class="charts" ref="charts"></div>
	</div>
</template>
<script setup lang="ts">
	import { onMounted, ref } from 'vue'
	import * as echarts from 'echarts'
	import 'echarts-liquidfill'
	let people = ref('215908人')
	let charts = ref()
	onMounted(() => {
		const mycharts = echarts.init(charts.value)
		mycharts.setOption({
			title: {
				text: '水球图',
			},
			xAxis: {},
			yAxis: {},
			series: {
				type: 'liquidFill',
				data: [0.6, 0.4, 0.2],
				radius: '100%',
			},
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
			display: flex;
			justify-content: space-between;
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
			.right {
				font-size: 20px;
				color: white;
				margin-top: 50px;
				span {
					color: red;
				}
			}
		}
		.number {
			margin-top: 10px;
			color: white;
			display: flex;
			padding: 10px;
			span {
				flex: 1;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background: url(../../images/total.png) no-repeat;
				background-size: 100% 100%;
				color: #29fcff;
			}
		}
		.charts {
			width: 100%;
			height: 270px;
			// background: #29fcff;
		}
	}
</style>
