<template>
	<div class="top">
		<div class="left">
			<div class="left_btn" @click="goHome">首页</div>
		</div>
		<div class="center">
			<div class="title">智慧旅游可视化大数据平台</div>
		</div>
		<div class="right">
			<span class="right_btn">统计报告</span>
			<span class="time">当前时间:{{ time }}</span>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { useRouter } from 'vue-router'
	import moment from 'moment'
	let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
	const $router = useRouter()
	let timer = ref()
	const goHome = () => {
		$router.push('/home')
	}
	onMounted(() => {
		timer.value = setInterval(() => {
			time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
		}, 1000)
	})
	onBeforeUnmount(() => {
		//设置了定时器记得删除
		clearInterval(timer.value)
	})
</script>
<style scoped lang="scss">
	.top {
		width: 100%;
		height: 40px;
		display: flex;
		.left {
			flex: 1.5;
			background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
			background-size: cover;
			display: flex;
			justify-content: right;
			align-items: center;
			.left_btn {
				width: 100px;
				height: 40px;
				background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
				background-size: 100% 100%;
				text-align: center;
				line-height: 40px;
				color: #29fcff;
				font-size: 20px;
				cursor: pointer;
			}
		}
		.right {
			flex: 1.5;
			background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
			background-size: cover;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.right_btn {
				width: 150px;
				height: 40px;
				background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
				background-size: 100% 100%;
				text-align: center;
				line-height: 40px;
				color: #29fcff;
				font-size: 20px;
			}
			.time {
				color: #29fcff;
				font-size: 20px;
				margin-right: 20px;
			}
		}
		.center {
			flex: 2;
			.title {
				width: 100%;
				height: 74px;
				background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
				background-size: 100% 100%;
				text-align: center;
				line-height: 74px;
				color: #29fcff;
				font-size: 30px;
			}
		}
	}
</style>
