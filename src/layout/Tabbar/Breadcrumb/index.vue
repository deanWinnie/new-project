<template>
	<el-icon :size="20" style="margin-right: 10px" @click="changeIcon">
		<component :is="layoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
	</el-icon>
	<el-breadcrumb separator-icon="ArrowRight">
		<el-breadcrumb-item
			v-for="item in $route.matched"
			:key="item.path"
			v-show="item.meta.icon && item.meta.title"
			:to="item.path"
		>
			<div class="breadcrumb_wrapper">
				<el-icon style="margin-right: 10px">
					<component :is="item.meta.icon"></component>
				</el-icon>
				<p>{{ item.meta.title }}</p>
			</div>
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>
<script setup lang="ts">
	import useLayoutSettingStore from '@/store/module/setting'
	import { useRoute } from 'vue-router'
	const $route = useRoute()
	console.log($route.matched)
	const layoutSettingStore = useLayoutSettingStore()
	const changeIcon = () => {
		layoutSettingStore.fold = !layoutSettingStore.fold
	}
</script>
<script lang="ts">
	export default {
		name: 'Breadcrumb',
	}
</script>
<style scoped lang="scss">
	.breadcrumb_wrapper {
		display: flex;
		align-items: center;
	}
</style>
