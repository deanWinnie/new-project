<template>
	<div class="box"></div>
	<router-view></router-view>

	<!-- <SvgIcon name="stop" color="pink" width="100px" height="100px"></SvgIcon> -->
</template>
<script setup lang="ts">
	import { onMounted } from 'vue'
	import { reqLogin } from '@/api/user/index'

	onMounted(() => {
		reqLogin({ username: 'admin', password: '123456' }).then((res) => {
			console.log(res)
		})
	})
</script>
<style scoped lang="scss">
	.box {
		color: $base-menu-width;
	}
</style>
