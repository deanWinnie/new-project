<template>
	<el-button icon="Refresh" circle></el-button>
	<el-button icon="FullScreen" circle></el-button>
	<el-button icon="Setting" circle></el-button>
	<img src="../../../assets/images/logo.jpg" style="width: 30px; height: 30px; margin: 0 15px" />
	<el-dropdown>
		<span class="el-dropdown-link">
			Admin<el-icon class="el-icon--right"><arrow-down /></el-icon>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item>退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<script setup lang="ts"></script>
<script lang="ts">
	export default {
		name: 'Settings',
	}
</script>
<style scoped lang="scss"></style>
