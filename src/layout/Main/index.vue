<template>
	<router-view v-slot="{ Component, route }">
		<Transition name="fade">
			<!-- <keep-alive > -->
			<component :is="Component" v-if="refFlag" :key="route.path"></component>
			<!-- </keep-alive> -->
		</Transition>
	</router-view>
</template>
<script setup lang="ts">
	import useLayoutSettingStore from '@/store/module/setting'
	import { nextTick, ref, watch } from 'vue'
	const layoutSettingStore = useLayoutSettingStore()
	let refFlag = ref(true)
	//监听仓库内部数据是否发生变化  如果发生变化，说明用户点击过刷新按钮
	watch(
		() => layoutSettingStore.refresh,
		() => {
			//点击刷新按钮：路由组件销毁
			refFlag.value = false
			//确保销毁完毕再次创建
			nextTick(() => {
				refFlag.value = true
			})
		},
	)
</script>
<script lang="ts">
	export default {
		name: 'Main',
	}
</script>
<style scoped lang="scss">
	.fade-enter-from {
		opacity: 0;
		transform: scale(0);
	}
	.fade-enter-active {
		transition: all 0.3s;
	}
	.fade-enter-to {
		opacity: 1;
		transform: scale(1);
	}
</style>
