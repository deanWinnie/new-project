<template>
	<el-button icon="Refresh" circle @click="updateRefresh"></el-button>
	<el-button icon="FullScreen" circle @click="fullScreen"></el-button>
	<el-popover placement="bottom" title="主题设置" :width="300" trigger="click">
		<el-form>
			<el-form-item label="主题颜色">
				<el-color-picker @change="setColor" v-model="color" show-alpha :predefine="predefineColors" />
			</el-form-item>
			<el-form-item label="暗黑模式">
				<el-switch v-model="dark" @change="changeDark" inline-prompt active-icon="MoonNight" inactive-icon="Sunny" />
			</el-form-item>
		</el-form>
		<template #reference>
			<el-button icon="Setting" circle></el-button>
		</template>
	</el-popover>
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
	import { ref } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	const color = ref('rgba(255, 69, 0, 0.68)')
	const predefineColors = ref([
		'#ff4500',
		'#ff8c00',
		'#ffd700',
		'#90ee90',
		'#00ced1',
		'#1e90ff',
		'#c71585',
		'rgba(255, 69, 0, 0.68)',
		'rgb(255, 120, 0)',
		'hsv(51, 100, 98)',
		'hsva(120, 40, 94, 0.5)',
		'hsl(181, 100%, 37%)',
		'hsla(209, 100%, 56%, 0.73)',
		'#c7158577',
	])
	let dark = ref(false)
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
	const logout = async () => {
		await userStore.logout()
		$router.push({
			path: '/login',
			query: {
				redirect: $route.path,
			},
		})
	}
	const changeDark = () => {
		let html = document.documentElement
		if (dark.value) {
			html.className = 'dark'
		} else {
			html.className = ''
		}
	}
	const setColor = () => {
		let html = document.documentElement
		console.log(color.value)
		html.style.setProperty('--el-color-primary', color.value)
	}
</script>
<script lang="ts">
	export default {
		name: 'Settings',
	}
</script>
<style scoped lang="scss"></style>
