<template>
	<el-button icon="Refresh" circle @click="updateRefresh"></el-button>
	<el-button icon="FullScreen" circle @click="fullScreen"></el-button>
	<el-button icon="Setting" circle></el-button>
	<img :src="userStore.avatar" style="width: 30px; height: 30px; margin: 0 15px" />
	<el-dropdown>
		<span class="el-dropdown-link">
			{{ userStore.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="logout">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<script setup lang="ts">
	import useLayoutSettingStore from '@/store/module/setting.js'
	import useUserStore from '@/store/module/user'
	import { useRouter, useRoute } from 'vue-router'
	const userStore = useUserStore()
	const layoutSettingStore = useLayoutSettingStore()
	const $router = useRouter()
	const $route = useRoute()
	const updateRefresh = () => {
		layoutSettingStore.refresh = !layoutSettingStore.refresh
	}
	//全屏按钮xx
	const fullScreen = () => {
		let full = document.fullscreenElement
		if (full) {
			document.exitFullscreen()
		} else {
			//实现全屏
			document.documentElement.requestFullscreen()
		}
	}
	//退出按钮
	const logout = () => {
		userStore.logout()
		$router.push({
			path: '/login',
			query: {
				redirect: $route.path,
			},
		})
	}
</script>
<script lang="ts">
	export default {
		name: 'Settings',
	}
</script>
<style scoped lang="scss"></style>
