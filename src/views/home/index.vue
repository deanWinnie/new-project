<template>
	<el-card>
		<div class="container">
			<img :src="userStore.avatar" alt="" style="width: 100px; height: 100px; border-radius: 50%" />
			<div style="margin-left: 30px">
				<h3>{{ name }}</h3>
				<p style="margin-top: 20px; color: #ccc; font-style: italic">dean的测试平台</p>
			</div>
		</div>
	</el-card>
	<div class="img-box">
		<svg-icon name="welcome" width="500px" height="300px"></svg-icon>
	</div>
</template>
<script setup lang="ts">
	import useUserStore from '@/store/module/user'
	import { onMounted, ref } from 'vue'
	import { getTime } from '@/utils/time'
	const userStore = useUserStore()
	let name = ref('')
	onMounted(() => {
		name.value = getTime() + '好，' + userStore.username
	})
</script>
<style scoped lang="scss">
	.container {
		display: flex;
		align-items: center;
	}
	.img-box {
		// height: 100%;
		height: calc(100% - 142px);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
