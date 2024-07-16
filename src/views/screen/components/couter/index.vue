<template>
	<div class="box">
		<div class="top">
			<p class="title">预约渠道数据统计</p>
			<p class="bg"></p>
		</div>
		<div class="charts" ref="charts"></div>
	</div>
</template>
<script setup lang="ts">
	import { onMounted, ref } from 'vue'
	import * as echarts from 'echarts'
	let charts = ref()
	// onMounted(() => {
	// 	const mycharts = echarts.init(charts.value)
	// 	mycharts.setOption({
	// 	  title: {
	// 			text: '访问量趋势图'
	// 		},
	// 		xAxis: {
	// 			type: 'category',
	// 			boundaryGap:false,
	// 			splitLine:{
	// 				show:false
	// 			},
	// 			data:['周一','周二','周三','周四','周五','周六','周日'],
	// 			axisLine:{
	// 				show:true
	// 			},
	// 			axisTick:{
	// 				show:true
	// 			}
	// 		},
	// 		yAxis: {
	// 			splitLine:{
	// 				show:false
	// 			},
	// 			axisLine:{
	// 				show:true
	// 			},
	// 			axisTick:{
	// 				show:true
	// 			}
	// 		},
	// 		grid:{
	// 	    left:40,
	// 	    right:10,
	// 	    top:0,
	// 	    bottom:30
	// 	  },
	// 	  series: [
	// 			{
	// 				type:'line',
	// 				data:[120,240,566,99,2321,890,1200],
	// 				smooth:true,
	// 				areaStyle:{
	// 					color:{
	// 						type: 'linear',
	// 						x: 0,
	// 						y: 0,
	// 						x2: 0,
	// 						y2: 1,
	// 						colorStops: [{
	// 								offset: 0, color: 'red' // 0% 处的颜色
	// 						}, {
	// 								offset: 1, color: 'blue' // 100% 处的颜色
	// 						}],
	// 						global: false // 缺省为 false
	// 					}
	// 				}
	// 			}
	// 	  ],
	// 	})
	// })
</script>
<style scoped lang="scss">
	.box {
		width: 100%;
		height: 100%;
		background: url(../../images/dataScreen-main-lb.png) no-repeat;
		background-size: 100% 100%;
		margin: 10px 10px 0px 10px;
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
