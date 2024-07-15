<template>
	<div class="box" ref="charts">
		<div class="top">
			<p class="title">未来7天游客量趋势图</p>
			<p class="bg"></p>
		</div>
		<div class="charts"></div>
	</div>
</template>
<script setup lang="ts">
	import { onMounted, ref } from 'vue'
	import * as echarts from 'echarts'

	let charts = ref()
	onMounted(() => {
		// const mycharts = echarts.init(charts.value)
		// mycharts.setOption({
		//   tooltip: {
		//   trigger: 'item'
		// },
		//   legend: {
		//     top: '40',
		//     right:10,
		//     orient:'vertical',
		//     textStyle:{
		//       color:'white',
		//       fontSize:14
		//     }
		//   },
		//   series: [
		//     {
		//       name: 'Access From',
		//       type: 'pie',
		//       radius: ['40%', '70%'],
		//       avoidLabelOverlap: false,
		//       itemStyle: {
		//         borderRadius: 10,
		//         borderColor: '#fff',
		//         borderWidth: 2
		//       },
		//       label: {
		//         show: true,
		//         position: 'inside',
		//         color:'white'
		//       },
		//       emphasis: {
		//         label: {
		//           show: true,
		//           // fontSize: 40,
		//           fontWeight: 'bold'
		//         }
		//       },
		//       labelLine: {
		//         show: false
		//       },
		//       data: [
		//         { value: 1048, name: 'Search Engine' },
		//         { value: 735, name: 'Direct' },
		//         { value: 580, name: 'Email' },
		//         { value: 484, name: 'Union Ads' },
		//         { value: 300, name: 'Video Ads' }
		//       ]
		//     }
		//   ],
		//   grid:{
		//     left:0,
		//     right:0,
		//     top:0,
		//     bottom:0
		//   }
		// })
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
	}
</style>
