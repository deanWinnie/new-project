<template>
	<div class="container">
		<div class="screen" ref="screen">
			<div class="top">
				<Top></Top>
			</div>
			<div class="bottom">
				<div class="left">
					<Tourist class="tourist"></Tourist>
					<Sex class="sex"></Sex>
					<Age class="age"></Age>
				</div>
				<div class="center">
					<Map class="map"></Map>
					<Line class="line"></Line>
				</div>
				<div class="right"></div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { onMounted, ref } from 'vue'
	import Top from './components/top/index.vue'
	import Tourist from './components/tourist/index.vue'
	import Age from './components/age/index.vue'
	import Sex from './components/sex/index.vue'
	import Map from './components/map/index.vue'
	import Line from './components/line/index.vue'

	let screen = ref()
	const getScale = (w = 1920, h = 1080) => {
		const ww = window.innerWidth / w
		const wh = window.innerHeight / h
		return ww < wh ? ww : wh
	}
	onMounted(() => {
		screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
	})
	window.onresize = () => {
		screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
	}
</script>
<style scoped lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		background: url(./images/bg.png) no-repeat;
		background-size: cover;
		.screen {
			width: 1920px;
			height: 1080px;
			// background-color: red;
			position: fixed;
			left: 50%;
			top: 50%;
			transform-origin: left top;
		}
		.top {
			width: 100%;
			height: 40px;
			// background-color: burlywood;
		}
		.bottom {
			display: flex;
			height: 1040px;
			.right {
				flex: 1;
			}
			.center {
				flex: 2;
				display: flex;
				flex-direction: column;
				.map {
					flex: 4;
				}
				.line {
					flex: 1;
				}
			}
			.left {
				flex: 1;
				display: flex;
				flex-direction: column;
				.tourist {
					flex: 1.2;
				}
				.sex {
					flex: 1;
				}
				.age {
					flex: 1;
				}
			}
		}
	}
</style>
