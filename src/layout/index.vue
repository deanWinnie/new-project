<template>
	<div class="layout_container">
		<!-- 左侧菜单 -->
		<div class="layout_slider" :class="{ fold: layoutSettingStore.fold }">
			<Logo></Logo>
			<!-- 展示菜单 -->
			<el-scrollbar class="scrollbar">
				<!-- 菜单组件 -->
				<el-menu
					background-color="#001529"
					text-color="white"
					:default-active="$route.path"
					:collapse="layoutSettingStore.fold"
				>
					<Menu :menuList="userStore.menuRoutes"></Menu>
				</el-menu>
			</el-scrollbar>
		</div>
		<!-- 顶部导航 -->
		<div class="layout_tabbar" :class="{ fold: layoutSettingStore.fold }">
			<Tabbar></Tabbar>
		</div>
		<!-- 内容展示区域 -->
		<div class="layout_main" :class="{ fold: layoutSettingStore.fold }">
			<Main></Main>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Logo from './Logo/index.vue'
	import Menu from './Menu/index.vue'
	import Main from './Main/index.vue'
	import useUserStore from '@/store/module/user'
	import { useRoute } from 'vue-router'
	import Tabbar from './Tabbar/index.vue'
	import useLayoutSettingStore from '@/store/module/setting'
	const layoutSettingStore = useLayoutSettingStore()
	const userStore = useUserStore()
	const $route = useRoute()
</script>
<script lang="ts">
	export default {
		name: 'Layout',
	}
</script>
<style scoped lang="scss">
	.layout_container {
		width: 100%;
		height: 100vh;
		.layout_slider {
			width: $base-menu-width;
			height: 100vh;
			background: $base-menu-background;
			color: white;
			transition: all 0.3s;
			.scrollbar {
				height: calc(100% - $base-menu-logo-height);
				.el-menu {
					border-right: none;
				}
			}
			&.fold {
				width: $base-menu-min-width;
			}
		}
		.layout_tabbar {
			position: fixed;
			width: calc(100% - $base-menu-width);
			background-color: white;
			height: $base-tabbar-height;
			top: 0px;
			left: $base-menu-width;
			transition: all 0.3s;
			&.fold {
				width: calc(100% - $base-menu-min-width);
				left: $base-menu-min-width;
			}
		}
		.layout_main {
			position: absolute;
			width: calc(100% - $base-menu-width);
			height: calc(100vh - $base-tabbar-height);
			top: $base-tabbar-height;
			left: $base-menu-width;
			padding: 20px;
			overflow: auto;
			transition: all 0.3s;
			&.fold {
				width: calc(100% - $base-menu-min-width);
				left: $base-menu-min-width;
			}
		}
	}
</style>
