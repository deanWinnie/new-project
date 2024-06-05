<template>
	<template v-for="item in menuList" :key="item.path">
		<template v-if="!item.children">
			<el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
				<el-icon>
					<component :is="item.meta.icon"></component>
				</el-icon>
				<template #title>
					<span>{{ item.meta.title }}</span>
				</template>
			</el-menu-item>
		</template>
		<template v-if="item.children && item.children.length == 1 && !item.meta.alwaysShow">
			<el-menu-item :index="item.children[0].path" @click="goRoute">
				<el-icon>
					<component :is="item.children[0].meta.icon"></component>
				</el-icon>
				<template #title>
					<span>{{ item.children[0].meta.title }}</span>
				</template>
			</el-menu-item>
		</template>
		<template
			v-if="
				(item.children && item.children.length > 1) ||
				(item.children && item.children.length == 1 && item.meta.alwaysShow)
			"
		>
			<el-sub-menu :index="item.path">
				<template #title>
					<el-icon>
						<component :is="item.meta.icon"></component>
					</el-icon>
					<span>{{ item.meta.title }}</span>
				</template>
				<Menu :menuList="item.children"></Menu>
			</el-sub-menu>
		</template>
	</template>
	<!-- {{ menuList }} -->
</template>
<script setup lang="ts">
	import { useRouter } from 'vue-router'
	const $router = useRouter()
	//获取父组件传递过来的全部路由数组
	defineProps(['menuList'])
	const goRoute = (ad: any) => {
		$router.push(ad.index)
	}
</script>
<script lang="ts">
	export default {
		name: 'Menu',
	}
</script>
<style scoped lang="scss"></style>
