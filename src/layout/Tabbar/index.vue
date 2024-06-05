<template>
	<div class="tabbar">
		<div class="tabbar_left">
			<Breadcrumb></Breadcrumb>
		</div>
		<div class="tabbar_right">
			<Settings></Settings>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Breadcrumb from './Breadcrumb/index.vue'
	import Settings from './Settings/index.vue'
</script>
<script lang="ts">
	export default {
		name: 'Tabbar',
	}
</script>
<style scoped lang="scss">
	.tabbar {
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
		align-items: center;
		height: 100%;
		.tabbar_left {
			display: flex;
			align-items: center;
		}
		.tabbar_right {
			display: flex;
			align-items: center;
		}
	}
</style>
